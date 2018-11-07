// Vertex shader program
let TEX_VSHADER =
`	attribute vec4 a_Position;
	attribute vec2 a_TexCoord;
	
	uniform mat4 u_ModelMatrix;

	varying vec2 v_TexCoord;
	
	void main() {
		gl_Position = u_ModelMatrix * a_Position;
		v_TexCoord = a_TexCoord;
	}
`

// Fragment shader program
let TEX_FSHADER =
`	precision mediump float;
	
	uniform sampler2D u_Sampler;
	
	varying vec2 v_TexCoord;
	
	void main() {
		gl_FragColor = texture2D(u_Sampler, v_TexCoord);
	}
`