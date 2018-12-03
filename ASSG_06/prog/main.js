// All the event handlers
let canvas, gl;
let a_Position;
let u_FragColor, u_ModelMatrix, u_MvpMatrix;

// Holds every geometry in the scene
let scene, camera;

// How far the camera moves any one step
let movementAmt = 0.2;
let turnAmt = 1.0;

/**
 * Function called when the webpage loads.
 */
function main() {
	// Initializing all the event handlers defined as globals above
    initEventHandelers();
    
    let newCube1 = new Cube(
        0.0, 0.0, 0.0,
        0.9, 0.1, 0.1,
        0.1);
    scene.addGeometry(newCube1);

    let newCube2 = new Cube(
        0.5, 0.0, 0.1,
        0.2, 0.1, 0.3,
        0.3);
    scene.addGeometry(newCube2);

    let newCube3 = new Cube(
        0.2, 0.0, 0.2,
        0.1, 0.1, 0.1,
        0.2);
    scene.addGeometry(newCube3);

    let newCube4 = new Cube(
        -0.3, 0.0, -0.1,
        0.9, 0.9, 0.1,
        0.05);
    scene.addGeometry(newCube4);

    let newCube5 = new Cube(
        -0.1, 0.0, -0.11,
        0.9, 0.5, 0.9,
        0.1);
    scene.addGeometry(newCube5);

    let newCube6 = new Cube(
        -0.5, 0.0, 0.11,
        0.1, 0.5, 0.9,
        0.1);
    scene.addGeometry(newCube6);

    let newCube7 = new Cube(
        -0.7, 0.0, 0.0,
        0.1, 0.1, 0.9,
        0.2);
    scene.addGeometry(newCube7);

    let newCube8 = new Cube(
        -0.8, 0.0, -0.5,
        0.1, 0.0, 0.1,
        0.15);
    scene.addGeometry(newCube8);

    camera.moveCameraZ(0.0);

    // WASD keydown inputs for camera movement
    // JL keydown inputs for camera rotation
    document.addEventListener('keydown', function (event) {
        // Camera movement
        // W
        if (event.keyCode == 87) {
            console.log("W");
            camera.moveCameraZ(-movementAmt);
        }
        // A
        if (event.keyCode == 65) {
            console.log("A");
            camera.moveCameraX(-movementAmt);
        }
        // S
        if (event.keyCode == 83) {
            console.log("S");
            camera.moveCameraZ(movementAmt);
        }
        // D
        if (event.keyCode == 68) {
            console.log("D");
            camera.moveCameraX(movementAmt);
        }
        // Camera rotation
        // J
        if (event.keyCode == 74) {
            console.log("J");
            camera.turnCameraRL(-turnAmt);
        }
        // L
        if (event.keyCode == 76) {
            console.log("L");
            camera.turnCameraRL(turnAmt);
        }
        // Nromal vs. Phong shading
        // N
        if (event.keyCode == 78) {
            console.log("N");
        }
    });

	tick();
}// End main
