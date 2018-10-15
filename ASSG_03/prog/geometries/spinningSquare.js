/**
* Specifies a SpinningSquare. A subclass of Geometry.
*
* @author Talon Baker
* @this {SpinningSquare}
*/
class SpinningSquare extends Geometry {
	/**
	* Constructor for SpinningSquare.
	*
	* @constructor
	* @param {Number} size The size of the SpinningSquare drawn
	* @param {Number} centerX The center x-position of the SpinningSquare
	* @param {Number} centerY The center y-position of the SpinningSquare
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super();
		super.shape = "spinningSquare";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.generateSpinningSquareVertices(centerX, centerY, sizeVal);
	}

	/**
	* Generates the vertices of the SpinningSquare.
	*
	* @private
	* @param {Number} size The size of the SpinningSquare drawn
	* @param {Number} centerX The center x-position of the SpinningSquare
	* @param {Number} centerY The center y-position of the SpinningSquare
	*/
	generateSpinningSquareVertices(centerX, centerY, size) {
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
	}// End generateSpinningSquareVertices
}// End class SpinningSquare