"use strict"; // Do NOT remove this directive!

let player = PS.spriteSolid(1, 1);
let px = 0;
let coinSpt = PS.spriteSolid(1,1);
let coins = 10;

let taxCap = ["", "", "", "", "", "", "", "", "", ""];


let ty = 0;

let tydead = false;


class taxes {
	constructor(spriteID, xPos, yPos, isAlive) {
		this.spriteID = spriteID;
		this.xPos = xPos;
		this.yPos = yPos;
		this.isAlive = isAlive;
	}
}


function spawnTaxes() {
	//creates the sprite and class object
	//checks what slots of the array are available
	//if loops that check if its an "n" and on the resulting creation its either tax1, tax2, ... as it moves through the ifs - cant do in for loop
	var which = -1;
	
	if (taxCap[0] == "") {
		which = 0;
		const tax1 = new taxes("temp", PS.random(10) - 1, 0, true);
		taxCap[which] = tax1;
		taxCap[which].spriteID = PS.spriteSolid(1, 1);
		PS.spriteSolidColor(taxCap[which].spriteID, PS.COLOR_BLACK);
	}
	//if statements for other numbers
		//const tax1 = new taxes(...)
			//spoof the spriteID and then set it to the actual sprite
		//taxCap[x].spriteID = PS.spriteSolid(1, 1);

	PS.spriteMove(taxCap[which].spriteID, taxCap[which].xPos, 0);
	//renders them in the game world
	//triggers behavior
		//if taxCap[x].isAlive == true then move another step otherwise delete sprite and clearinterval
		//if statement saying if they reach y = 15 sprite is deleted and 
	
	
}


PS.init = function( system, options ) {
	var backWindowCol = PS.makeRGB(156, 156, 156);
	PS.gridSize(10, 15);
	PS.color(PS.ALL, PS.ALL, backWindowCol);
	PS.gridColor(backWindowCol);
	
	PS.spriteMove(player, 0, 14);
	coins = 10;
	spawnTaxes();
	PS.spriteSolidColor(player, PS.COLOR_GREEN);
	


	//Difficulty settings -> they change the speed of the enemies
	//enemies move down at varying speeds; taxes are fastest, car second, utilities third
		//each enemy takes x amount of shots to kill
	//no end state at first will code that in with second iteration
	//sprite that is a coin 
		//each time you shoot it takes a coin from the player
	//coin collides with enemy -> enemy dies and give player more coins




	// This is also a good place to display
	// your game title or a welcome message
	// in the status line above the grid.
	// Uncomment the following code line and
	// change the string parameter as needed.
	// Add any other initialization code you need here.
};


PS.touch = function( x, y, data, options ) {
	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );


};


PS.release = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};


PS.enter = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};


PS.exit = function( x, y, data, options ) {
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};


PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

PS.keyDown = function( key, shift, ctrl, options ) {
	PS.statusText(key);
	if (key == 97) {
		if (px - 1 != -1) {
			PS.spriteMove(player, px - 1, 14);
			px--;
		}
	}
	else if (key == 100) {
		if (px + 1 != 10) {
			PS.spriteMove(player, px + 1, 14);
			px++;
		}
	}
	else if (key == 32) {
		//fire coin
		//deduct from coins
	}
};


PS.keyUp = function( key, shift, ctrl, options ) {
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};


PS.input = function( sensors, options ) {
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

