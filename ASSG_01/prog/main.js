/**
 * Function called when the webpage loads.
 */
function main() {
  // Retrieve <canvas> element
  let canvas = document.getElementById('webgl');
  if(!canvas) {
  	console.log("Failed to retrieve the <canvas> element");
  	return;
  }

  // Get the rendering ontext for WebGL
  let gl = getWebGLContext(canvas);
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
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
  	console.log('Fail to get the storage location of a_Position');
  	return;
  } 

  // Get the location of attribute variable of a_PointSize
  let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  if (a_PointSize < 0) {
  	console.log('Fail to get the storage location of a_PointSize');
  	return;
  }

  let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if(!u_FragColor) {
  	console.log('Failed to get u_FragColor variable');
  	return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  // Function for when the mouse is pressed
  canvas.onmousedown = function(ev) {
  	// The mouse is clicked: color, size, position are updated
  	click(ev, canvas);

  	// All point data is rendered
  	render(gl, a_Position, a_PointSize, u_FragColor);
  }
}
