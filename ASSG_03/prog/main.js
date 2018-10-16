// Global declerations
let shapeFlag = "square"; // Default shape is square
let wireFrameFlag = false; // Default is no wireframe

// All the event handlers
let canvas, gl;
let a_Position/*, a_PointSize*/;
let u_FragColor, u_ModelMatrix;

// Holds every geometry in the scene
let scene;

// Math
let mathPi = Math.PI;

/**
 * Function called when the webpage loads.
 */
function main() {
	// Initializing all the event handlers defined as globals above
	initEventHandelers();

	// Setting clear color and clearing so screen is black on start
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	// Flag for if the mouse is currently down or not
	let isMouseDown = false;

	// Function for when the mouse is pressed
	canvas.onmousedown = function(ev) {
		// console.log("But I need to poop too!");
		isMouseDown = true
		click(ev);
		render();
	}

	// Resetting the mouse down flag to false
	document.onmouseup   = function() {
		isMouseDown = false
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

	document.getElementById("clearButton").addEventListener("click",
		function myFunction() {
			clearCanvas(gl);
		}
	);

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
