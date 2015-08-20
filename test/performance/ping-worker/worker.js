/*global bridge,performance*/

var perfMark = performance.mark;
performance.mark = arg => perfMark.call(performance, `${arg}@ping-worker.gaiamobile.org`);
var mark = arg => performance.mark(`[App] ${arg}`);

mark('service script start');

importScripts('bridge.js');
mark('imported scripts');

bridge.service('my-service')
  .listen()
  .method('ping', function() {
    mark('got ping');
    mark('sent pong');
    return 'pong';
  });
mark('service created');
