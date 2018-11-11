// Will create a world for the player to explore given an image file
function createWorld() {
	
	let image1 = new Image();
	image1 = document.getElementById("worldMapImage");

	let holdDetails1 = sampleImageColor(image1);

	// Getting r, g, b values. Discarding a values
	let r = [];
	let g = []; 
	let b = [];
	for(let i = 0; i < 400; i += 4) {
		r.push(holdDetails1[i]);
		g.push(holdDetails1[i+1]);
		b.push(holdDetails1[i+2]);
	}

	let image2 = new Image();
	image2 = document.getElementById("worldHeightMap");

	let holdDetails2 = sampleImageColor(image2);

	// Getting a values
	let a = [];
	for(let i = 0; i < 400; i += 4) {
		a.push(holdDetails2[i+4]);
	}

	// Creating world
	for(let j = 0; j < 10; ++j) {
		for(let i = 0; i < 10; ++i) {
			let newTexCube = new NonRotatingTexCube(
				globalSize*i*2,						  // x - left / right
				a[10*i + j]/122 * globalSize - 2,	  	  // y - height
				globalSize*j*2,						  // z - front / back
				globalSize,							  // size constant
				"external/textures/checkerboard.png");// image loc
			scene.addGeometry(newTexCube);
		}
	}
}