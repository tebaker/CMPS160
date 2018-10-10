/**
* Specifies a Square. A subclass of Geometry.
*
* @author "Your Name Here"
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
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;

		generateSquareVertices(centerX, centerY, size);
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
		
	}
}
