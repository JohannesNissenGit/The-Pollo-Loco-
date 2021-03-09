//-----------------variables

let canvas;
let ctx;
let character_x = 0;
let character_y = 110;
let isMovingRight = false;
let isMovingLeft = false;
let lastJumpStarted = 0;
let isFalling = false;
let bg_elem_1_x = 0;
let bg_elem_2_x = 0;

//-------------------constants

let JUMP_TIME = 240;

//---------------------functions

/**
 * initialise display
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    draw();

    listenForKeys();
}

/**
 * draw visible elements
 */
function draw() {
    drawBackground();
    updateCharacter();
    requestAnimationFrame(draw);
}

/**
 * player model display
 */

function updateCharacter() {
    let base_image = new Image();
    base_image.src = 'img/character-1.png';

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 14;
    } else {
        if (character_y < 110) {
            character_y = character_y + 7;

        } 
    }

        if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.25, base_image.height * 0.25);
    };
}
/**
 * background display
 */
function drawBackground() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGround();
}

function drawGround() {
    ctx.fillStyle = '#FFE699';
    ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

    if (isMovingRight) {
        bg_elem_1_x = bg_elem_1_x - 2;
        bg_elem_2_x = bg_elem_1_x - 1;
    }

    if (isMovingLeft) {
        bg_elem_1_x = bg_elem_1_x + 2;
        bg_elem_2_x = bg_elem_1_x + 2;
    }

    let base_image2 = new Image();
    base_image2.src = 'img/background/bg_elem_2.png';
    if (base_image2.complete) {
        ctx.drawImage(base_image2, bg_elem_2_x, 110, base_image2.width * 0.25, base_image2.height * 0.25);
    };

    let base_image = new Image();
    base_image.src = 'img/background/bg_elem_1.png';
    if (base_image.complete) {
        ctx.drawImage(base_image, bg_elem_1_x, 110, base_image.width * 0.25, base_image.height * 0.25);
    };



    /**
     * enable movement
     */
}
function listenForKeys() {
    document.addEventListener("keydown", e => {
        const k = e.key;
        // if (handler.hasOwnProperty(k)) {
        //     handler[k](k);
        // }
        if (k == 'ArrowRight') {
            character_x = character_x + 5;
            isMovingRight = true;
        }
        if (k == 'ArrowLeft') {
            character_x = character_x - 5;
            isMovingLeft = true;
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    
        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            lastJumpStarted = new Date().getTime();
        }
    });

    document.addEventListener("keyup", e => {
        const k = e.key;
        if (k == 'ArrowRight') {
            character_x = character_x + 5;
            isMovingRight = false;
        }
        if (k == 'ArrowLeft') {
            character_x = character_x - 5;
            isMovingLeft = false;
        }
        //if (e.code == 'Space') {
       //     lastJumpStarted = new Date().getTime();
       // }
    });
}