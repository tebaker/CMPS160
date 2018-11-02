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
		let newSquare = new SpinningSquare(xCoord, yCoord, rColor, gColor, bColor, size);
		scene.addGeometry(newSquare);
		break;

	case "triangle":
		let newTriangle = new FluctuatingTriangle(xCoord, yCoord, rColor, gColor, bColor, size);
		scene.addGeometry(newTriangle);
		break;

	case "circle":
		let newCircle = new RandomCircle(xCoord, yCoord, rColor, gColor, bColor, size, segCount);
		scene.addGeometry(newCircle);
		break;

	case "cube":
		let newCube = new TiltedCube(xCoord, yCoord, rColor, gColor, bColor, size);
		scene.addGeometry(newCube);
		break;

	case "obj":
		let newOBJ = new LoadedOBJ(xCoord, yCoord, rColor, gColor, bColor, size, objString);
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

	// Initialize shaders
	if(!initShaders(gl, ASSIGN1_VSHADER, ASSIGN1_FSHADER)) {
		console.log('Failed to initialize shaders');
		return;
	}

	// Get the location of attribute variable a_Position
	a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Fail to get the storage location of a_Position');
		return;
	} 

	u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	if (!u_ModelMatrix) { 
		console.log('Failed to get the storage location of u_ModelMatrix');
		return;
	}

	// Get the location of attribute variable of a_PointSize
	a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if (a_Color < 0) {
		console.log('Fail to get the storage location of a_Color');
		return;
	}

	/*u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor) {
		console.log('Failed to get u_FragColor variable');
		return;
	}*/
}// End initEventHandelers