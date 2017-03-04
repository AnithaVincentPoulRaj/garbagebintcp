
console.log('inbound listen');

var net = require('net');
var inboundPort = process.env.OPENSHIFT_NODEJS_PROXY_PORT_TCP || 8080;
//var ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
//var inboundPort = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP;
console.log('Inboundport');
console.log(inboundPort);
console.log(ip);


var tcpServer = net.createServer(function(sock) {
	// We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: RemoteAddress:' + sock.remoteAddress +' RemotePort:'+ sock.remotePort);
    console.log('going to inside');
    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
    console.log('data called');

		// Write the data back to the socket, the client will receive it as data from the server
		//https   = require('https');
		//var net = require('net');
		var client    = new net.Socket();
	    var hubRegDetails = data.toString('utf8');
		if (hubRegDetails.length > 0 ) {
		  //process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		  console.log(hubRegDetails);
		}
		else {
			sock.write('Field Error');
			return;
		}
	});
	// Add a 'close' event handler to this instance of socket
	sock.on('close', function(data) {
		console.log('CLOSED: RemoteAddress:' + sock.remoteAddress +' RemotePort:'+ sock.remotePort);
	});

	//Add a 'error' event handlet for client socket
    sock.on('error', function(exception) {
        console.log("handled error");
        console.log(exception);
    });
});
tcpServer.listen(inboundPort,ip);
console.log('InboundServer listening on port :: ' + inboundPort);

