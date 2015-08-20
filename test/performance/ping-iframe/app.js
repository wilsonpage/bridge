/*global bridge*/

var mark = arg => performance.mark(`app.${arg}`);
mark('app script start');

var iframe = document.querySelector('iframe');
var client = bridge.client('my-service', iframe);
mark('created client');

client.method('ping')
  .then(result => mark('got pong'))
  .then(() => {
    performance.mark('fullyLoaded');
  });
mark('sent ping');
