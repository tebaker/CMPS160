/**
 * Responsible for animating the Scene.
 */
let tick = function() {
	// Updating every geometry animation
	scene.updateAnimation();
	
	// Looping on tick for animation
	requestAnimationFrame(tick);
}
