// Upon mouse down event, function click will calculate x, y, r, g, b, size, segment count 
function click(ev) {
	let xCoord = ev.clientX; // x coord of a mouse pointer
	let yCoord = ev.clientY; // y coord of a mouse pointer
	let rect = ev.target.getBoundingClientRect();

	xCoord = ((xCoord - rect.left) - canvas.height/2) / (canvas.height/2);
	yCoord = (canvas.width/2 - (yCoord - rect.top)) / (canvas.width/2);

	// Sending the current x, y data to be updated in the HTML
	sendTextToHTML("x: " + xCoord + " y: " + yCoord, "clickedPointsText");

	// Grabbing color data from sliders
	let rColor = document.getElementById("redSlider").value/255;
	let gColor = document.getElementById("greenSlider").value/255;
	let bColor = document.getElementById("blueSlider").value/255;

	let size = document.getElementById("sizeSlider").value/100;

	let segCount = document.getElementById("segmentSlider").value;

	// console.log("x: " + xCoord + " y: " + yCoord);
	// console.log("r: " + rColor + " g: " + gColor + " b: " + bColor);
	// console.log("size: " + size + " segCount: " + segCount);

	console.log(shapeFlag);

	switch(shapeFlag) {
	case "square":
		let newSquare = new SpinningSquare(xCoord, yCoord, rColor, gColor, bColor, size, solidColorFlag);
		scene.addGeometry(newSquare);
		break;

	case "triangle":
		let newTriangle = new FluctuatingTriangle(xCoord, yCoord, rColor, gColor, bColor, size, solidColorFlag);
		scene.addGeometry(newTriangle);
		break;

	case "circle":
		let newCircle = new RandomCircle(xCoord, yCoord, rColor, gColor, bColor, size, segCount, solidColorFlag);
		scene.addGeometry(newCircle);
		break;

	case "cube":
		let newCube = new TiltedCube(xCoord, yCoord, rColor, gColor, bColor, size, solidColorFlag);
		scene.addGeometry(newCube);
		break;

	case "obj":
		let newOBJ = new LoadedOBJ(xCoord, yCoord, rColor, gColor, bColor, size, objString, solidColorFlag);
		scene.addGeometry(newOBJ);
		break;

	default:
		console.log("Default case reached. Undefined shape");
	}
}// End click

/**
* Renders the scene on the HTML canvas.
*/
function render() {
	scene.render();
}

/**
* Clears the HTML canvas.
*/
function clearCanvas(gl) {
	scene.clearGeometry();
}

// Definind all the event handlers. Global declerations in main
function initEventHandelers() {
	scene = new Scene();

	// Retrieve <canvas> element
	canvas = document.getElementById('webgl');
	if(!canvas) {
		console.log("Failed to retrieve the <canvas> element");
		return;
	}

	// Get the rendering ontext for WebGL
	gl = getWebGLContext(canvas);
	if(!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	}

	// Creating shader program
	defaultShaderProgram = createProgram(gl, ASSIGN1_VSHADER, ASSIGN1_FSHADER);

	texShaderProgram = createProgram(gl, TEX_VSHADER, TEX_FSHADER);


}// End initEventHandelers

function createShader (gl, sourceCode, type) {
	// Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
	var shader = gl.createShader( type );
	gl.shaderSource( shader, sourceCode );
	gl.compileShader( shader );

	if ( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
		var info = gl.getShaderInfoLog( shader );
		throw 'Could not compile WebGL program. \n\n' + info;
	}
	return shader;
}