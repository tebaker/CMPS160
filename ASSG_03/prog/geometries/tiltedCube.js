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
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super();
		super.shape = "TiltedCube";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.generateTiltedCubeVertices(centerX, centerY, sizeVal);
	}

	/**
	* Generates the vertices of the TiltedCube.
	*
	* @private
	* @param {Number} size The size of the TiltedCube drawn
	* @param {Number} centerX The center x-position of the TiltedCube
	* @param {Number} centerY The center y-position of the TiltedCube
	*/
	generateTiltedCubeVertices(centerX, centerY, size) {
		/*
			p1*-----*p2   *p2
			  |   /     / |
			  | /     /   |
			p0*   p0*-----*p3

			First triangle: p0, p1, p2

			Second triangle: p2, p3, p0
		*/

		/*TRIANGLE 1*/
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

		/*TRIANGLE 2*/
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
	}// End generateTiltedCubeVertices
}// End class TiltedCube