/**
 * Sends data to an attribute variable using a buffer.
 *
 * @private
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 * @param {String} attribName The name of the attribute variable
 */
function sendAttributeBufferToGLSL(data, dataCount, attribName) {
  //
  // YOUR CODE HERE
  //

  // Recommendations: This piece of code should do these three things:
  // 1. Create a an attribute buffer
  // 2. Bind data to that buffer
  // 3. Enable the buffer for use
  //
  // Some modifications can be made to this function to improve performance. Ask
  // a TA in lab if you're interested in these modifications.
}

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 */
function tellGLSLToDrawCurrentBuffer(pointCount) {
  //
  // YOUR CODE HERE
  //

  // Recommendations: Should only be one line of code.
}

/**
 * Sends a float value to the specified uniform variable within GLSL shaders.
 * Prints an error message if unsuccessful.
 *
 * @param {float} val The float value being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformFloatToGLSL(val, uniformName) {
  //
  // YOUR CODE HERE
  //
}

/**
 * Sends an JavaSript array (vector) to the specified uniform variable within
 * GLSL shaders. Array can be of length 2-4.
 *
 * @param {Array} val Array (vector) being passed to uniform variable
 * @param {String} uniformName The name of the uniform variable
 */
function sendUniformVec4ToGLSL(val, uniformName) {
  //
  // YOUR CODE HERE
  //
}
