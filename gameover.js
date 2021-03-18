function initEndscreen() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    if (gamewin) {
        drawEndScreen();
    }
    if (gameover) {
        drawGameoverScreen();
    }

}



function drawEndScreen() {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.font = '100px Impact' //text
    ctx.fillStyle = 'white';
    ctx.fillText('You made it! ', 100, 250);
    document.getElementById('tryagainbutton').classList.remove('d-none');
    document.getElementById('tryagainbutton').classList.remove('zminus10');
    document.getElementById('tryagainbutton').classList.add('z10');
}

function drawGameoverScreen() {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.font = '130px Impact' //text
    ctx.fillStyle = 'white';
    ctx.fillText('YOU LOST! ', 150, 220);
    document.getElementById('tryagainbutton').classList.remove('d-none');
    document.getElementById('tryagainbutton').classList.remove('zminus10');
    document.getElementById('tryagainbutton').classList.add('z10');
}