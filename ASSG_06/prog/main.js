// All the event handlers
let canvas, gl;
let a_Position;
let u_FragColor, u_ModelMatrix;

// Holds every geometry in the scene
let scene;

/**
 * Function called when the webpage loads.
 */
function main() {
	// Initializing all the event handlers defined as globals above
    initEventHandelers();
    
    let newCube = new TiltedCube(
        0.0, 0.0,
        0.9, 0.1, 0.1,
        0.2);
    scene.addGeometry(newCube);

	tick();
}// End main
