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
    ctx.fillText("   /|         /|", 20, 30); ctx.fillText("  / |       / |", 20, 40); ctx.fillText(" *--|----* |", 20, 50); ctx.fillText(" |  *----|--*", 20, 60);
    ctx.fillText(" | /         | /", 20, 70);
    ctx.fillText(" *-------*", 20, 80);

    if(tickFlag) {
        if(beat >= 8) {
            beat = 0;
        }
        else {
            beat += 1;
        }
    }

    // Drawing Wave ''`-._,-'
    switch(beat) {
    case(0): ctx.fillText("''`-._,-'", 90, 75);
        break;
    case(1): ctx.fillText("'''`-._,-", 90, 75);
        break;
    case(2): ctx.fillText("-'''`-._,", 90, 75);
        break;
    case(3): ctx.fillText(",-'''`-._", 90, 75);
        break;
    case(4): ctx.fillText("_,-'''`-.", 90, 75);
        break;
    case(5): ctx.fillText("._,-'''`-", 90, 75);
        break;
    case(6): ctx.fillText("-._,-'''`", 90, 75);
        break;
    case(7): ctx.fillText("`-._,-'''", 90, 75);
        break;
    case(8): ctx.fillText("'`-._,-''", 90, 75);
        break;
    default:
        console.log("hello");
    }

    switch (beat) {
        case (0): ctx.fillText("''`-._,-'", 100, 20);
            break;
        case (1): ctx.fillText("'''`-._,-", 100, 20);
            break;
        case (2): ctx.fillText("-'''`-._,", 100, 20);
            break;
        case (3): ctx.fillText(",-'''`-._", 100, 20);
            break;
        case (4): ctx.fillText("_,-'''`-.", 100, 20);
            break;
        case (5): ctx.fillText("._,-'''`-", 100, 20);
            break;
        case (6): ctx.fillText("-._,-'''`", 100, 20);
            break;
        case (7): ctx.fillText("`-._,-'''", 100, 20);
            break;
        case (8): ctx.fillText("'`-._,-''", 100, 20);
            break;
        default:
            console.log("hello");
    }

    

    
    
}