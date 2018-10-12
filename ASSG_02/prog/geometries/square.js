/**
* Specifies a Square. A subclass of Geometry.
*
* @author Talon Baker
* @this {Square}
*/
class Square extends Geometry {
	/**
	* Constructor for Square.
	*
	* @constructor
	* @param {Number} size The size of the square drawn
	* @param {Number} centerX The center x-position of the square
	* @param {Number} centerY The center y-position of the square
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super();
		super.shape = "square";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = [];

		this.generateSquareVertices(centerX, centerY, sizeVal);
	}

	/**
	* Generates the vertices of the square.
	*
	* @private
	* @param {Number} size The size of the square drawn
	* @param {Number} centerX The center x-position of the square
	* @param {Number} centerY The center y-position of the square
	*/
	generateSquareVertices(centerX, centerY, size) {
		/*
			p1*-----*p2       *p2
			  |   /         / |
			  | /        /    |
			p0*      p0*------*p3

			First triangle: p0, p1, p2

			Second triangle: p2, p3, p0
		*/

		/*TRIANGLE 1*/
		// p0
		this.vertices.push(centerX - size);
		this.vertices.push(centerY - size);

		// p1
		this.vertices.push(centerX - size);
		this.vertices.push(centerY + size);

		// p2
		this.vertices.push(centerX + size);
		this.vertices.push(centerY + size);

		/*TRIANGLE 2*/
		// p2
		this.vertices.push(centerX + size);
		this.vertices.push(centerY + size);

		// p3
		this.vertices.push(centerX + size);
		this.vertices.push(centerY - size);

		// p0
		this.vertices.push(centerX - size);
		this.vertices.push(centerY - size);
	}// End generateSquareVertices
}// End class Square