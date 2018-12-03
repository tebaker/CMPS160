// Basic Vertex Shader that receives position and size for each vertex (point)

let ASSIGN1_VSHADER =
`   attribute vec4 a_Position;

    uniform mat4 u_ModelMatrix;
	uniform mat4 u_MvpMatrix;

    void main() {
        gl_Position = u_MvpMatrix * u_ModelMatrix * a_Position;
    }
`;

  // Basic Fragment Shader that receives a single one color (point).
let ASSIGN1_FSHADER =
`   precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = u_FragColor;
    }
`;
