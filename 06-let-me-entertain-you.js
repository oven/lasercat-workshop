var five = require('johnny-five')
var http = require('http')

var pan
var tilt
var led

var board = new five.Board()
	board.on('ready', function () {
		led = new five.Led(11)
		pan = new five.Servo(9)
		tilt = new five.Servo(10)
		this.repl.inject({
			pan: pan,
			tilt: tilt, 
			led: led
		});
		pan.sweep(0, 180);
		tilt.sweep(180, 0);

	    board.wait(3000, function() { reset([pan, tilt], led) } )

})


var server = http.createServer(handler)
var io = require('socket.io')(server)
var fs = require('fs')

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

server.listen(9582, function() {console.log('server started')});


function reset(servos, led) {
	led.stop()
	led.off()
	for (i in servos) {
		servos[i].stop()
		servos[i].center()
	}
}	

io.on('connection', function (socket) {
  socket.on('x', function (data) {
	led.on()
    pan.to(data)
	board.wait(500, function() {led.off()})
  });
  socket.on('y', function (data) {
	led.on()
    tilt.to(data)
	board.wait(500, function() {led.off()})
  });
});

