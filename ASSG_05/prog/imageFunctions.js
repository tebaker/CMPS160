var cubeRotation = 0.0;
//
// Start here
//
function loadTexCube() {
  const canvasNEW = document.querySelector('#glcanvas');
  const glNEW = canvasNEW.getContext('webgl');

  // If we don't have a GLNEW context, give up now

  if (!glNEW) {
    alert('Unable to initialize WebGLNEW. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying highp vec2 vTextureCoord;
    void main(void) {
      glNEW_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;
    uniform sampler2D uSampler;
    void main(void) {
      glNEW_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(glNEW, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aTextureCoord and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: glNEW.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: glNEW.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: glNEW.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: glNEW.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: glNEW.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(glNEW);

  const texture = loadTexture(glNEW, 'cubetexture.png');

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(glNEW, programInfo, buffers, texture, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(glNEW) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = glNEW.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  glNEW.bindBuffer(glNEW.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  const positions = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
  ];

  // Now pass the list of positions into WebGLNEW to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  glNEW.bufferData(glNEW.ARRAY_BUFFER, new Float32Array(positions), glNEW.STATIC_DRAW);

  // Now set up the texture coordinates for the faces.

  const textureCoordBuffer = glNEW.createBuffer();
  glNEW.bindBuffer(glNEW.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
  ];

  glNEW.bufferData(glNEW.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                glNEW.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = glNEW.createBuffer();
  glNEW.bindBuffer(glNEW.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two trianglNEWes, using the
  // indices into the vertex array to specify each trianglNEWe's
  // position.

  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];

  // Now send the element array to GLNEW

  glNEW.bufferData(glNEW.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), glNEW.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(glNEW, url) {
  const texture = glNEW.createTexture();
  glNEW.bindTexture(glNEW.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a singlNEWe pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = glNEW.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = glNEW.RGBA;
  const srcType = glNEW.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  glNEW.texImage2D(glNEW.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    glNEW.bindTexture(glNEW.TEXTURE_2D, texture);
    glNEW.texImage2D(glNEW.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGLNEW1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       glNEW.generateMipmap(glNEW.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       glNEW.texParameteri(glNEW.TEXTURE_2D, glNEW.TEXTURE_WRAP_S, glNEW.CLAMP_TO_EDGE);
       glNEW.texParameteri(glNEW.TEXTURE_2D, glNEW.TEXTURE_WRAP_T, glNEW.CLAMP_TO_EDGE);
       glNEW.texParameteri(glNEW.TEXTURE_2D, glNEW.TEXTURE_MIN_FILTER, glNEW.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

//
// Draw the scene.
//
function drawScene(glNEW, programInfo, buffers, texture, deltaTime) {
  glNEW.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  glNEW.clearDepth(1.0);                 // Clear everything
  glNEW.enable(glNEW.DEPTH_TEST);           // Enable depth testing
  glNEW.depthFunc(glNEW.LEQUAL);            // Near things obscure far things

  // Clear the canvasNEW before we start drawing on it.

  glNEW.clear(glNEW.COLOR_BUFFER_BIT | glNEW.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvasNEW
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = glNEW.canvasNEW.clientWidth / glNEW.canvasNEW.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glNEWmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -6.0]);  // amount to translate
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation * .7,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)

  // Tell WebGLNEW how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = glNEW.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    glNEW.bindBuffer(glNEW.ARRAY_BUFFER, buffers.position);
    glNEW.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    glNEW.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGLNEW how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = glNEW.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    glNEW.bindBuffer(glNEW.ARRAY_BUFFER, buffers.textureCoord);
    glNEW.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    glNEW.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGLNEW which indices to use to index the vertices
  glNEW.bindBuffer(glNEW.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGLNEW to use our program when drawing

  glNEW.useProgram(programInfo.program);

  // Set the shader uniforms

  glNEW.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  glNEW.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  // Specify the texture to map onto the faces.

  // Tell WebGLNEW we want to affect texture unit 0
  glNEW.activeTexture(glNEW.TEXTURE0);

  // Bind the texture to texture unit 0
  glNEW.bindTexture(glNEW.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  glNEW.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = 36;
    const type = glNEW.UNSIGNED_SHORT;
    const offset = 0;
    glNEW.drawElements(glNEW.TRIANGLNEWES, vertexCount, type, offset);
  }

  // Update the rotation for the next draw

  cubeRotation += deltaTime;
}

//
// Initialize a shader program, so WebGLNEW knows how to draw our data
//
function initShaderProgram(glNEW, vsSource, fsSource) {
  const vertexShader = loadShader(glNEW, glNEW.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(glNEW, glNEW.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = glNEW.createProgram();
  glNEW.attachShader(shaderProgram, vertexShader);
  glNEW.attachShader(shaderProgram, fragmentShader);
  glNEW.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!glNEW.getProgramParameter(shaderProgram, glNEW.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + glNEW.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(glNEW, type, source) {
  const shader = glNEW.createShader(type);

  // Send the source to the shader object

  glNEW.shaderSource(shader, source);

  // Compile the shader program

  glNEW.compileShader(shader);

  // See if it compiled successfully

  if (!glNEW.getShaderParameter(shader, glNEW.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + glNEW.getShaderInfoLog(shader));
    glNEW.deleteShader(shader);
    return null;
  }

  return shader;
}