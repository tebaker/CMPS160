/**
* Specifies a Triangle. A subclass of Geometry.
*
* @author "Your Name Here"
* @this {Triangle}
*/
class Triangle extends Geometry {
    /**
    * Constructor for Triangle.
    *
    * @constructor
    * @param {Number} size The size of the triangle drawn
    * @param {Number} centerX The center x-position of the triangle
    * @param {Number} centerY The center y-position of the triangle
    */
    constructor(centerX, centerY, rVal, gVal, bVal, sizeVal) {
        super.shape = "triangle";
        super.centerPoint = {x: centerX, y: centerY};
        super.color = {r: rVal, g: gVal, b: bVal};
        super.size = sizeVal;

        generateTriangleVertices(size, centerX, centerY)

    }

    /**
    * Generates the vertices of the Triangle.
    *
    * @private
    * @param {Number} size The size of the triangle drawn
    * @param {Number} centerX The center x-position of the triangle
    * @param {Number} centerY The center y-position of the triangle
    */
    generateTriangleVertices(size, centerX, centerY) {
        // Pushing point 1
        super.vertices.push(centerX -= size);
        super.vertices.push(centerY -= size);
        super.vertices.push(0.0);

        // Pushing point 2
        super.vertices.push(centerX);
        super.vertices.push(centerY += size);
        super.vertices.push(0.0);

        // Pushing point 3
        super.vertices.push(centerX += size);
        super.vertices.push(centerY -= size);
        super.vertices.push(0.0);
    }
}