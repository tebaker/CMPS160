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
			// dirt: 0 - 99
			if(a[10*i + j] <= 99) {
				let newTexCube = new NonRotatingTexCube(
					globalSize*i*2,						  // x - left / right
					a[10*i + j]/122 * globalSize - 2,	  	  // y - height
					globalSize*j*2,						  // z - front / back
					globalSize,							  // size constant
					"external/textures/dirt.png");// image loc
				scene.addGeometry(newTexCube);
			}
			// grass: 100 - 150
			else if(a[10*i + j] > 99 && a[10*i + j] <= 149) {
				let newTexCube = new NonRotatingTexCube(
					globalSize*i*2,						  // x - left / right
					a[10*i + j]/122 * globalSize - 2,	  	  // y - height
					globalSize*j*2,						  // z - front / back
					globalSize,							  // size constant
					"external/textures/dirt.png");// image loc
				scene.addGeometry(newTexCube);
			}
			// snow:  149 - 200
			else {
				let newTexCube = new NonRotatingTexCube(
					globalSize*i*2,						  // x - left / right
					a[10*i + j]/122 * globalSize - 2,	  	  // y - height
					globalSize*j*2,						  // z - front / back
					globalSize,							  // size constant
					"external/textures/dirt.png");// image loc
				scene.addGeometry(newTexCube);
			}
		}
	}


	// Adding bird OBJ to scene
	let teapotObj1 = new LoadedOBJ(5.0, 0.0, 0.0, 0.0, 0.0, 0.2, teapotObject, true);
	scene.addGeometry(teapotObj1);

	let teapotObj2 = new LoadedOBJ(0.0, 0.0, 0.0, 0.0, 0.0, 0.2, teapotObject, true);
	scene.addGeometry(teapotObj2);

	// // Adding bucket OBJ to scene
	// somethingElse;

	// fileToLoad = document.getElementById("bucketFile").files[0];

	// fileReader = new FileReader();

	// fileReader.onload = function(fileLoadedEvent){

	// 	objString = fileLoadedEvent.target.result;
	// };

	// fileReader.readAsText(fileToLoad, "UTF-8");

	// let bucketOBJ = new LoadedOBJ(0.0, 0.0, 0.0, 0.0, 0.0, 0.2, objString, true);
	// scene.addGeometry(bucketOBJ);

	// // Adding shovel OBJ to scene
	// somethingElse;

	// fileToLoad = document.getElementById("shovelFile").files[0];

	// fileReader = new FileReader();

	// fileReader.onload = function(fileLoadedEvent){

	// 	objString = fileLoadedEvent.target.result;
	// };

	// fileReader.readAsText(fileToLoad, "UTF-8");

	// let shovelOBJ = new LoadedOBJ(0.0, 0.0, 0.0, 0.0, 0.0, 0.2, objString, true);
	// scene.addGeometry(shovelOBJ);




	camera.moveCameraZ(0.0);
}
