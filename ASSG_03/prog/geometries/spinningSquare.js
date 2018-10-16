/**
* Specifies a SpinningSquare. A subclass of Geometry.
*
* @author Talon Baker
* @this {SpinningSquare}
*/
class SpinningSquare extends Square {
	/**
	* Constructor for SpinningSquare.
	*
	* @constructor
	* @param {Number} size The size of the SpinningSquare drawn
	* @param {Number} centerX The center x-position of the SpinningSquare
	* @param {Number} centerY The center y-position of the SpinningSquare
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal);
		
		this.centerX = centerX;
		this.centerY = centerY;

		super.shape = "spinningSquare";

		this.modelMatrix = new Matrix4();

		// Translation directions
		this.currentAngle = 1;
	}

	// will update model direction and travel location
	updateAnimation() {
		// console.log(this.centerX, this.centerY);
		let translateMatrix1 = new Matrix4();
		let rotateMatrix = new Matrix4();
		let translateMatrix2 = new Matrix4();

		//T
		translateMatrix1.setTranslate(-this.centerX, -this.centerY, 0);

			this.modelMatrix = translateMatrix1.multiply(this.modelMatrix);

		//R
		rotateMatrix.setRotate(this.currentAngle, 0, 0, 1);

			this.modelMatrix = rotateMatrix.multiply(this.modelMatrix);

		//T
		translateMatrix2.setTranslate(this.centerX, this.centerY, 0);

			this.modelMatrix = translateMatrix2.multiply(this.modelMatrix);

		// Pass the rotation matrix to the vertex shader
		gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
		this.render();
	}

	/**
	* Overloaded base class renders in order to update animaton / movement
	*/
	render() {
		sendUniformVec4ToGLSL(u_FragColor, [this.color.r, this.color.g, this.color.b, 1.0]);

		let renderVertices = new Float32Array(this.vertices.getArray());
		let n = this.vertices.getLength() / 3;

		sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);

		// Render Vertices = Float32Array.
		sendAttributeBufferToGLSL(renderVertices, n);
	}
}// End class SpinningSquare