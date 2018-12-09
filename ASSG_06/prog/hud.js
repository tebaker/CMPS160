function drawHudMsg(colorMsg, cubeMsg) {
    ctx.clearRect(0, 0, 500, 100);
    // Draw black letters
    ctx.font = '18px "Times New Roman"';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Set black to the color of letters
    ctx.fillText(colorMsg, 150, 40);
    ctx.fillText(cubeMsg, 150, 60);


//    *-------*
//   /|      /|
//  / |     / |
// *--|----*  |
// |  *----|--*
// | /     | /
// *-------*

    // Drawing cube
    ctx.fillText("    *-------*", 20, 20);
    ctx.fillText("   /|         /|", 20, 30); ctx.fillText("  / |     / |", 20, 40); ctx.fillText(" *--|----*  |", 20, 50); ctx.fillText(" |  *----|--*", 20, 60);
    ctx.fillText(" | /         | /", 20, 70);
    ctx.fillText(" *-------*", 20, 80);
}