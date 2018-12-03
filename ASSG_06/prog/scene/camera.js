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
        this.cameraZ = -15;

        this.cameraRotation = 0;

        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
    }

    getProjMatrix() {
        return this.projectionMatrix;
    }

    getViewMatrix() {
        return this.viewMatrix;
    }

    setFOV(fov, aspect, near, far) {
        this.projectionMatrix.setPerspective(fov, aspect, near, far);
    }

    // Turning the camera left, right
    turnCameraRL(turningAmt) {
        this.cameraRotation += turningAmt;
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
}