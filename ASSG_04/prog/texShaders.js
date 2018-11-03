// Basic Vertex Shader that receives position and size for each vertex (point)

let TEX_VSHADER =
  `attribute vec4 a_Position;
   attribute vec4 a_Color;
   attribute vec2 a_TexCoord;

   uniform mat4 u_ModelMatrix;

   varying vec4 v_Color;
   varying vec2 v_TexCoord;

   void main() {
   	// Setting position and translation from main
  	gl_Position = u_ModelMatrix * a_Position;
  	v_Color = a_Color;
  	v_TexCoord = a_TexCoord;
  }`;

  // Basic Fragment Shader that receives a single one color (point).
let TEX_FSHADER =
  `precision mediump float;

   uniform sampler2D u_Sampler;

   varying vec2 v_TexCoord;
   varying vec4 v_Color;

   void main() {
  	gl_FragColor = texture2D(u_Sampler, v_TexCoord); // Set fragment color from main
  }`;
