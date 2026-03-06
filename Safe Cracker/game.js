"use strict"; // Do NOT remove this directive!

var goal1 = 0;
var goal2 = 0;
var goal3 = 0;

var numA2 = 0;
var numB2 = 0;
var numC2 = 0;

var s1Active = false;
var s2Active = false;
var s3Active = false;

var forward = true;
var timerID;
var activeSliderX = 0;
var activeSliderY = 0;

var dialGoal;
var dialState = 0;

var clicks = 0;

function setComb(x, y) {
	PS.seed(clicks);
	let numA = PS.random(9);

	PS.color(x, y, PS.makeRGB(64, 143, 54));
	PS.glyph(x, y, numA + 48);
	PS.glyphColor(x, y, PS.COLOR_BLACK);
	return numA;
}

function setGoals(goalNum) {
	switch (goalNum) {
		case 1 : {
			goal1 = setComb(1, 9);
			break;
		}
		case 2: {
			goal2 = setComb(3, 9);
			break;
		}
		case 3: {
			goal3 = setComb(5, 9);
			break;
		}
	}
	
}

function setGame() {
	PS.gridSize(13, 11);
	PS.color(PS.ALL, PS.ALL, PS.makeRGB(79, 79, 79));
	PS.gridColor(PS.makeRGB(27, 54, 82));
	PS.border( PS.ALL, PS.ALL, 0 );
	PS.statusColor(PS.COLOR_WHITE);

	makeDialGoal();

	var sliders = 0;

	for (var i = 0; i < 3; i++) {
		if (i == 0) {
			sliders++;
		}
		else {
			sliders += 2;
		}

		PS.color(sliders, 9, PS.COLOR_RED);

		for (var j = 1; j < 8; j++) {
			PS.color(sliders, j, PS.makeRGB(40, 40, 40));
		}
	}

	PS.color(9, 1, PS.makeRGB(0, 122, 184));
	
	PS.color(8, 3, PS.makeRGB(64, 143, 54));
	PS.glyph(8, 3, 94);
	PS.color(9, 3, PS.makeRGB(64, 143, 54));
	PS.glyph(9, 3, 94);
	PS.color(10, 3, PS.makeRGB(64, 143, 54));
	PS.glyph(10, 3, 94);

	PS.color(8, 4, PS.makeRGB(76, 107, 73));
	PS.glyph(8, 4, numA2 + 48);
	PS.color(9, 4, PS.makeRGB(76, 107, 73));
	PS.glyph(9, 4, numB2 + 48);
	PS.color(10, 4, PS.makeRGB(76, 107, 73));
	PS.glyph(10, 4, numC2 + 48);

	PS.color(8, 5, PS.COLOR_RED);
	PS.glyph(8, 5, 118);
	PS.color(9, 5, PS.COLOR_RED);
	PS.glyph(9, 5, 118);
	PS.color(10, 5, PS.COLOR_RED);
	PS.glyph(10, 5, 118);

	PS.color(8, 8, PS.COLOR_RED);
	PS.color(9, 8, PS.COLOR_RED);
	PS.glyph(9, 8, "🔑");
	PS.color(10, 8, PS.COLOR_RED);

	PS.glyph(9, 1, 94);
}

function moveSlider() {
	if(s1Active || s2Active || s3Active) {
		if(forward) {
			if(activeSliderY == 7) {
				forward = false;
				activeSliderY--;
				PS.color(activeSliderX, activeSliderY, PS.COLOR_RED);
				PS.color(activeSliderX, activeSliderY + 1, PS.makeRGB(40, 40, 40));
			}
			else {
				activeSliderY++;
				PS.color(activeSliderX, activeSliderY, PS.COLOR_RED);
				PS.color(activeSliderX, activeSliderY - 1, PS.makeRGB(40, 40, 40));
			}
		}
		else  {
			if(activeSliderY == 1) {
				forward = true;
				activeSliderY++;
				PS.color(activeSliderX, activeSliderY, PS.COLOR_RED);
				PS.color(activeSliderX, activeSliderY - 1, PS.makeRGB(40, 40, 40));
			}
			else {
				activeSliderY--;
				PS.color(activeSliderX, activeSliderY, PS.COLOR_RED);
				PS.color(activeSliderX, activeSliderY + 1, PS.makeRGB(40, 40, 40));
			}
		}
	}
	
}


function startSlider1() {
	s1Active = true;
	activeSliderX = 1;
	activeSliderY = 1;
	PS.color(activeSliderX, activeSliderY, PS.COLOR_RED);
	//start a timer here that uses moveSlider with a generous time delay
	
	timerID = PS.timerStart(45, moveSlider);
}

function startSlider2() {
	s2Active = true;
	activeSliderX = 3;
	activeSliderY = 1;
	PS.color(activeSliderX, activeSliderY, PS.COLOR_RED);
	//start a timer here that uses moveSlider with a generous time delay
	
	timerID = PS.timerStart(30, moveSlider);
}

function startSlider3() {
	s3Active = true;
	activeSliderX = 5;
	activeSliderY = 1;
	PS.color(activeSliderX, activeSliderY, PS.COLOR_RED);
	//start a timer here that uses moveSlider with a generous time delay
	
	timerID = PS.timerStart(15, moveSlider);
}

function makeDialGoal() {
	dialGoal = PS.random(4);
}

function rotateDial() {
	dialState++;
	PS.audioPlay("fx_click");

	if(dialState == dialGoal) {
		PS.statusText("Click!");
		PS.audioPlay("fx_coin2");
	}
	else {
		PS.statusText("");
	}

	switch(dialState % 4) {
		case 0: {
			PS.glyph(9, 1, 94);
			break;
		}
		case 1: {
			PS.glyph(9, 1, 62);
			break;
		}
		case 2: {
			PS.glyph(9, 1, 118);
			break;
		}
		case 3: {
			PS.glyph(9, 1, 60);
			break;
		}
	}

	dialState %= 4;
}


PS.init = function( system, options ) {
	setGame();
	startSlider1();



	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.
	// Add any other initialization code you need here.
};



/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	// Uncomment the following code line
	// to inspect x/y parameters:

	//need case for sliders
	//arrow
	//up and down
	//key button

	clicks++;

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );
	if(x == activeSliderX && y == activeSliderY && s1Active) {
		s1Active = false;
		PS.timerStop(timerID);
		PS.color(activeSliderX, activeSliderY, PS.makeRGB(173, 173, 173));
		setGoals(1);
		startSlider2();
		PS.audioPlay("fx_drip2");
	}
	else if(x == activeSliderX && y == activeSliderY && s2Active) {
		s2Active = false;
		PS.timerStop(timerID);
		PS.color(activeSliderX, activeSliderY, PS.makeRGB(173, 173, 173));
		setGoals(2);
		startSlider3();
		PS.audioPlay("fx_drip1");
	}
	else if(x == activeSliderX && y == activeSliderY && s3Active) {
		s3Active = false;
		PS.timerStop(timerID);
		PS.color(activeSliderX, activeSliderY, PS.makeRGB(173, 173, 173));
		setGoals(3);
		PS.audioPlay("fx_drip2");
	}
	else if(x == 8 && y == 3) {
		numA2++;
		PS.glyph(8, 4, numA2 + 48);
	}
	else if(x == 9 && y == 3) {
		numB2++;
		PS.glyph(9, 4, numB2 + 48);
	}
	else if(x == 10 && y == 3) {
		numC2++;
		PS.glyph(10, 4, numC2 + 48);
	}
	else if(x == 8 && y == 5) {
		numA2--;
		PS.glyph(8, 4, numA2 + 48);
	}
	else if(x == 9 && y == 5) {
		numB2--;
		PS.glyph(9, 4, numB2 + 48);
	}
	else if(x == 10 && y == 5) {
		numC2--;
		PS.glyph(10, 4, numC2 + 48);
	}
	else if(x == 9 && y == 8) {
		if (goal1 == numA2 && goal2 == numB2 && goal3 == numC2 && dialState == dialGoal) {
			PS.audioPlay("fx_tada");
			PS.color(PS.ALL, PS.ALL, PS.COLOR_BLACK);

			PS.color(6, 5, PS.makeRGB(214, 175, 0));
			PS.statusText("a shiny pebble!");
			
			
		}
	}

	/*
	if(but1 == goal1 && but2 == goal2 && but3 == goal3) {
		//change cords duplicate up and down 
		PS.glyph(1, 2, 87);
		PS.glyphColor(1, 2, PS.COLOR_BLACK);
		PS.glyph(2, 2, 73);
		PS.glyphColor(2, 2, PS.COLOR_BLACK);
		PS.glyph(3, 2, 78);
		PS.glyphColor(3, 2, PS.COLOR_BLACK);
		PS.audioPlay("fx_coin6");
	}
	*/

};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

	 var device = sensors.wheel; // check for scroll wheel
//
	 if ( device ) {
	   PS.debug( "PS.input(): " + device + "\n" );
	 }

	 rotateDial();
	// Add code here for when an input event is detected.
};