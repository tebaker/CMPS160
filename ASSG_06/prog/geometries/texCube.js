/**
* Specifies a TexCube. A subclass of Geometry.
*
* @author Talon Baker
* @this {TexCube}
*/
class TexCube extends Geometry {
	/**
	* Constructor for TexCube.
	*
	* @constructor
	* @param {Number} size The size of the TexCube drawn
	* @param {Number} centerX The center x-position of the TexCube
	* @param {Number} centerY The center y-position of the TexCube
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, colorFlag, imgPath) {
		super();
		super.shape = "TexCube";
		super.centerPoint = {x: centerX, y: centerY};
		this.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.centerX = centerX;
		this.centerY = centerY;

		this.isSolidColor = colorFlag;

		this.imgPath = imgPath;

		// Setting shader to the default shader
		useShader(gl, texShaderProgram);

		this.generateTexCubeVertices(centerX, centerY, sizeVal);

		this.modelMatrix = new Matrix4();

		// Translation directions
		this.currentAngle = 1;

		initTextures(this.vertices.getLength() / 3, this.imgPath);
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
		rotateMatrix.setRotate(this.currentAngle, this.currentAngle, this.currentAngle, this.currentAngle);

			this.modelMatrix = rotateMatrix.multiply(this.modelMatrix);

		//T
		translateMatrix2.setTranslate(this.centerX, this.centerY, 0);

			this.modelMatrix = translateMatrix2.multiply(this.modelMatrix);

		// Pass the rotation matrix to the vertex shader
		// gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
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



				// initTextures(n, this.imgPath);



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

	/**
	* Generates the vertices of the TexCube.
	*
	* @private
	* @param {Number} size The size of the TexCube drawn
	* @param {Number} centerX The center x-position of the TexCube
	* @param {Number} centerY The center y-position of the TexCube
	*/
	generateTexCubeVertices(centerX, centerY, size) {
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
			/*TRIANGLE 1 COLORS*/
				// c0
				this.vertices.addUVs(0.0, 0.0);
				// c1
				this.vertices.addUVs(0.0, 1.0);
				// c2
				this.vertices.addUVs(1.0, 1.0);
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
			/*TRIANGLE 2 COLORS*/
				// c0
				this.vertices.addUVs(1.0, 1.0);
				// c1
				this.vertices.addUVs(1.0, 0.0);
				// c2
				this.vertices.addUVs(0.0, 0.0);
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
			/*TRIANGLE 3 COLORS*/
				// c0
				this.vertices.addUVs(0.0, 0.0);
				// c1
				this.vertices.addUVs(0.0, 1.0);
				// c2
				this.vertices.addUVs(1.0, 1.0);
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
			/*TRIANGLE 4 COLORS*/
				// c0
				this.vertices.addUVs(1.0, 1.0);
				// c1
				this.vertices.addUVs(1.0, 0.0);
				// c2
				this.vertices.addUVs(0.0, 0.0);
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
			/*TRIANGLE 5 COLORS*/
				// c0
				this.vertices.addUVs(0.0, 0.0);
				// c1
				this.vertices.addUVs(0.0, 1.0);
				// c2
				this.vertices.addUVs(1.0, 1.0);
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
			/*TRIANGLE 6 COLORS*/
				// c0
				this.vertices.addUVs(1.0, 1.0);
				// c1
				this.vertices.addUVs(1.0, 0.0);
				// c2
				this.vertices.addUVs(0.0, 0.0);
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
			/*TRIANGLE 7 COLORS*/
				// c0
				this.vertices.addUVs(0.0, 0.0);
				// c1
				this.vertices.addUVs(0.0, 1.0);
				// c2
				this.vertices.addUVs(1.0, 1.0);
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
			/*TRIANGLE 8 COLORS*/
				// c0
				this.vertices.addUVs(1.0, 1.0);
				// c1
				this.vertices.addUVs(1.0, 0.0);
				// c2
				this.vertices.addUVs(0.0, 0.0);
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
			/*TRIANGLE 9 COLORS*/
				// c0
				this.vertices.addUVs(0.0, 0.0);
				// c1
				this.vertices.addUVs(0.0, 1.0);
				// c2
				this.vertices.addUVs(1.0, 1.0);
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
			/*TRIANGLE 10 COLORS*/
				// c0
				this.vertices.addUVs(1.0, 1.0);
				// c1
				this.vertices.addUVs(1.0, 0.0);
				// c2
				this.vertices.addUVs(0.0, 0.0);
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
			/*TRIANGLE 11 COLORS*/
				// c0
				this.vertices.addUVs(0.0, 0.0);
				// c1
				this.vertices.addUVs(0.0, 1.0);
				// c2
				this.vertices.addUVs(1.0, 1.0);
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
			/*TRIANGLE 12 COLORS*/
				// c0
				this.vertices.addUVs(1.0, 1.0);
				// c1
				this.vertices.addUVs(0.0, 1.0);
				// c2
				this.vertices.addUVs(0.0, 0.0);
	}// End generateTexCubeVertices
}// End class TexCube