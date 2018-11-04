// Global declerations
let shapeFlag = "square"; // Default shape is square
let solidColorFlag = false; // Default color is solid
let wireFrameFlag = false; // Default is no wireframe

// All the event handlers
let canvas, gl;
let a_Position, a_Color;
let u_FragColor, u_ModelMatrix, u_Sampler;

// Holds every geometry in the scene
let scene;

// Holding the shader programs
let defaultShaderProgram, texShaderProgram;

// holding the shaders
let defaultFShader, defaultVShader;
let texFShader, texVShader;

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

	// gl.linkProgram(defaultShaderProgram);
	// gl.useProgram(defaultShaderProgram);

	// Setting clear color and clearing so screen is black on start
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Enable the hidden surface removal function
	// gl.enable(gl.DEPTH_TEST);
	// Clear the color and depth buffer
	// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Flag for if the mouse is currently down or not
	let isMouseDown = false;

	// Function for when the mouse is pressed
	canvas.onmousedown = function(ev) {
		// console.log("But I need to poop too!");
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
			// console.log("I'm in here! Close the door!");
			click(ev);
			render();
		}
	};

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

	// Will toggle wireframe button on / off, rerender for new option
	document.getElementById("wireFrameButton").addEventListener("click",
		function myFunction() {
			if(wireFrameFlag == false) {
				wireFrameFlag = true;
				sendTextToHTML("Drawing Mode (Wireframe ON):", "wireframeText");
			}
			else if(wireFrameFlag == true) {
				wireFrameFlag = false;
				sendTextToHTML("Drawing Mode (Wireframe OFF):", "wireframeText");
			}
			// Rerendering to update selection
			render();
		}
	);

	// Will toggle solid vs. rainbow button. Change shape color accordingly
	document.getElementById("shapeColorButton").addEventListener("click",
		function myFunction() {
			if(solidColorFlag == true) {
				solidColorFlag = false;
				sendTextToHTML("Rainbow", "shapeColorButton");
			}
			else if(solidColorFlag == false) {
				solidColorFlag = true;
				sendTextToHTML("Solid Color", "shapeColorButton");
			}
		}
	);

	document.getElementById("squaresButton").addEventListener("click",
		function myFunction() {
			shapeFlag = "square";
		}
	);

	document.getElementById("trianglesButton").addEventListener("click",
		function myFunction() {
			shapeFlag = "triangle";
		}
	);

	document.getElementById("circlesButton").addEventListener("click",
		function myFunction() {
			shapeFlag = "circle";
		}
	);

	document.getElementById("cubesButton").addEventListener("click",
		function myFunction() {
			shapeFlag = "cube";
		}
	);
}// End main
