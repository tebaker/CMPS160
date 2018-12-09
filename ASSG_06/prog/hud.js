function drawHudMsg(colorMsg, cubeMsg) {
    ctx.clearRect(0, 0, 500, 100);
    // Draw black letters
    ctx.font = '18px "Times New Roman"';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'; // Set black to the color of letters
    ctx.fillText(colorMsg, 40, 40);
    ctx.fillText(cubeMsg, 40, 60);
}