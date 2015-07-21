'use strict';

/**
 * Dependencies
 * @ignore
 */

var uuid = require('./utils/uuid');
var message = require('./message');
var Receiver = message.Receiver;

/**
 * Exports
 * @ignore
 */

module.exports = Service;

/**
 * Mini Logger
 *
 * @type {Function}
 * @private
 */
var debug = 0 ? function(arg1, ...args) {
  var type = `[${self.constructor.name}][${location.pathname}]`;
  console.log(`[Service]${type} - "${arg1}"`, ...args);
} : () => {};

/**
 * Extends `Receiver`
 * @ignore
 */

Service.prototype = Object.create(Receiver.prototype);

/**
 * A `Service` is a collection of methods
 * exposed to a `Client`. Methods can be
 * sync or async (using Promises).
 *
 * @example
 *
 * service('my-service')
 *   .method('ping', param => 'pong: ' + param)
 *   .listen();
 *
 * @class Service
 * @extends Receiver
 * @param {String} name The service name
 * @public
 */
function Service(name) {
  if (!(this instanceof Service)) return new Service(name);
  message.Receiver.call(this, name); // call super

  this.clients = {};
  this.methods = {};

  this
    .on('_disconnect', this.onDisconnect.bind(this))
    .on('_connect', this.onConnect.bind(this))
    .on('_method', this.onMethod.bind(this))
    .on('_off', this.onOff.bind(this))
    .on('_on', this.onOn.bind(this));

  this.destroy = this.destroy.bind(this);
  addEventListener('closing', this.destroy);
  debug('initialized', name, self.createEvent);
}

/**
 * Define a method to expose to Clients.
 * The return value of the result of a
 * returned Promise will be sent back
 * to the Client.
 *
 * @example
 *
 * service('my-service')
 *
 *  // sync return value
 *  .method('myMethod', function(param) {
 *    return 'hello: ' + param;
 *  })
 *
 *  // or async Promise
 *  .method('myOtherMethod', function() {
 *    return new Promise(resolve => {
 *      setTimeout(() => resolve('result'), 1000);
 *    });
 *  })
 *
 * @param  {String}   name
 * @param  {Function} fn
 * @return {Service} this for chaining
 */
Service.prototype.method = function(name, fn) {
  this.methods[name] = fn;
  return this;
};

/**
 * Broadcast an event to connected Clients.
 *
 * @example
 *
 * service.broadcast('my-event', { some: data }); // all clients
 * service.broadcast('my-event', { some: data }, [ aClientId ]); // some clients
 *
 * @memberof Service
 * @param  {String} type The message type/name
 * @param  {*} data Data to send with the event
 * @param  {Array} [only] A select list of clients to message
 * @return {Service}
 */
Service.prototype.broadcast = function(type, data, only) {
  debug('broadcast', type, data, only, self.constructor.name);
  var msgData = {
    type: type,
    data: data
  };

  this.eachClient(client => {
    if (only && !~only.indexOf(client.id)) return;
    debug('broadcast to', client.id);
    message('_broadcast')
      .set({
        recipient: client.id,
        noRespond: true,
        data: msgData
      })
      .send(client.endpoint);
  });

  return this;
};

Service.prototype.eachClient = function(fn) {
  for (var id in this.clients) fn(this.clients[id]);
};

Service.prototype.onConnect = function(message) {
  debug('connection attempt', message.data, this.name);
  var data = message.data;
  var clientId = data.clientId;

  if (!clientId) return;
  if (data.service !== this.name) return;
  if (this.clients[clientId]) return;

  // before hook
  this.emit('before connect', message);
  if (message.defaultPrevented) return;

  // If the transport used support 'transfer' then
  // a MessageChannel port will have been sent.
  var ports = message.event.ports;
  var channel = ports && ports[0];

  // If the 'connect' message came with
  // a channel, update the source port
  // so response message goes directly.
  if (channel) {
    message.setSource(channel);
    this.listen(channel);
    channel.start();
  }

  this.addClient(clientId, message.source);
  message.respond();

  this.emit('connect', clientId);
  debug('connected', clientId);
};

Service.prototype.onDisconnect = function(message) {
  var client = this.clients[message.data];
  if (!client) return;

  this.removeClient(client.id);
  message.respond();

  this.emit('disconnect', client.id);
  debug('disconnected', client.id);
};

Service.prototype.onMethod = function(message) {
  debug('on method', message.data);
  this.emit('before onMethod', message);
  if (message.defaultPrevented) return;

  var method = message.data;
  var name = method.name;

  var fn = this.methods[name];
  if (!fn) throw error(4, name);
  message.respond(fn.apply(this, method.args));
};

Service.prototype.onOn = function(message) {
  debug('on on', message.data);
  this.emit('on', message.data);
};

Service.prototype.onOff = function(message) {
  debug('on off');
  this.emit('off', message.data);
};

Service.prototype.addClient = function(id, endpoint) {
  this.clients[id] = {
    id: id,
    endpoint: endpoint
  };
};

Service.prototype.removeClient = function(id) {
  delete this.clients[id];
};

/**
 * Use a plugin with this Service.
 * @param  {Function} fn Plugin function
 * @return {Service} this for chaining
 * @public
 */
Service.prototype.plugin = function(fn) {
  fn(this, {
    message: message,
    uuid: uuid
  });

  return this;
};

/**
 * Disconnect a Client from the Service.
 * @param  {Object} client
 * @private
 */
Service.prototype.disconnect = function(client) {
  this.removeClient(client.id);
  message('disconnect')
    .set({
      recipient: client.id,
      noRespond: true
    })
    .send(client.endpoint);
};

/**
 * Destroy the Service.
 * @public
 */
Service.prototype.destroy = function() {
  this.broadcast('service:destroyed');
  delete this.clients;
  this.unlisten();
  this.off();
};

/**
 * Creates new `Error` from registery.
 *
 * @param  {Number} id Error Id
 * @return {Error}
 * @private
 */
function error(id) {
  var args = [].slice.call(arguments, 1);
  return new Error({
    4: 'method "' + args[0] + '" doesn\'t exist'
  }[id]);
}
