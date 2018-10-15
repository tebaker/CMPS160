/**
* Specifies a RandomCircle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {RandomCircle}
*/
class RandomCircle extends Circle {
	/**
	* Constructor for RandomCircle.
	*
	* @constructor
	* @param {Number} radius The radius of the Randomcircle being constructed
	* @param {Integer} segments The number of segments composing the Randomcircle
	* @param {Number} centerX The central x-position of the Randomcircle
	* @param {Number} centerY The central y-position of the Randomcircle
	*/
	constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, segVal) {
		super(centerX, centerY, rVal, gVal, bVal, sizeVal, segVal);

		super.shape = "randomCricle";

		// Random direction the shape will initially move
		// this.direction = Math.random();
		this.Tx, this.Ty, this.tZ = 0.0;
	}

	updateAnimation() {
		Tx += 0.01;
		Ty += 0.01;
		console.log("Tx: " + Tx + " Ty: " + Ty + " Tz: " + Tz);
		sendUniformVec4ToGLSL(u_Translation, [Tx, Ty, Tz, 0.0]);
	}
}// End class RandomCircle