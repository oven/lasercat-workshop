var five = require('johnny-five')
var board = new five.Board()
	board.on('ready', function () {
		var led = new five.Led(13)
		led.strobe()
		var servo = new five.Servo(9)
		this.repl.inject({
			servo: servo
		});
		servo.to(0)
	    board.wait(1000, function() {
			servo.to(180)
			board.wait(1000, function() { servo.to(90) }) 
		});	
})

