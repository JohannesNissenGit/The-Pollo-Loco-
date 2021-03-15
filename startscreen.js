
function initstartscreen() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let startimage = new Image();    
    startimage.src = './img/screens/startscreen_background.png';
    if (startimage.complete) {
        ctx.drawImage(startimage, 0, 0, canvas.width, canvas.height);
    }
    
    document.getElementById('tryagainbutton').classList.add('d-none');
    document.getElementById('tryagainbutton').classList.add('zminus10');
    document.getElementById('tryagainbutton').classList.remove('z10');
}

function startnewgame() {
    document.getElementById('startbutton').classList.add('d-none');
    document.getElementById('startbutton').classList.add('zminus10');
    document.getElementById('startbutton').classList.remove('z10');
    init();

}