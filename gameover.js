function drawEndScreen() {
ctx.globalAlpha = 0.4;
ctx.fillStyle = "blue"; //frame energybar
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalAlpha = 1;
    ctx.font = '100px Impact' //text
    ctx.fillStyle = 'white';
    ctx.fillText('You made it! ', 100, 250);
    
}
