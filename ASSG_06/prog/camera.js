/**
 * Specifies a camera in 3D space. Used by scene.
 */
class Camera {
    /**
    * Specifies a camera in 3D space. Used by scene.
    */
    constructor() {

    	this.cameraX = 10;
    	this.cameraY = 0;
    	this.cameraZ = 50;

    	this.cameraRotation = 0;

        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
    }

    changeFOV(fov, aspect, near, far) {
    	this.projectionMatrix.setPerspective(fov, aspect, near, far);
    }

    changeToOrtho(){
    	// left, right, bottom, top, near, far
    	this.projectionMatrix.setOrtho(0, 1, 1, 0, 0.1, 10000);
    }
    
    getProjMatrix() {
    	return this.projectionMatrix;
    }

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
