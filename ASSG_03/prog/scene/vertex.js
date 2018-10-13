/**
* Specifies a vertex. Currently only contains the vertex's position.
*
* @author Talon Baker
* @this {Vertex}
*/
class Vertex {
	// Default constructor
	constructor() {
		this.points = [];
	}

	addPoints(xCoord, yCoord, zCoord) {
		this.points.push(xCoord);
		this.points.push(yCoord);
		this.points.push(zCoord);
	}

	getArray() {
		return this.points;
	}

	getLength() {
		return this.points.length;
	}
}// End class Vertex
