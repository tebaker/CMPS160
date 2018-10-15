/**
* Specifies a FluctuatingTriangle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {FluctuatingTriangle}
*/
class FluctuatingTriangle extends Geometry {
	/**
	* Constructor for FluctuatingTriangle.
	*
	* @constructor
	* @param {Number} size The size of the FluctuatingTriangle drawn
	* @param {Number} centerX The center x-position of the FluctuatingTriangle
	* @param {Number} centerY The center y-position of the FluctuatingTriangle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
		super();
		super.shape = "FluctuatingTriangle";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		super.vertices = new Vertex();

		this.generateFluctuatingTriangleVertices(sizeVal, centerX, centerY)

	}

	/**
	* Generates the vertices of the FluctuatingTriangle.
	*
	* @private
	* @param {Number} size The size of the FluctuatingTriangle drawn
	* @param {Number} centerX The center x-position of the FluctuatingTriangle
	* @param {Number} centerY The center y-position of the FluctuatingTriangle
	*/
	generateFluctuatingTriangleVertices(size, centerX, centerY) {
		/*
			   p1*
			    / \
			   /   \
			p0*-----*p2

			First FluctuatingTriangle: p0, p1, p2
		*/

		/*FluctuatingTriangle 1*/
		// p0
		this.vertices.addPoints(
			(centerX - size), // x
			(centerY - size), // y
			0.0 // z
		);
		
		// p1
		this.vertices.addPoints(
			centerX, // x
			(centerY + size), // y
			0.0 // z
		);

		// p2
		this.vertices.addPoints(
			(centerX + size), // x
			(centerY - size), // y
			0.0 // z
		);

	}// End generateFluctuatingTriangleVertices
}// End class FluctuatingTriangle