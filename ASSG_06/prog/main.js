// All the event handlers
let canvas, hud, gl, ctx;
let a_Position;
let u_FragColor, u_ModelMatrix, u_MvpMatrix;

// Holds every geometry in the scene
let scene, camera;

// How far the camera moves any one step
let movementAmt = 0.2;
let turnAmt = 0.02;

let mvpMatrix;

let eyeX = 3.0;
let eyeY = 0.0;
let eyeZ = -13.0;

let lookAtL = 0.0;
let lookAtR = 0.0;

let posMsg;

let up, down, left, right = 0.0;

let cubeSelection = "none";

/*
0.1 = 22.5
0.2 = 51
0.3 = 76.5
0.4 = 102
0.5 = 127.5
0.6 = 153
0.7 = 178.5
0.8 = 204
0.9 = 229.5
*/

/**
 * Function called when the webpage loads.
 */
function main() {
	// Initializing all the event handlers defined as globals above
    initEventHandelers();
    
    // Purple
    let newCube2 = new Cube(
        0.5, 0.0, 0.1,
        0.2, 0.1, 0.3,
        0.5);
    scene.addGeometry(newCube2);

    // Black
    let newCube3 = new Cube(
        0.2, 0.0, 0.2,
        0.1, 0.1, 0.1,
        0.4);
    scene.addGeometry(newCube3);

    // let newCube4 = new Cube(
    //     -0.3, 0.0, -0.1,
    //     0.9, 0.9, 0.1,
    //     0.05);
    // scene.addGeometry(newCube4);

    // let newCube5 = new Cube(
    //     -0.1, 0.1, -0.11,
    //     0.9, 0.5, 0.9,
    //     0.1);
    // scene.addGeometry(newCube5);

    // let newCube6 = new Cube(
    //     -0.5, 0.0, 0.11,
    //     0.1, 0.5, 0.9,
    //     0.1);
    // scene.addGeometry(newCube6);

    // Blue
    let newCube7 = new Cube(
        -0.7, 0.0, 0.0,
        0.1, 0.1, 0.9,
        0.4);
    scene.addGeometry(newCube7);

    // let newCube8 = new Cube(
    //     -0.8, 0.0, -0.5,
    //     0.1, 0.0, 0.1,
    //     0.15);
    // scene.addGeometry(newCube8);

    let sunCube = new TiltedCube(
        -0.8, 0.8, 0.0,
        1.0, 0.9, 0.9,
        0.05);
    scene.addGeometry(sunCube);

    camera.moveCameraZ(0.0);

    scene.render();

    drawHudMsg("CUBE COLOR no cube selected", "CUBE POS       no cube selected");

    // WASD keydown inputs for camera movement
    // JL keydown inputs for camera rotation
    document.addEventListener('keydown', function (event) {
        // Camera movement
        // W
        if (event.keyCode == 87) {
            console.log("W");

            eyeZ += movementAmt;
        }
        // A
        if (event.keyCode == 65) {
            console.log("A");

            eyeX += movementAmt;
        }
        // S
        if (event.keyCode == 83) {
            console.log("S");

            eyeZ -= movementAmt;
        }
        // D
        if (event.keyCode == 68) {
            console.log("D");

            eyeX -= movementAmt;
        }

        // UP
        if (event.keyCode == 38) {
            console.log("UP");
            
        }
        // DOWN
        if (event.keyCode == 40) {
            console.log("DOWN");

        }
        // LEFT
        if (event.keyCode == 37) {
            console.log("LEFT");

        }
        // RIGHT
        if (event.keyCode == 39) {
            console.log("RIGHT");

        }
    });


    // Function for when the mouse is pressed
    canvas.onmousedown = function (ev) {
        click(ev);
    }

    // Resetting the mouse down flag to false
    document.onmouseup = function () {
    };

	tick();
}// End main