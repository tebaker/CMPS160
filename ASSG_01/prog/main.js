/**
 * Function called when the webpage loads.
 */
function main() {
  // Retrieve <canvas> element
  let canvas = document.getElementById('example');
  if (!canvas) {
  	console.log("Failed to retrieve the <canvas> element");
  	return;
  }

  // Get the rendering context for 2DCG
  let ctx = canvas.getContext('2d');

  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';

  // Setting the 'fill' from corner to corner
  ctx.fillRect(0, 0, 500, 500);

}
