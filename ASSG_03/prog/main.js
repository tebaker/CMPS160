// Global declerations
let shapeFlag = "square"; // Default shape is square

// All the event handlers
let canvas, gl, a_Position, a_PointSize, u_FragColor;

// Clicked points geometry array
let scene;

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
			click(ev);
			render();
		}
	};

	document.getElementById("clearButton").addEventListener("click",
		function myFunction() {
			clearCanvas(gl);
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
