
// I've decided to not make gl a global variable. I'm doing this so I know exactly where and why I'm passing it into everything

// Holding the clicked point's positions
let posPoints = [];

// Holding the clicked point's color
let colorPoints = [];

// Holding the clicked point's size
let sizePoints = [];

function initEventHandelers() {
  // I'm defining my event handlers in Main
}

// Upon mouse down event, click will collect mouse (x, y) data and store it in clickedPoints array
function click(ev, canvas) {
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

  let size = document.getElementById("sizeSlider").value;

  // console.log("red: " + redSliderValue + "\n" +  "green: " + greenSliderValue + "\n" + "blue: " + blueSliderValue + "\n" + "size: " + sizeSliderValue);

  changePointCoord({x: xCoord, y: yCoord});
  changePointColor({r: rColor, g: gColor, b: bColor});
  changePointSize(size);

  // console.log(posPoints.length + " " + colorPoints.length + " " + sizePoints.length + " ");
  // console.log("x: " + xCoord + " y: " + yCoord);

}

/**
 * Renders the scene on the HTML canvas.
 */
function render(gl, a_Position, a_PointSize, u_FragColor) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  for(let i = 0; i < sizePoints.length; ++i) {
  	let x = posPoints[i].x;
  	let y = posPoints[i].y;

  	let r = colorPoints[i].r;
  	let g = colorPoints[i].g;
  	let b = colorPoints[i].b;

  	let s = sizePoints[i];

  	// console.log(i + ") " + "x: " + x + " y: " + y + " r: " + r + " g: " + g + " b: " + b + " s: " + s);

  	sendUniformFloatToGLSL(gl, [x, y, 0.0], a_Position);

    // Pass vertex position to attribute variable
    gl.vertexAttrib1f(a_PointSize, s);

    sendUniformVec4ToGLSL(gl, [r, g, b, 1.0], u_FragColor);

    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

/**
 * Clears the HTML canvas.
 */
function clearCanvas(gl) {
  posPoints = [];
  colorPoints = [];
  sizePoints = [];

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

/**
 * Changes the size of the points drawn on HTML canvas.
 *
 * @param {int} size integer value representing the size of the point.
 */
function changePointSize(size) {
  sizePoints.push(size);
}

/**
 * Changes the color of the points drawn on HTML canvas.
 *
 * @param {r, g, b} color value from 0.0 to 1.0.
 */
function changePointColor(colorData) {
  colorPoints.push(colorData);
}

/**
 * Changes the position of the points drawn on HTML canvas.
 *
 * @param {x, y} color value from +- 0.0 to +- 1.0.
 */
function changePointCoord(posData) {
  posPoints.push(posData);
}