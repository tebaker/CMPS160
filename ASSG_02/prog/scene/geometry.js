/**
 * Specifies a geometric object.
 *
 * @author Talon Baker
 * @this {Geometry}
 */
class Geometry {
	/**
	* Constructor for Geometry.
	*
	* @constructor
	*/
	constructor() {
		this.centerPoint = {x: 0.0, y: 0.0}; // Vertex objects. Each vertex has x-y-z
		this.color = {r: 0.0, g: 0.0, b: 0.0};  // The color of your geometric object
		this.size = 0.0; // Size length or radius of object
	}

	setCenterPoint(centerX, centerY) {
		this.centerPoint = {x: centerX, y: centerY};
	}

	setColor(rVal, gVal, bVal) {
		this.color = {r: rVal, g: gVal, b: bVal};
	}
	
	setSize(sizeVal) {
		this.size = sizeVal;
	}



	/**
	* Renders this Geometry within your webGL scene.
	*/
	render() {
	//
	// YOUR CODE HERE
	//

	// Recommendations: sendUniformVec4ToGLSL(), tellGLSLToDrawCurrentBuffer(),
	// and sendAttributeBufferToGLSL() are going to be useful here.
	}
	}
