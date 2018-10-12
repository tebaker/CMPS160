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
		super.shape = "circle";
		super.centerPoint = {x: centerX, y: centerY};
		super.color = {r: rVal, g: gVal, b: bVal};
		super.size = sizeVal;
		this.segments = segVal;
		super.vertices = [];

		this.generateCircleVertices(sizeVal, segVal, centerX, centerY);
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

			Starting from pi rad, the triangles will be made in a clockwise motion with the points being defines in a clockwise motion.

			The number of segments will determine the number of triangles. 
		*/
		let angle = 3 * Math.PI / segments
	    let holdVertexX = radius * Math.cos(angle)
	    let holdVertexY = radius * Math.sin(angle)

		for (let i = 0; i < segments; i++) {
			// p0
			this.vertices.push(centerX);
			this.vertices.push(centerY);
			this.vertices.push(0.0);

			// p1
			this.vertices.push(centerX + holdVertexX);
			this.vertices.push(centerY + holdVertexY);
			this.vertices.push(0.0);

		    angle = i * 2 * Math.PI / segments
		    let nextVertexX = radius * Math.cos(angle)
		    let nextVertexY = radius * Math.sin(angle)

		    // p2
		    this.vertices.push(centerX + nextVertexX);
			this.vertices.push(centerY + nextVertexY);
			this.vertices.push(0.0);

			holdVertexX = nextVertexX;
			holdVertexY = nextVertexY;
		}

		// Defining one last set of points to close the circle off
		// p0
		this.vertices.push(centerX);
		this.vertices.push(centerY);
		this.vertices.push(0.0);

		// p1
		this.vertices.push(centerX + holdVertexX);
		this.vertices.push(centerY + holdVertexY);
		this.vertices.push(0.0);

	    angle = segments * 2 * Math.PI / segments
	    let nextVertexX = radius * Math.cos(angle)
	    let nextVertexY = radius * Math.sin(angle)

	    // p2
	    this.vertices.push(centerX + nextVertexX);
		this.vertices.push(centerY + nextVertexY);
		this.vertices.push(0.0);


	}// End generateCircleVertices
}// End class Circle