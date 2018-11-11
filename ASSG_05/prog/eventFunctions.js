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
	
	console.log(shapeFlag);
	console.log("x: " + xCoord + " y: " + yCoord);
	console.log("r: " + rColor + " g: " + gColor + " b: " + bColor);
	console.log("size: " + size + " segCount: " + segCount);

	

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

	case "texCube":
		let newTexCube = new TexCube(xCoord, yCoord, rColor, gColor, bColor, size, solidColorFlag, "external/textures/checkerboard.png");
		scene.addGeometry(newTexCube);
		break;

	case "obj":
		let newOBJ = new LoadedOBJ(xCoord, yCoord, rColor, gColor, bColor, size, objString, solidColorFlag);
		scene.addGeometry(newOBJ);
		break;

	case "texTest":
		let newTexSquare = new SpinningTexSquare(xCoord, yCoord, rColor, gColor, bColor, size, solidColorFlag);
		scene.addGeometry(newTexSquare);
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

	// Creating scene that will hold all geometries
	scene = new Scene();
	camera = new Camera();


	// Creating shader program
	defaultShaderProgram = createProgram(gl, ASSIGN1_VSHADER, ASSIGN1_FSHADER);

	texShaderProgram = createProgram(gl, TEX_VSHADER, TEX_FSHADER);
}// End initEventHandelers

function initTextures(n, imgPath) {
	let texture = gl.createTexture();

	u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');

	let image = new Image();

	image.onload = function(){
		loadTexture(n, texture, u_Sampler, image);
	}

	image.src = imgPath;
}

function loadTexture(n, texture, u_Sampler, image) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
	// Enable the texture unit 0
	gl.activeTexture(gl.TEXTURE0);
	// Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture);
	
	// Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	// Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	
	// Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler, 0);
}

function loadImage(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}

function loadImages(urls, callback) {
  var images = [];
  var imagesToLoad = urls.length;

  // Called each time an image finished
  // loading.
  var onImageLoad = function() {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad == 0) {
      callback(images);
    }
  };

  for (var ii = 0; ii < imagesToLoad; ++ii) {
    var image = loadImage(urls[ii], onImageLoad);
    images.push(image);
  }
}