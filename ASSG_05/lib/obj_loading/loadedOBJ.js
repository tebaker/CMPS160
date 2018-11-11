/**
 * Specifies the geometry contained within an OBJ file. A subclass of Geometry.
 * NOTE: The geometry is transformed to display correctly using its modelMatrix.
 *
 * @author Alfredo Rivero
 * @this {LoadedOBJ}
 */
class LoadedOBJ extends Geometry {
  /**
   * Constructor for LoadedOBJ
   *
   * @constructor
   * @param {String} objStr An OBJ file in string form
   * @returns {LoadedOBJ} Constructed LoadedOBJ
   */
  constructor(centerX, centerY, rVal, gVal, bVal, sizeVal, objStr) {
    super();
	super.shape = "obj";
	super.centerPoint = {x: centerX, y: centerY};
	super.color = {r: rVal, g: gVal, b: bVal};
	super.size = sizeVal;
	super.vertices = [];

	this.centerX = centerX;
	this.centerY = centerY;

	this.modelMatrix = new Matrix4();

	this.flattenedArray = [];

	// Translation directions
	this.currentAngle = 1;

    // Construct the Mesh object containg the OBJ file's information
    var objMesh = new OBJ.Mesh(objStr);

    this.verticesVertices = objMesh.vertices;

  }
  // will update model direction and travel location
  updateAnimation() {
  	// console.log(this.centerX, this.centerY);
  	let translateMatrix1 = new Matrix4();
  	let rotateMatrix = new Matrix4();
  	let translateMatrix2 = new Matrix4();

  	//T
  	translateMatrix1.setTranslate(-this.centerX, -this.centerY, 0);

  		this.modelMatrix = translateMatrix1.multiply(this.modelMatrix);

  	//R
  	rotateMatrix.setRotate(this.currentAngle, this.currentAngle, this.currentAngle, this.currentAngle);

  		this.modelMatrix = rotateMatrix.multiply(this.modelMatrix);

  	//T
  	translateMatrix2.setTranslate(this.centerX, this.centerY, 0);

  		this.modelMatrix = translateMatrix2.multiply(this.modelMatrix);

  	// Pass the rotation matrix to the vertex shader
  	gl.uniformMatrix4fv(u_ModelMatrix, false, this.modelMatrix.elements);
  	this.render();
  }

  /**
  * Overloaded base class renders in order to update animaton / movement
  */
  render() {
  			// Setting shader to the default shader
  			useShader(gl, texShaderProgram);
  			
  			// Get the location of attribute variable a_Position
  			a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  			if (a_Position < 0) {
  				console.log('Fail to get the storage location of a_Position');
  				return;
  			}

  			u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  			if (!u_ModelMatrix) { 
  				console.log('Failed to get the storage location of u_ModelMatrix');
  				return;
  			}

  			a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  			if(a_TexCoord < 0) {
  				console.log('failed to get the storage location of a_TexCoord');
  			}

  			u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  			if(u_ViewMatrix < 0) {
  				console.log('failed to get the storage location of u_ViewMatrix');
  			}

  			u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  			if(u_ProjMatrix < 0) {
  				console.log('failed to get the storage location of u_ProjMatrix');
  			}

  			let n = this.verticesVertices.length / 3;


  			 let renderVertices = new Float32Array(this.verticesVertices);

  			sendUniformMat4ToGLSL(u_ModelMatrix, this.modelMatrix.elements);

  			let viewMatrix = new Matrix4();
  			let projMatrix = new Matrix4();

  			viewMatrix = camera.getViewMatrix();

  	// viewMatrix.setLookAt(+/-=r/l, +/-=u/d, +/-=f/b, +/-=LR/LL, 0, -100, 0, 1, 0);

  	  		projMatrix.setPerspective(30, canvas.width/canvas.height, 1, 100);





  			gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  			gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);






  			let renderTexCoordBuffer = gl.createBuffer();

  			gl.bindBuffer(gl.ARRAY_BUFFER, renderTexCoordBuffer);
  			gl.bufferData(gl.ARRAY_BUFFER, renderVertices, gl.STATIC_DRAW);

  			var FSIZE = this.verticesVertices.BYTES_PER_ELEMENT;
  			
  			gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
  			gl.enableVertexAttribArray(a_Position); // Enable buffer allocation
  			
  			// Allocate the texture coordinates to a_TexCoord, and enable it.
  			var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  			
  			gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
  			gl.enableVertexAttribArray(a_TexCoord); // Enable buffer allocation



  			gl.drawArrays(gl.TRIANGLES, 0, n);
  }

}
