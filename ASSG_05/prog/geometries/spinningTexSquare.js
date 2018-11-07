/**
* Specifies a SpinningTexSquare. A subclass of Geometry.
*
* @author Talon Baker
* @this {SpinningTexSquare}
*/
class SpinningTexSquare extends Geometry {
	/**
	* Constructor for SpinningTexSquare.
	*
	* @constructor
	* @param {Number} size The size of the SpinningTexSquare drawn
	* @param {Number} centerX The center x-position of the SpinningTexSquare
	* @param {Number} centerY The center y-position of the SpinningTexSquare
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, colorFlag) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal);
		
		this.centerX = centerX;
		this.centerY = centerY;

		this.color = {r: rVal, g: gVal, b: bVal};
		this.isSolidColor = colorFlag;

		this.vertices = new Vertex();

		super.shape = "spinningTexSquare";

		this.modelMatrix = new Matrix4();

		// Translation directions
		this.currentAngle = 1;

		this.generateSquareVertices(this.centerX, this.centerY, sizeVal)
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

		// Setting shader to the default shader
		useShader(gl, texShaderProgram);

		// Get the location of attribute variable a_Position
		a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		if (a_Position < 0) {
			console.log('Fail to get the storage location of a_Position');
			return;
		}

		u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
		if (!u_ModelMatrix) { 
			console.log('Failed to get the storage location of u_ModelMatrix');
			return;
		}

		a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
		if(a_TexCoord < 0) {
			console.log('failed to get the storage location of a_TexCoord');
		}

		let n = this.vertices.getLength() / 3;

		let renderVertices = new Float32Array(this.vertices.getTexArray());

		sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);



		initTextures(n);



		let renderTexCoordBuffer = gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, renderTexCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, renderVertices, gl.STATIC_DRAW);

		var FSIZE = renderVertices.BYTES_PER_ELEMENT;
		
		gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
		gl.enableVertexAttribArray(a_Position); // Enable buffer allocation
		
		// Allocate the texture coordinates to a_TexCoord, and enable it.
		var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
		
		gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
		gl.enableVertexAttribArray(a_TexCoord); // Enable buffer allocation



		gl.drawArrays(gl.TRIANGLES, 0, n);

	}

	generateSquareVertices(centerX, centerY, size) {
		/*
			p1*-----*p2   *p2
			  |   /     / |
			  | /     /   |
			p0*   p0*-----*p3

			First triangle: p0, p1, p2

			Second triangle: p2, p3, p0
		*/

	/*TRIANGLE 1 VERTICES*/
		// p0
		this.vertices.addPoints(
			(centerX - size), // x
			(centerY - size), // y
			0.0 // z
		);
		// p1
		this.vertices.addPoints(
			(centerX - size), // x
			(centerY + size), // y
			0.0 // z
		);
		// p2
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY + size), // y
			0.0 // z
		);
	/*TRIANGLE 1 UVs*/
		this.vertices.addUVs(0.0, 0.0);
		this.vertices.addUVs(0.0, 1.0);
		this.vertices.addUVs(1.0, 1.0);

	/*TRIANGLE 2 VERTICES*/
		// p2
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY + size), // y
			0.0 // z
		);

		// p3
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY - size), // y
			0.0 // z
		);

		// p0
		this.vertices.addPoints(
			(centerX - size), // x
			(centerY - size), // y
			0.0 // z
		);
	/*TRIANGLE 2 UVs*/
		this.vertices.addUVs(1.0, 1.0);
		this.vertices.addUVs(1.0, 0.0);
		this.vertices.addUVs(0.0, 0.0);
		
	}// End generateSquareVertices
}// End class SpinningTexSquare