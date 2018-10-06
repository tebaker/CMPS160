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

  // // Get the location of attribute variable
  // let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  // if (a_Position < 0) {
  // 	console.log('Fail to get the storage location of a_Position');
  // 	return;
  // } 

  // Pass vertex position to attribute variable
  // gl.vertexAttribute3f(a_Position, 0.0, 0.0, 0.0);

  // Set the color of clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw a point
  gl.drawArrays(gl.POINTS, 0, 1);

}
