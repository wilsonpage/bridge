/*global bridge*/

var mark = arg => window.performance.mark(`[App] ${arg}`);

mark('app script start');

var worker = new Worker('worker.js');
mark('created worker');

var client = bridge.client('my-service', worker);
mark('created client');

client.method('ping')
  .then(result => mark('got pong'))
  .then(() => {
    performance.mark('fullyLoaded');
  });
mark('sent ping');
