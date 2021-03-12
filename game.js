//-----------------variables

//general canvas
let canvas;
let ctx;

//character
let character_x = 130;
let character_y = 110;
let isMovingRight = false;
let isMovingLeft = false;
let lastJumpStarted = 0;
let isFalling = false;
let currentCharacterImage = 'img/character-1.png';
let characterRunningGraphicsRight = ['./img/character/02_WALK/W-21.png', './img/character/02_WALK/W-22.png', './img/character/02_WALK/W-23.png','./img/character/02_WALK/W-24.png', './img/character/02_WALK/W-25.png', './img/character/02_WALK/W-26.png'];
let characterRunningGraphicsLeft =  ['./img/character/02_WALK/W-L-21.png', './img/character/02_WALK/W-L-22.png', './img/character/02_WALK/W-L-23.png','./img/character/02_WALK/W-L-24.png', './img/character/02_WALK/W-L-25.png', './img/character/02_WALK/W-L-26.png'];
let characterGraphicsIndex = 0;

//background
let bg_elem_1_x = 0;
let bg_elem_2_x = 0;
let bg_elem_3_x = 0 ;


//-------------------constants

let JUMP_TIME = 240;
let GAME_SPEED = 5;

//---------------------functions

/**
 * initialise display
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    checkForRunning();
    draw();

    listenForKeys();
}

/**
 * checks if player is moving and changes animation
 */
function checkForRunning() {
    setInterval(function () {
        if (isMovingRight) {
            let index = characterGraphicsIndex % characterRunningGraphicsRight.length;
            currentCharacterImage = characterRunningGraphicsRight[index];
            characterGraphicsIndex = characterGraphicsIndex + 1;
        }
        if (isMovingLeft) {
            let index = characterGraphicsIndex % characterRunningGraphicsLeft.length;
            currentCharacterImage = characterRunningGraphicsLeft[index];
            characterGraphicsIndex = characterGraphicsIndex + 1;
        }
    }, 60);
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
    base_image.src = currentCharacterImage;

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
 * drawBackground: background display
 */
function drawBackground() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let sky = new Image();
    sky.src = './img/background/05_Sky_1920-1080px.png';
    if (sky.complete) {
        ctx.drawImage(sky, 0, 0, sky.width * 0.4, sky.height * 0.4);
    }
    drawGround();
}

/**
 * drawGround: drawing stuff on ground
 */
function drawGround() {
    ctx.fillStyle = '#FFE699';
    ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

    if (isMovingRight) {
        bg_elem_1_x = bg_elem_1_x - GAME_SPEED;
        bg_elem_2_x = bg_elem_2_x - (0.5 * GAME_SPEED);
        bg_elem_3_x = bg_elem_3_x - (0.35 * GAME_SPEED);
    }

    if (isMovingLeft) {
        bg_elem_1_x = bg_elem_1_x + GAME_SPEED;
        bg_elem_2_x = bg_elem_2_x + (0.4 * GAME_SPEED);
        bg_elem_3_x = bg_elem_3_x + (0.25 * GAME_SPEED);
    }
    addBackgroundObject('./img/background/03_farBG/Completo.png', bg_elem_3_x, -110, 0.45);  //far away background layer
    addBackgroundObject('./img/background/03_farBG/Completo.png', bg_elem_3_x + 1726 , -110, 0.45); //second tile with x offset to connect to first tile

    addBackgroundObject('./img/background/02_middleBG/completo.png', bg_elem_2_x, 70, 0.28);  //middle distanced background layer
    addBackgroundObject('./img/background/02_middleBG/completo.png', bg_elem_2_x + 1050, 70, 0.28);

    addBackgroundObject('./img/background/01_nearBG/completo.png', bg_elem_1_x, 110, 0.25);    //nearest background layer
    addBackgroundObject('./img/background/01_nearBG/completo.png', bg_elem_1_x + 960, 110, 0.25);
}

/**
 * addBackgroundObject: general function to create background objects 
 */

function addBackgroundObject(src, offsetX, offsetY, scale,) {
    let base_image = new Image();
    base_image.src = src;
    if (base_image.complete) {
        ctx.drawImage(base_image, offsetX, offsetY, base_image.width * scale, base_image.height * scale);
    }
}

/**
 *listenForKeys: enable and distribute movement
 */

function listenForKeys() {
    document.addEventListener("keydown", e => {
        const k = e.key;
        // if (handler.hasOwnProperty(k)) {
        //     handler[k](k);
        // }
        if (k == 'ArrowRight') {
            //    character_x = character_x + 5;
            isMovingRight = true;
        }
        if (k == 'ArrowLeft') {
            //    character_x = character_x - 5;
            isMovingLeft = true;
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;

        if (e.code == 'Space' && timePassedSinceJump > (JUMP_TIME + JUMP_TIME * 1.7)) {
            lastJumpStarted = new Date().getTime();
        }
    });

    document.addEventListener("keyup", e => {
        const k = e.key;
        if (k == 'ArrowRight') {
            //    character_x = character_x + 5;
            isMovingRight = false;
        }
        if (k == 'ArrowLeft') {
            //    character_x = character_x - 5;
            isMovingLeft = false;
        }
        //if (e.code == 'Space') {
        //     lastJumpStarted = new Date().getTime();
        // }
    });
}