// Basic Vertex Shader that receives position and size for each vertex (point).
let ASSIGN1_VSHADER =
  `attribute vec4 a_Position;
   void main() {
  	gl_Position = a_Position; // Passed in from js
  	gl_PointSize = 10.0; // Set point size
  }`;

// Basic Fragment Shader that receives a single one color (point).
let ASSIGN1_FSHADER =
  `void main() {
  	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`;
