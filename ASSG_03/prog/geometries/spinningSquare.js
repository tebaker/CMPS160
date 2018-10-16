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
		
		super.shape = "spinningSquare";

		this.modelMatrix = new Matrix4();

		//	Current direction the shape is traveling in
		// this.currentAngle = Math.floor(Math.random() * 360) + 1  ;

		// Translation directions
		this.currentAngle = 0.0;
	}

	// will update model direction and travel location
	updateAnimation() {

		this.currentAngle += 0.5;

		// console.log(this.varTx);

		this.modelMatrix.setRotate(this.currentAngle, this.currentAngle, 0, 1);

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