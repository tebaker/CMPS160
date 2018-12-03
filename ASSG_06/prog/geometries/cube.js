/**
* Specifies a TiltedCube. A subclass of Geometry.
*
* @author Talon Baker
* @this {TiltedCube}
*/
class Cube extends Geometry {
	/**
	* Constructor for TiltedCube.
	*
	* @constructor
	* @param {Number} size The size of the TiltedCube drawn
	* @param {Number} centerX The center x-position of the TiltedCube
	* @param {Number} centerY The center y-position of the TiltedCube
	*/
    constructor(centerX, centerY, centerZ, rVal, gVal, bVal, sizeVal) {
        super();
        super.shape = "TiltedCube";
        super.centerPoint = { x: centerX, y: centerY };
        super.color = { r: rVal, g: gVal, b: bVal };
        super.size = sizeVal;
        super.vertices = new Vertex();

        this.centerX = centerX;
        this.centerY = centerY;

        this.generateTiltedCubeVertices(centerX, centerY, centerZ, sizeVal);

        this.modelMatrix = new Matrix4();

        // Translation directions
        this.currentAngle = 1;
    }

    // will update model direction and travel location
    updateAnimation() { }

	/**
	* Overloaded base class renders in order to update animaton / movement
	*/
    render() {

        var mvpMatrix = new Matrix4();

        mvpMatrix.setPerspective(10, canvas.width / canvas.height, 1, 100);
        mvpMatrix.lookAt(0, 0, -10, 0, 0, 0, 0, 1, 0);
        gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

        sendUniformVec4ToGLSL(u_FragColor, [this.color.r, this.color.g, this.color.b, 1.0]);

        let renderVertices = new Float32Array(this.vertices.getArray());
        let n = this.vertices.getLength() / 3;

        sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);

        // Render Vertices = Float32Array.
        sendAttributeBufferToGLSL(renderVertices, n);
    }

	/**
	* Generates the vertices of the TiltedCube.
	*
	* @private
	* @param {Number} size The size of the TiltedCube drawn
	* @param {Number} centerX The center x-position of the TiltedCube
	* @param {Number} centerY The center y-position of the TiltedCube
	*/
    generateTiltedCubeVertices(centerX, centerY, centerZ, size) {
		/*
			Cube faces will be repeated 4 times for the sides
			and 2 more times for the top and bottom.

			Faces:

			p1*-----*p2   *p2
			  |   /     / |
			  | /     /   |
			p0*   p0*-----*p3

			First triangle: p0, p1, p2

			Second triangle: p2, p3, p0
		*/

        /*FRONT SQUARE*/
        /*012*/
        // p0
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            size // z
        );
        // p1
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            size // z
        );
        // p2
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            size // z
        );
        /*023*/
        // p2
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            size // z
        );
        // p3
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            size // z
        );
        // p0
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            size // z
        );
        /*RIGHT SQUARE*/
        /*324*/
        // p3
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            size // z
        );
        // p2
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            size // z
        );
        // p4
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            -size // z
        );
        /*345*/
        // p3
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            size // z
        );
        // p4
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            -size // z
        );
        // p5
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            -size // z
        );
        /*BACK SQUARE*/
        /*546*/
        // p5
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            -size // z
        );
        // p4
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            -size // z
        );
        // p6
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            -size // z
        );
        /*567*/
        // p5
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            -size // z
        );
        // p6
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            -size // z
        );
        // p7
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            -size // z
        );
        /*LEFT SQUARE*/
        /*761*/
        // p7
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            -size // z
        );
        // p6
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            -size // z
        );
        // p1
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            size // z
        );
        /*710*/
        // p7
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            -size // z
        );
        // p1
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            size // z
        );
        // p0
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            size // z
        );
        /*TOP SQUARE*/
        /*164*/
        // p1
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            size // z
        );
        // p6
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            -size // z
        );
        // p4
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            -size // z
        );
        /*142*/
        // p1
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY + size), // y
            size // z
        );
        // p4
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            -size // z
        );
        // p2
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY + size), // y
            size // z
        );
        /*BOTTOM SQUARE*/
        /*703*/
        // p7
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            -size // z
        );
        // p0
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            size // z
        );
        // p3
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            size // z
        );
        /*735*/
        // p7
        this.vertices.addPoints(
            (centerX - size), // x
            (centerY - size), // y
            -size // z
        );
        // p3
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            size // z
        );
        // p5
        this.vertices.addPoints(
            (centerX + size), // x
            (centerY - size), // y
            -size // z
        );
    }// End generateTiltedCubeVertices
}// End class TiltedCube