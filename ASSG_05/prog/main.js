// Global declerations
let shapeFlag = "square"; // Default shape is square
let solidColorFlag = false; // Default color is solid
let wireFrameFlag = false; // Default is no wireframe

// All the event handlers
let canvas, gl;
let a_Position, a_Color;
let u_FragColor, u_ModelMatrix, u_Sampler;

// Images
let checkerBoardImage, flclImage, catImage, teapotImage, jamesHeadImage;

// Holds every geometry in the scene
let scene;

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

/**
 * Function called when the webpage loads.
 */
function main() {
	// Initializing all the event handlers defined as globals above
	initEventHandelers();


	// console.log(checkerBoardImage.src);
	
	let newTexCube1 = new TexCube(0.0, 0.0, 1.0, 1.0, 1.0, 0.2, false, "external/textures/checkerboard.png");
		scene.addGeometry(newTexCube1);
	

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

	document.addEventListener('keydown', function(event) {
		// W
		if(event.keyCode == 87) {
			console.log("W");
		}
		// A
		if(event.keyCode == 65) {
			console.log("A");;
		}
		// S
		if(event.keyCode == 83) {
			console.log("S");;
		}
		// D
		if(event.keyCode == 68) {
			console.log("D");
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
