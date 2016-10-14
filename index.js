var argv = require('yargs').argv;
var daemon = require('./lib/daemon.js');
var server = require('ws').Server
var wss = new server({ port: (argv.port) ? argv.port : '9000' });

if (argv.mq) {
  var mqkey = require('./lib/mqkey.js').consumerKey;
}

const location = {
  current: {},
};

const dmon = daemon.init({
  'port': (argv.daemonPort) ? argv.daemonPort : 2947
});
dmon.start();
const listener = daemon.listen({});


wss.on('connection', (socket) => {

  console.log('new websocket connection, (', wss.clients.length, ' total)');

  // send out the location data on an interval
  var intervalId = setInterval(function() {
    socket.send(JSON.stringify(location.current));
  }, 2000);

  socket.on('message', (data, flags) => {
    var parsedData = JSON.parse(data);
    //console.log('new message from client', parsedData);

    // if the data contains an action, try to do that action (this needs more thought)
    // if (parsedData.action) {
    //   console.log('trying', parsedData.action);
    //   try {
    //     daemon[parsedData.action].call(this, dmon);
    //   }
    //   catch (e) {
    //     console.error(e);
    //   }
    // }
  });

  socket.on('close', () => {
    clearInterval(intervalId);
    console.log('websocket connection closed, (', wss.clients.length, ' remain)');
  });

});



listener.on('connected', () => console.log('listener is conected'));
listener.on('DEVICE', (data) => console.log('device', data));
listener.on('TPV', (tpvData) => {
  location.current = tpvData;
});

listener.connect();
listener.watch();
listener.device();
