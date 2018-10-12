/**
 * Specifies a geometric object
 *
 * @author Talon Baker
 * @this {Geometry}
 */
class Geometry {

	constructor() {
		this.shape = "";
		this.centerPoint = {x: 0.0, y: 0.0}; // Vertex objects. Each vertex has x-y-z
		this.color = {r: 0.0, g: 0.0, b: 0.0};  // The color of your geometric object
		this.size = 0.0; // Size length or radius of object
		this.vertices = [];
	}

	vertexPush(vertex) {
		this.vertices.push(vertex);
	}

	/**
	* Renders this Geometry within your webGL scene.
	*/
	render() {
		sendUniformVec4ToGLSL(gl, [this.color.r, this.color.g, this.color.b, 1.0], u_FragColor);

		let renderVertices = new Float32Array(this.vertices);
		let n = this.vertices.length / 3;

		let vertexBuffer = gl.createBuffer();
		if(!vertexBuffer) {
			console.log("Vertex buffer failed to create");
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

		gl.bufferData(gl.ARRAY_BUFFER, renderVertices, gl.STATIC_DRAW);

		gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

		gl.enableVertexAttribArray(a_Position);

		gl.drawArrays(gl.TRIANGLES, 0, n);
	}
}
