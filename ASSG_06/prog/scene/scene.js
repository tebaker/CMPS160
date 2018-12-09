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
        this.geometries = []; 
        this.length = 0;

        gl.clearColor(0.9, 0.9, 1.0, 1.0);
        // Enable the hidden surface removal function
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

	/**
	* Adds the given geometry to the the scene.
	*
	* @param {Geometry} geometry Geometry being added to scene
	*/
    addGeometry(geometry) {
        this.geometries.push(geometry);

        this.length += 1;

    }

	/**
	* Clears all the geometry within the scene.
	*/
    clearGeometry() {
        this.geometries = [];

        this.length = 0;
    }

    // Popping out-of-bounds shape from scene to save frames
    // popShape(thisShape) {
    // 	let index = geometries.indexOf(thisShape);
    // 	if(index > -1) {
    // 		geometries.splice(index, 1);
    // 	}
    // }

    /**
    * Responsible for updating the geometry's modelMatrix for animation.
    * Does nothing for non-animating geometry.
    */
    updateAnimation() {
        for (let i = 0; i < this.geometries.length; ++i) {
            this.geometries[i].updateAnimation();
        }

        scene.render();
    }

	/**
	* Renders all the Geometry within the scene.
	*/
    render() {
        // Enable the hidden surface removal function
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Looping through every geometry
        for (let i = 0; i < this.geometries.length; ++i) {
            this.geometries[i].render();
        }
    }
}