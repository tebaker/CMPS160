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
  	isMouseDown = true
  	click(ev, canvas);
  	render(gl, a_Position, a_PointSize, u_FragColor);
  }

  var isMouseDown = false;
  document.onmouseup   = function() { isMouseDown = false };
  canvas.onmousemove = function(ev) { if(isMouseDown) {
  	click(ev, canvas);
  	render(gl, a_Position, a_PointSize, u_FragColor);
  } };


	document.getElementById("clearButton").addEventListener("click",
		function myFunction() {
			console.log("1");
			clearCanvas(gl);
		}
	);

	document.getElementById("squaresButton").addEventListener("click",
		function myFunction() {
			console.log("2");
		}
	);

	document.getElementById("trianglesButton").addEventListener("click",
		function myFunction() {
			console.log("3");	
		}
	);

	document.getElementById("circlesButton").addEventListener("click",
		function myFunction() {
			console.log("4");
		}
	);


}
