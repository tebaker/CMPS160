/**
 * Specifies a WebGL scene.
 *
 * @author "Your Name Here"
 * @this {Scene}
 */
class Scene {
  /**
   * Constructor for Scene.
   *
   * @constructor
   */
  constructor() {
    this.geometries = []; // Geometries being drawn on canvas
    //
    // YOUR CODE HERE
    //

    // Recommendations: Setting the canvas's clear color and clearing the canvas
    // here is a good idea.
  }

  /**
   * Adds the given geometry to the the scene.
   *
   * @param {Geometry} geometry Geometry being added to scene
   */
  addGeometry(geometry) {
    //
    // YOUR CODE HERE
    //
  }

  /**
   * Clears all the geometry within the scene.
   */
  clearGeometry() {
    //
    // YOUR CODE HERE
    //

    // Recommendations: It would be best to call this.render() at the end of
    // this call.
  }

  /**
   * Renders all the Geometry within the scene.
   */
  render() {
    //
    // YOUR CODE HERE
    //

    // Recommendations: No calls to any of your GLSL functions should be made
    // here. Your Geometry objects in this.geometries should render themselves
    // through their own .render() methods.
  }
}
