/**
* Specifies a WebGL scene.
*
* @author Talon Baker
* @this {Scene}
*/
class Scene {
	/**
	* Constructor for Scene.
	*
	* @constructor
	*/
	constructor() {
		this.geometries = []; // Geometries to be drawn
	}

	/**
	* Adds the given geometry to the the scene.
	*
	* @param {Geometry} geometry Geometry being added to scene
	*/
	addGeometry(geometry) {
		this.geometries.push(geometry);
	}

	/**
	* Clears all the geometry within the scene.
	*/
	clearGeometry() {
		this.geometries = [];

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
	}
	
   /**
   * Responsible for updating the geometry's modelMatrix for animation.
   * Does nothing for non-animating geometry.
   */
	updateAnimation() {
		for(let i = 0; i < this.geometries.length; ++i) {
			console.log(this.geometries);
			// this.geometries[i].updateAnimation();
		}
	}

	/**
	* Renders all the Geometry within the scene.
	*/
	render() {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Starting counter for draw time
		let time0 = performance.now();

		// Looping through every geometry
		for(let i = 0; i < this.geometries.length; ++i) {
			this.geometries[i].render();
		}

		// Ending counter. Printing results
		let time1 = performance.now();
		sendTextToHTML("Shapes drawn in " + (time1 - time0) + " milliseconds", "shapeDrawTime");
	}
}