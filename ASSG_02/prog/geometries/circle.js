/**
* Specifies a Circle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {Circle}
*/
class Circle extends Geometry {
	/**
	* Constructor for Circle.
	*
	* @constructor
	* @param {Number} radius The radius of the circle being constructed
	* @param {Integer} segments The number of segments composing the circle
	* @param {Number} centerX The central x-position of the circle
	* @param {Number} centerY The central y-position of the circle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, segVal) {
		super();
		super.shape = "square";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		this.segments = segVal;
		super.vertices = [];
	}

	/**
	* Generates the vertices of the Circle.
	*
	* @private
	* @param {Number} radius The radius of the circle being constructed
	* @param {Integer} segments The number of segments composing the circle
	* @param {Number} centerX The central x-position of the circle
	* @param {Number} centerY The central y-position of the circle
	*/
	generateCircleVertices(radius, segments, centerX, centerY) {
		/*     p2 *.---.* p3
			 . *\  \   /  /* .
			.    \  \ /  /    .
			*-----*  *  *-----*
		   p1        p0       p4

			Starting from pi/2 rad, the triangles will be made in a clockwise motion with the points being defines in a clockwise motion.

			The number of segments will determine the number of triangles. 
		*/
		for(let i = 0; i < segments; ++i) {

		}

	}// End generateCircleVertices
}// End class Circle
