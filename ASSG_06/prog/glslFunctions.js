/**
 * Sends data to an attribute variable using a buffer.
 *
 * @private
 * @param {Float32Array} data Data being sent to attribute variable
 * @param {Number} dataCount The amount of data to pass per vertex
 */
function sendAttributeBufferToGLSL(data, dataCount) {
	let vertexBuffer = gl.createBuffer();
	if(!vertexBuffer) {
		console.log("Vertex buffer failed to create");
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

	// gl.bufferData(gl.ARRAY_BUFFER, attribName, gl.STATIC_DRAW);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

	gl.enableVertexAttribArray(a_Position);
	
	tellGLSLToDrawCurrentBuffer(dataCount);
}

/**
 * Draws the current buffer loaded. Buffer was loaded by sendAttributeBufferToGLSL.
 *
 * @param {Integer} pointCount The amount of vertices being drawn from the buffer.
 */
function tellGLSLToDrawCurrentBuffer(dataCount) {
	gl.drawArrays(gl.TRIANGLES, 0, dataCount);
}

function sendUniformFloatToGLSL(gl, val, uniformName) {
	// Pass vertex position to attribute variable
    gl.vertexAttrib3f(uniformName, val[0], val[1], val[2]);
}

function sendUniformVec4ToGLSL(uniformName, val) {
    gl.uniform4f(uniformName, val[0], val[1], val[2], val[3]);
}

function sendUniformMat4ToGLSL(uniformName, matElements) {
    gl.uniformMatrix4fv(uniformName, false, matElements);
}