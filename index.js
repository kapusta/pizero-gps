var gpsd = require('node-gpsd');
var argv = require('yargs').argv;
var server = require('ws').Server
var wss = new server({ port: (argv.port) ? argv.port : '9000' });

const location = {
  current: {},
  last: {}
};


// var daemon = new gpsd.Daemon({
//     program: 'gpsd',
//     device: '/dev/ttyAMA0',
//     port: 2947,
//     pid: '/tmp/gpsd.pid',
//     logger: {
//         info: function() {},
//         warn: console.warn,
//         error: console.error
//     }
// });
//
// daemon.start(function(arg) {
//   console.log('Started', arg);
// });
//

wss.on('connection', (socket) => {

  console.log('new websocket connection, (', wss.clients.length, ' total)');

  socket.on('message', (data, flags) => {
    // TODO: get the message data and send data back based on the message received
    console.log('new message from client', data);
    socket.send(JSON.stringify(location));
  });

  socket.on('close', () => {
    console.log('websocket connection closed, (', wss.clients.length, ' remain)');
  });

});



var handleTpv = (tpvData) => {
  location.last = (location.current) ? location.current : null;
  location.current = tpvData;
  console.log(location);
};

var handleError = function(err, msg) {
  console.log('error -', err, msg);
};

var handleWarn = function(err) {
  console.log('warn -', err);
};

var handleInfo = function(data) {
  console.log('info -', data);
};

var connected = function() {
  console.log('connected to gps');
};

var device = function(data) {
  console.log('device -', data);
};


var listener = new gpsd.Listener({
  port: 2947,
  hostname: 'localhost',
  parse: true,
  logger:  {
    info: handleInfo,
    warn: handleWarn,
    error: handleError
  },
});


listener.on('TPV', handleTpv);
listener.on('error', handleError);
listener.on('connected', connected);
listener.on('INFO', handleInfo);
listener.on('DEVICE', device);

listener.connect();
listener.watch();
listener.device();
