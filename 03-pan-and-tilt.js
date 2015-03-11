var five = require('johnny-five')
var board = new five.Board()
	board.on('ready', function () {
		var led = new five.Led(13)
		led.strobe()
		var servo1 = new five.Servo(9)
		var servo2 = new five.Servo(10)
		this.repl.inject({
			servo1: servo1,
			servo2: servo2
		});
		servo1.sweep(0, 180);
		servo2.sweep(180, 0);

	    board.wait(3000, function() { reset([servo1, servo2]) } )

})

function reset(servos) {
	for (i in servos) {
		servos[i].stop()
		servos[i].center()
	}
}	

