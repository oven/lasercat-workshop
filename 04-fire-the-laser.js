var five = require('johnny-five')
var board = new five.Board()
	board.on('ready', function () {
		var led = new five.Led(11)
		led.strobe(500)
		var servo1 = new five.Servo(9)
		var servo2 = new five.Servo(10)
		this.repl.inject({
			servo1: servo1,
			servo2: servo2, 
			led: led
		});
		servo1.sweep(0, 180);
		servo2.sweep(180, 0);

	    board.wait(3000, function() { reset([servo1, servo2], led) } )

})

function reset(servos, led) {
	led.stop()
	led.off()
	for (i in servos) {
		servos[i].stop()
		servos[i].center()
	}
}	

