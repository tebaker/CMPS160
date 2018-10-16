/**
* Specifies a FluctuatingTriangle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {FluctuatingTriangle}
*/
class FluctuatingTriangle extends Triangle {
	/**
	* Constructor for FluctuatingTriangle.
	*
	* @constructor
	* @param {Number} size The size of the FluctuatingTriangle drawn
	* @param {Number} centerX The center x-position of the FluctuatingTriangle
	* @param {Number} centerY The center y-position of the FluctuatingTriangle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal);
		
		super.shape = "spinningSquare";

		this.modelMatrix = new Matrix4();

		this.scaleAmount = 60;

		// Scale translation
		this.scale = 1.0
	}

	// will update model direction and travel location
	updateAnimation() {

		this.scaleAmount += 0.1;

		let newScale = Math.sin(this.scaleAmount) / 60;

		this.scale += newScale;

		this.modelMatrix.translate(-super.centerX, -super.centerY, 0);

		this.modelMatrix.setScale(this.scale, this.scale, 1, 1);

		this.modelMatrix.translate(super.centerX, super.centerY, 0);

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
}// End class FluctuatingTriangle




/*super(centerX, centerY, rVal, gVal, bVal, sizeVal);
		
		super.shape = "fluctuatingTriangle";

		this.modelMatrix = new Matrix4();

		// Translation directions
		this.scaleX = 0.0;
		this.scaleY = 0.0;
		this.scaleZ = 0.0;
	}

	// will update model direction and travel location
	updateAnimation() {

		this.scaleX += Math.sin(Math.random()) / 100;
		this.scaleY += Math.sin(Math.random()) / 100;
		this.scaleZ += Math.sin(Math.random()) / 100;

		// console.log(this.varTx);

		this.modelMatrix.setScale(scaleX, scaleY, scaleZ);

		// Pass the rotation matrix to the vertex shader
		gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);

		this.render();
*/