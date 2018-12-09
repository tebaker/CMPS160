function click(ev) {
    let xCoord = ev.clientX; // x coord of a mouse pointer
    let yCoord = ev.clientY; // y coord of a mouse pointer
    let rect = ev.target.getBoundingClientRect();



    if (rect.left <= xCoord && xCoord < rect.right && rect.top <= yCoord && yCoord < rect.bottom) {
        var x_in_canvas = xCoord - rect.left;
        var y_in_canvas = rect.bottom - yCoord;
    }

    // Sending the current x, y data to be updated in the HTML
    console.log("x: " + x_in_canvas + " y: " + y_in_canvas);

    scene.render();

    var pixels = new Uint8Array(4);
    gl.readPixels(xCoord, yCoord, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    
    let rVal = pixels[0];
    let gVal = pixels[1];
    let bVal = pixels[2];

    console.log(pixels);

    // Purple cube selected
    if(bVal == 76) {
        cubeSelection = "purple";
        posMsg = "x: 0.5, y: 0.0, z: 0.1"
    } // Black cube selected
    else if(bVal == 25) {
        cubeSelection = "black";
        posMsg = "x: 0.2, y: 0.0, z: 0.2"
    } // Blue cube selected 
    else if(bVal == 229) {
        cubeSelection = "blue";
        posMsg = "x: -0.7,y:  0.0, z: 0.0"
    }
    else {
        cubeSelection = "none";
        drawHudMsg("CUBE COLOR no cube selected", "CUBE POS       no cube selected");
    }
    drawHudMsg("CUBE COLOR " + "r: " + rVal + " g: " + gVal + " b: " + bVal, "CUBE POS       " + posMsg);
}
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
	// Retrieve first <canvas> element
	canvas = document.getElementById('webgl');
	if(!canvas) {
		console.log("Failed to retrieve the <canvas> element");
		return;
    }

    // Get the rendering ontext for WebGL
    gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    hud = document.getElementById('hud');
    if (!hud) {
        console.log("Failed to retrieve the <hud> element");
        return;
    }

    ctx = hud.getContext('2d');

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

	u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor) {
		console.log('Failed to get u_FragColor variable');
		return;
    }

    u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    if (!u_MvpMatrix) {
        console.log('Failed to get u_MvpMatrix variable');
        return;
    }
    
    scene = new Scene();
    camera = new Camera();
    mvpMatrix = new Matrix4();

}// End initEventHandelers