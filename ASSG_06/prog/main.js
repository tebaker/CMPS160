// Global declerations
let shapeFlag = "square"; // Default shape is square
let solidColorFlag = false; // Default color is solid
let wireFrameFlag = false; // Default is no wireframe

// All the event handlers
let canvas, gl;
let a_Position, a_Color;
let u_FragColor, u_Sampler;
let u_ModelMatrix, u_ViewMatrix, u_ProjMatrix;

// Images
let checkerBoardImage, flclImage, catImage, teapotImage, jamesHeadImage;

// Holds every geometry in the scene
let scene, camera;

// Holding the shader programs
let defaultShaderProgram, texShaderProgram;

// Math
let mathPi = Math.PI;

// Time info
let masterTime = performance.now();

// Will be set to true one every 1000 milliseconds
let tickFlag = false;

// Holding the .obj file in string form
let objString = "";

let movementAmt = 0.25;
let turnAmt = 1;

let globalSize = 0.5;

let cameraPerspectiveViewFlag = true;

/**
 * Function called when the webpage loads.
 */
function main() {
	// Initializing all the event handlers defined as globals above
	initEventHandelers();

	// Generating a world for the player to explore
	createWorld();


	// WASD keydown inputs for camera movement
	// JL keydown inputs for camera rotation
	document.addEventListener('keydown', function(event) {
	// Camera movement
		// W
		if(event.keyCode == 87) {
			console.log("W");
			camera.moveCameraZ(-movementAmt);
		}
		// A
		if(event.keyCode == 65) {
			console.log("A");
			camera.moveCameraX(-movementAmt);
		}
		// S
		if(event.keyCode == 83) {
			console.log("S");
			camera.moveCameraZ(movementAmt);
		}
		// D
		if(event.keyCode == 68) {
			console.log("D");
			camera.moveCameraX(movementAmt);
		}
	// Camera rotation
		// J
		if(event.keyCode == 74) {
			console.log("J");
			camera.turnCameraRL(-turnAmt);
		}
		// L
		if(event.keyCode == 76) {
			console.log("L");
			camera.turnCameraRL(turnAmt);
		}
	});

	tick();

}// End main
