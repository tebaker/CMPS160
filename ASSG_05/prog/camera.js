/**
 * Specifies a camera in 3D space. Used by scene.
 */
class Camera {
    /**
    * Specifies a camera in 3D space. Used by scene.
    */
    constructor() {

    	this.cameraX = 0;
    	this.cameraY = 0;
    	this.cameraZ = 10;

    	this.cameraRotation = 0;

        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
    }

// setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ)

    // Turning the camera left, right
    turnCameraRL(turnAmt) {
    	this.cameraRotation += turnAmt;
    	this.viewMatrix.setLookAt(this.cameraX, this.cameraY, this.cameraZ, this.cameraRotation, 0, -100, 0, 1, 0);
    }

    // Moving the camera left, right, forward, back
    moveCameraX(movAmt) {
    	this.cameraX += movAmt;
    	this.viewMatrix.setLookAt(this.cameraX, this.cameraY, this.cameraZ, this.cameraRotation, 0, -100, 0, 1, 0);
    }

    moveCameraZ(movAmt) {
    	this.cameraZ += movAmt;
    	this.viewMatrix.setLookAt(this.cameraX, this.cameraY, this.cameraZ, this.cameraRotation, 0, -100, 0, 1, 0);
    }

    getViewMatrix() {
    	return this.viewMatrix;
    }

}