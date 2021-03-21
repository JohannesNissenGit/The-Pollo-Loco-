let startimage;

function initstartscreen() {
    //initPreload();
    preloadImages();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    AUDIO_STARTSCREEN_LOOP.play();

    startimage = new Image();
    startimage.src = './img/screens/startscreen_background.png';
    startimage.onload = function () {
        ctx.drawImage(startimage, 0, 0, canvas.width, canvas.height);
    };
    //}

    document.getElementById('tryagainbutton').classList.add('d-none');
    document.getElementById('tryagainbutton').classList.add('zminus10');
    document.getElementById('tryagainbutton').classList.remove('z10');
}

function startnewgame() {
    //await preloadImages();
    document.getElementById('buttoncotainer').classList.add('d-none');
    document.getElementById('buttoncotainer').classList.add('zminus10');
    document.getElementById('buttoncotainer').classList.remove('z10');
    document.getElementById('helpbutton').classList.add('d-none');
    document.getElementById('helpbutton').classList.add('zminus10');
    document.getElementById('helpbutton').classList.remove('z10');
    AUDIO_STARTSCREEN_LOOP.pause();
    AUDIO_LEVEL_START.play();
    init();

}

function openhelp() {
    document.getElementById('helpcontainer').classList.remove('d-none');
    document.getElementById('helpcontainer').classList.remove('zminus10');
    document.getElementById('helpcontainer').classList.add('z10');
}

function closehelp() {
    document.getElementById('helpcontainer').classList.add('d-none');
    document.getElementById('helpcontainer').classList.add('zminus10');
    document.getElementById('helpcontainer').classList.remove('z10');
}