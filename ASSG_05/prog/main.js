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

let movementAmt = 0.01;

/**
 * Function called when the webpage loads.
 */
function main() {
	// Initializing all the event handlers defined as globals above
	initEventHandelers();


	// console.log(checkerBoardImage.src);
	
	let newTexCube1 = new NonRotatingTexCube(0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.2, false, "external/textures/checkerboard.png");
	scene.addGeometry(newTexCube1);
	// let newTexCube2 = new NonRotatingTexCube(0.0, 0.0, -0.25, 1.0, 1.0, 1.0, 0.2, false, "external/textures/checkerboard.png");
	// scene.addGeometry(newTexCube2);
	// let newTexCube3 = new NonRotatingTexCube(0.0, 0.0, -1.0, 1.0, 1.0, 1.0, 0.2, false, "external/textures/checkerboard.png");
	// scene.addGeometry(newTexCube3);
	

	// Flag for if the mouse is currently down or not
	let isMouseDown = false;

	// Function for when the mouse is pressed
	canvas.onmousedown = function(ev) {
		isMouseDown = true;
		click(ev);
		render();
	}

	// Resetting the mouse down flag to false
	document.onmouseup   = function() {
		isMouseDown = false;
	};

	// Check for if mouse is being dragged
	canvas.onmousemove = function(ev) {
		if(isMouseDown) {
			click(ev);
			render();
		}
	};

	// WASD keydown inputs for camera movement
	// JL keydown inputs for camera rotation
	document.addEventListener('keydown', function(event) {
	// Camera movement
		// W
		if(event.keyCode == 87) {
			console.log("W");
			camera.setCameraZ(movementAmt);
		}
		// A
		if(event.keyCode == 65) {
			console.log("A");
			camera.setCameraX(movementAmt);
		}
		// S
		if(event.keyCode == 83) {
			console.log("S");
			camera.setCameraZ(-movementAmt);
		}
		// D
		if(event.keyCode == 68) {
			console.log("D");
			camera.setCameraX(-movementAmt);
		}
	// Camera rotation
		// J
		if(event.keyCode == 74) {
			console.log("J");
			camera.rotate(movementAmt, 0, 0, 0);
		}
		// L
		if(event.keyCode == 76) {
			console.log("L");
			camera.rotate(-movementAmt, 0, 0, 0);
		}
	});

	tick();

	// Loading obj file from html
	document.getElementById("loadFileAsText").addEventListener("click",
		function myFunction() {

			let somethingElse;

			var fileToLoad = document.getElementById("fileToLoad").files[0];

			var fileReader = new FileReader();

			fileReader.onload = function(fileLoadedEvent){

				objString = fileLoadedEvent.target.result;
			};

			fileReader.readAsText(fileToLoad, "UTF-8");

			shapeFlag = "obj";
		}
	);

	document.getElementById("clearButton").addEventListener("click",
		function myFunction() {
			clearCanvas(gl);
		}
	);

}// End main
