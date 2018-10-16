/**
* Specifies a RandomCircle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {RandomCircle}
*/
class RandomCircle extends Circle {
	/**
	* Constructor for RandomCircle.
	*
	* @constructor
	* @param {Number} radius The radius of the Randomcircle being constructed
	* @param {Integer} segments The number of segments composing the Randomcircle
	* @param {Number} centerX The central x-position of the Randomcircle
	* @param {Number} centerY The central y-position of the Randomcircle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, segVal) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal, segVal);

		super.shape = "randomCricle";

		this.modelMatrix = new Matrix4();

		//	Current direction the shape is traveling in
		this.currentAngle = Math.floor(Math.random() * 360) + 1  ;

		// Translation directions
		this.varTx = 0.0;

		this.flag = false;
	}

	// will update model direction and travel location
	updateAnimation() {

		this.currentAngle += 0.5;

		this.varTx += Math.sin(this.currentAngle) / 100;

		console.log(this.varTx);

		this.modelMatrix.setRotate(this.currentAngle, 0, 0, 1);
		
		this.modelMatrix.translate(this.varTx, 0, 0);

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
}// End class RandomCircle