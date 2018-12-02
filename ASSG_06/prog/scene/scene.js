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
			this.geometries[i].updateAnimation();
		}

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		scene.render();
	}

	/**
	* Renders all the Geometry within the scene.
	*/
	render() {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Looping through every geometry
		for(let i = 0; i < this.geometries.length; ++i) {
			this.geometries[i].render();
		}
	}
}