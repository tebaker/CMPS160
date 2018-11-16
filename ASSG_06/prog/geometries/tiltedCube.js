/**
* Specifies a TiltedCube. A subclass of Geometry.
*
* @author Talon Baker
* @this {TiltedCube}
*/
class TiltedCube extends Geometry {
	/**
	* Constructor for TiltedCube.
	*
	* @constructor
	* @param {Number} size The size of the TiltedCube drawn
	* @param {Number} centerX The center x-position of the TiltedCube
	* @param {Number} centerY The center y-position of the TiltedCube
	*/
	constructor(centerX, centerY, centerZ, rVal, gVal, bVal, sizeVal, colorFlag) {
		super();
		super.shape = "TiltedCube";
		super.centerPoint = {x: centerX, y: centerY};
		this.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.centerX = centerX;
		this.centerY = centerY;
		this.centerZ = centerZ;

		this.isSolidColor = colorFlag;

		this.generateTiltedCubeVertices(centerX, centerY, centerZ, sizeVal);

		this.modelMatrix = new Matrix4();

		// Translation directions
		this.currentAngle = 1;
	}

	// will update model direction and travel location
	updateAnimation() {
		
	}

	/**
	* Overloaded base class renders in order to update animaton / movement
	*/
	render() {

		useShader(gl, defaultShaderProgram);

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

		u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
		if (!u_ModelMatrix) {
			console.log('Failed to get the storage location of u_FragColor');
			return;
		}

		sendUniformVec4ToGLSL(u_FragColor, [this.color.r, this.color.g, this.color.b, 1.0]);

		let renderVertices = new Float32Array(this.vertices.getArray(this.isSolidColor, this.color.r, this.color.g, this.color.b));
		let n = this.vertices.getLength() / 3;

		sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);

		// Render Vertices = Float32Array
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
					(centerZ - size)  // z
				);
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ - size)  // z
				);
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ - size)  // z
				);
			/*TRIANGLE 1 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
			/*023*/
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ - size)  // z
				);
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ - size)  // z
				);
				// p0
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ - size)  // z
				);
			/*TRIANGLE 2 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
		/*RIGHT SQUARE*/
			/*324*/
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ - size) // z
				);
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ - size) // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
			/*TRIANGLE 3 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
			/*345*/
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ - size)  // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ + size)  // z
				);
			/*TRIANGLE 4 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
		/*BACK SQUARE*/
			/*546*/
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ + size)  // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
			/*TRIANGLE 5 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
			/*567*/
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ + size)  // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ + size)  // z
				);
			/*TRIANGLE 6 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
		/*LEFT SQUARE*/
			/*761*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ + size)  // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ - size)  // z
				);
			/*TRIANGLE 7 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
			/*710*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ + size)  // z
				);
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ - size)  // z
				);
				// p0
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ - size)  // z
				);
			/*TRIANGLE 8 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
		/*TOP SQUARE*/
			/*164*/
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ - size)  // z
				);
				// p6
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ + size)  // z
				);
			/*TRIANGLE 9 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
			/*142*/
				// p1
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY + size), // y
					(centerZ - size) // z
				);
				// p4
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ + size) // z
				);
				// p2
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY + size), // y
					(centerZ - size) // z
				);
			/*TRIANGLE 10 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
		/*BOTTOM SQUARE*/
			/*703*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ + size) // z
				);
				// p0
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ - size) // z
				);
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ - size) // z
				);
			/*TRIANGLE 11 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
			/*735*/
				// p7
				this.vertices.addPoints(
					(centerX - size), // x
					(centerY - size), // y
					(centerZ + size) // z
				);
				// p3
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ + size) // z
				);
				// p5
				this.vertices.addPoints(
					(centerX + size), // x
					(centerY - size), // y
					(centerZ + size) // z
				);
			/*TRIANGLE 12 COLORS*/
				// c0
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
				this.vertices.addColors(
					Math.random(),
					Math.random(),
					Math.random()
				)
	}// End generateTiltedCubeVertices
}// End class TiltedCube