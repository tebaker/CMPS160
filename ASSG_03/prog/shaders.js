// Basic Vertex Shader that receives position and size for each vertex (point)

let ASSIGN1_VSHADER =
  `attribute vec4 a_Position;
   uniform vec4 u_Translation;
   void main() {
   	// Setting position and translation from main
  	gl_Position = a_Position + u_Translation;
  }`;

  // Basic Fragment Shader that receives a single one color (point).
let ASSIGN1_FSHADER =
  `precision mediump float;
   uniform vec4 u_FragColor;
   void main() {
  	gl_FragColor = u_FragColor; // Set fragment color from main
  }`;
