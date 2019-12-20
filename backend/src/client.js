const port = 8080;
const host = '0.0.0.0';
var net = require('net');

var client = new net.Socket();
client.connect(port, host, function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.end(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});