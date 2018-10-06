// Making clicked points a global because it's used all over the place
class pointData {
  constructor(x, y, r, g, b, size) {
  	this.x = x;
  	this.y = y;
  	this.r = r;
  	this.g = g;
  	this.b = b;
  	this.size = size;
  }
};

let clickedPoints = [];

// Making a 

function initEventHandelers() {

}

function click(ev, canvas) {
  let x = ev.clientX; // X coord of a mouse pointer
  let y = ev.clientY; // Y coord of a mouse pointer
  let rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.height/2) / (canvas.height/2);
  y = (canvas.width/2 - (y - rect.top)) / (canvas.width/2);

  // Updating the clicked text
  document.getElementById("clickedPointsText").innerHTML = "x: " + x + " y: " + y;

  // Grabbing color data from sliders
  let r = document.getElementById("redSlider").value/255;
  let g = document.getElementById("greenSlider").value/255;
  let b = document.getElementById("blueSlider").value/255;
  let size = document.getElementById("sizeSlider").value;

  // console.log("red: " + redSliderValue + "\n" +  "green: " + greenSliderValue + "\n" + "blue: " + blueSliderValue + "\n" + "size: " + sizeSliderValue);

  let newPointData = new pointData(x, y, r, g, b, size);

  clickedPoints.push(newPointData)

}

/**
 * Renders the scene on the HTML canvas.
 */
function render(gl, a_Position, a_PointSize) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  for(let i = 0; i < clickedPoints.length; ++i) {
  	let x = clickedPoints[i].x;
  	let y = clickedPoints[i].y;
  	let r = clickedPoints[i].r;
  	let g = clickedPoints[i].g;
  	let b = clickedPoints[i].b;
  	let s = clickedPoints[i].size;

  	console.log(i + ") " + "x: " + x + " y: " + y + " r: " + r + " g: " + g + " b: " + b + " s: " + s);

  	// Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, x, y, 0.0);

    // Pass vertex position to attribute variable
    gl.vertexAttrib1f(a_PointSize, s);

    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas() {
  //
  // YOUR CODE HERE
  //
}

/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {float} size Real value representing the size of the point.
 */
function changePointSize(size) {
  //
  // YOUR CODE HERE
  //
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {float} color Color value from 0.0 to 1.0.
 */
function changePointColor(color) {
  //
  // YOUR CODE HERE
  //
}
