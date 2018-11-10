/**
 * Specifies a camera in 3D space. Used by scene.
 */
class Camera {
    /**
    * Specifies a camera in 3D space. Used by scene.
    */
    constructor() {

    	this.cameraX = 0.25;
    	this.cameraY = 0.25;
    	this.cameraZ = 0.25;

    	this.cameraLookAtX = 0.0;
    	this.cameraLookAtY = 0.0;
    	this.cameraLookAtZ = 0.0;

    	this.rotationAngle = 0.0;

        this.position = new Vector3([0, 0, 0]);
        this.center = new Vector3([0, 0, -1]);
        this.up = new Vector3([0, 1, 0]);

        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
    }

    /**
    * Rotates the camera.
    *
    * @param angle The angle of rotation
    * @param x The x-direction of your rotation
    * @param y The x-direction of your rotation
    * @param z The x-direction of your rotation
    */
    setCameraRotate(fovy, aspect, near, far) {
    	this.projectionMatrix.setPerspective(fovy, aspect, near, far);
    }

    /**
    * Rotates the camera.
    *
    * @param distance The distance of camera movement
    * @param x The x-direction of your rotation
    * @param y The x-direction of your rotation
    * @param z The x-direction of your rotation
    */
    setCameraLookAt() {
    	this.viewMatrix.setLookAt(this.cameraX, this.cameraY, this.cameraZ, this.cameraLookAtX, this.cameraLookAtY, this.cameraLookAtZ, 0, 1, 0);
    }

    setCameraX(xVal) {
    	this.cameraX += xVal;
    }
    setCameraY(yVal) {
    	this.cameraY += yVal;
    }
    setCameraZ(zVal) {
    	this.cameraZ += zVal;
    }


    /**
    * Changes the projection. Can be orthographic or perspective.
    *
    * @param {String} perspectiveType The type of projection
    */
    setProjection(projectionType) {
      // YOUR CODE HERE
    }

    /**
    * Updates the view matrix of your camera.
    */
    updateViewMatrix() {
        this.viewMatrix.setLookAt(
            this.position.elements[0],
            this.position.elements[1],
            this.position.elements[2],
            this.center.elements[0],
            this.center.elements[1],
            this.center.elements[2],
            this.up.elements[0],
            this.up.elements[1],
            this.up.elements[2]
        );
    }
}
