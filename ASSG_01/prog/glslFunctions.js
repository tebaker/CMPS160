/**
 * Sends a float value to the specified uniform variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformFloatToGLSL(gl, val, uniformName) {
	// Pass vertex position to attribute variable
    gl.vertexAttrib3f(uniformName, val[0], val[1], val[2]);
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformVec4ToGLSL(gl, val, uniformName) {
    // Pass color uniform to fragment shader
    gl.uniform4f(uniformName, val[0], val[1], val[2], val[3]);
}
