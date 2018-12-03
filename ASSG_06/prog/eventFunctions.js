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

	u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if(!u_FragColor) {
		console.log('Failed to get u_FragColor variable');
		return;
    }

    u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    
    scene = new Scene();
    camera = new Camera();
    mvpMatrix = new Matrix4();

}// End initEventHandelers