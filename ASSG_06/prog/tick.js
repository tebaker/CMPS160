/**
 * Responsible for animating the Scene.
 */
let tick = function() {

    tickFlag = false;

    // The following block will set a tickFlag to true once a second
    let timeNow = performance.now();

    if (timeNow - masterTime > 300) {
        masterTime = performance.now();

        tickFlag = true;
    }

	// Updating every geometry animation
    scene.updateAnimation();
    
    drawHudMsg(colorMsg, posMsg);

	// Looping on tick for animation
	requestAnimationFrame(tick);
}
