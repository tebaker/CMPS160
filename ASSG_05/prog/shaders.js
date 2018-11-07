let ASSIGN1_VSHADER =
`	attribute vec4 a_Position;
	attribute vec4 a_Color;

	uniform mat4 u_ModelMatrix;

	varying vec4 v_Color;

	void main() {
		gl_Position = u_ModelMatrix * a_Position;
		v_Color = a_Color;
	}
`

  // Basic Fragment Shader that receives a single one color (point).
let ASSIGN1_FSHADER =
`	precision mediump float;

	varying vec4 v_Color;

	void main() {
		gl_FragColor = v_Color;
  	}
`
