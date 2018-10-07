// Basic Vertex Shader that receives position and size for each vertex (point)
let ASSIGN1_VSHADER =
  `attribute vec4 a_Position;
   attribute float a_PointSize;
   void main() {
  	gl_Position = a_Position; // Set position from main
  	gl_PointSize = a_PointSize; // Set point size from main
  }`;

// Basic Fragment Shader that receives a single one color (point).
let ASSIGN1_FSHADER =
  `precision mediump float;
   uniform vec4 u_FragColor;
   void main() {
  	gl_FragColor = u_FragColor;
  	// gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  }`;
