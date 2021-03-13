//-----------------variables-------------------------------------------

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
let isJumping = false;
PlayerLastDirection = 'right';
let currentCharacterImage = 'img/character-1.png';
let characterRunningGraphicsRight = ['./img/character/02_WALK/W-21.png', './img/character/02_WALK/W-22.png', './img/character/02_WALK/W-23.png', './img/character/02_WALK/W-24.png', './img/character/02_WALK/W-25.png', './img/character/02_WALK/W-26.png'];
let characterRunningGraphicsLeft = ['./img/character/02_WALK/W-L-21.png', './img/character/02_WALK/W-L-22.png', './img/character/02_WALK/W-L-23.png', './img/character/02_WALK/W-L-24.png', './img/character/02_WALK/W-L-25.png', './img/character/02_WALK/W-L-26.png'];
let characterJumpingGraphicsRight = ['./img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png'];
let characterJumpingGraphicsLeft = [];
let characterGraphicsIndex = 0;
let characterGraphicsJumpingIndex = 0;

//background
let bg_elem_1_x = 0;
let bg_elem_2_x = 0;
let bg_elem_3_x = 0;
let cloudoffset = 0;

//enemies
let chickens = [];
let enemy_small_x = 0;


//-------------------constants-----------------------------------------
let GAME_SPEED = 5;
let JUMP_TIME_UP = 270; //240
let WHOLE_JUMP_TIME = JUMP_TIME_UP + JUMP_TIME_UP * 1.9;
let AUDIO_RUNNING = new Audio('./sounds/cartoon_running.mp3');
AUDIO_RUNNING.volume = 0.9;
let AUDIO_JUMPING = new Audio('./sounds/cartoon_jump.mp3');
AUDIO_JUMPING.volume = 0.6;
let AUDIO_LOOP = new Audio('./sounds/mariachi.mp3');
AUDIO_LOOP.loop = true;
AUDIO_LOOP.volume = 0.1;
//---------------------functions-----------------------------------------

/**
 * initialise display
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    //StartMusic();
    createEnemyList();
    checkForRunning();
    checkForJumping();
    draw();
    calcuteCloudOffset();
    calculateChickenPosition();
    listenForKeys();
}

/**
 * StartMusic: starts playing the music theme for the level
 */
async function StartMusic() {
    AUDIO_LOOP.play();
}

/**
 * checks if player is moving and changes animation
 */
function checkForRunning() {
    setInterval(function () {
        if (isMovingRight && !isJumping) {
            AUDIO_RUNNING.play();
            let index = characterGraphicsIndex % characterRunningGraphicsRight.length;
            currentCharacterImage = characterRunningGraphicsRight[index];
            characterGraphicsIndex = characterGraphicsIndex + 1;
            PlayerLastDirection = 'right';
        }
        if (isMovingLeft && !isJumping) {
            AUDIO_RUNNING.play();
            let index = characterGraphicsIndex % characterRunningGraphicsLeft.length;
            currentCharacterImage = characterRunningGraphicsLeft[index];
            characterGraphicsIndex = characterGraphicsIndex + 1;
            PlayerLastDirection = 'left';
        }
        if (!isMovingLeft && !isMovingRight) {
            AUDIO_RUNNING.pause();
        }
    }, 60);
}

function checkForJumping() {
    setInterval(function () {
            if (isJumping == true && PlayerLastDirection == 'right') {
            let index = characterGraphicsJumpingIndex % characterJumpingGraphicsRight.length;
            currentCharacterImage = characterJumpingGraphicsRight[index];
            characterGraphicsJumpingIndex = characterGraphicsJumpingIndex + 1;
        }
        if (isJumping == true && PlayerLastDirection == 'left') {
            let index = characterGraphicsJumpingIndex % characterJumpingGraphicsLeft.length;
            currentCharacterImage = characterJumpingGraphicsLeft[index];
            characterGraphicsJumpingIndex = characterGraphicsJumpingIndex + 1;
        }
    }, 50);
}

/**
 * draw visible elements
 */
function draw() {
    drawBackground();
    updateCharacter();
    drawChicken();
    requestAnimationFrame(draw);
}


//---------player model--------------------

/**
 * player model display
 */

function updateCharacter() {
    let base_image = new Image();
    base_image.src = currentCharacterImage;

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME_UP) {
        isJumping = true;
        character_y = character_y - 14;
        characterGraphicsJumpingIndex = 0;
    } else {

        if (character_y < 110) {
            isJumping = true;
            character_y = character_y + 7;
        }
        else { isJumping = false; }
    }


    if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.25, base_image.height * 0.25);
    };
}


//------------Objects-------------------------

/**
 * drawBackground: background display
 */
function drawBackground() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let sky = new Image(); //skybox
    sky.src = './img/background/05_Sky_1920-1080px.png';
    if (sky.complete) {
        ctx.drawImage(sky, 0, 0, sky.width * 0.4, sky.height * 0.4);
    }
    drawGround();
}

/**
 * drawGround: drawing stuff on ground + clouds + background
 */
function drawGround() {
    //ctx.fillStyle = '#FFE699';  //old ground layer
    //ctx.fillRect(0, 375, canvas.width, canvas.height - 375);
    addBackgroundObject('./img/background/06_Ground.png', 0, 320, 0.4);  //ground layer
    if (isMovingRight) {
        bg_elem_1_x = bg_elem_1_x - GAME_SPEED;
        bg_elem_2_x = bg_elem_2_x - (0.5 * GAME_SPEED);
        bg_elem_3_x = bg_elem_3_x - (0.35 * GAME_SPEED);
        for (i = 0; i < chickens.length; i++) {
            chickens[i].position_x = chickens[i].position_x - GAME_SPEED;
        }
    }

    if (isMovingLeft) {
        bg_elem_1_x = bg_elem_1_x + GAME_SPEED;
        bg_elem_2_x = bg_elem_2_x + (0.4 * GAME_SPEED);
        bg_elem_3_x = bg_elem_3_x + (0.25 * GAME_SPEED);
        for (i = 0; i < chickens.length; i++) {
            chickens[i].position_x = chickens[i].position_x + GAME_SPEED;
        }
    }
    drawclouds();
    drawBackgrounds();

}

/**
 * addBackgroundObject: general function to create background objects 
 */
function addBackgroundObject(src, offsetX, offsetY, scale) {
    let base_image = new Image();
    base_image.src = src;
    if (base_image.complete) {
        ctx.drawImage(base_image, offsetX, offsetY, base_image.width * scale, base_image.height * scale);
    }
}

/**
 * drawBackgrounds: adds 3 layers of background to game (change length of level via i,j,k)
 */
function drawBackgrounds() {
    for (i = 0; i < 3; i++) {
        addBackgroundObject('./img/background/03_farBG/Completo.png', bg_elem_3_x + i * 1726, -110, 0.45);  //far away background layer
    }

    for (j = 0; j < 4; j++) {
        addBackgroundObject('./img/background/02_middleBG/completo.png', bg_elem_2_x + j * 1050, 70, 0.28);  //middle distanced background layer
    }

    for (k = 0; k < 6; k++) {
        addBackgroundObject('./img/background/01_nearBG/completo.png', bg_elem_1_x + k * 960, -30, 0.45);    //nearest background layer
    }
}

/**
 * drawclouds: adds cloud objects
 */
function drawclouds() {
    addBackgroundObject('img/background/04_clouds/Completo.png', 100 - cloudoffset, -60, 0.5);
}

/**
 * calcuteCloudOffset(): calculates cloud images offset in x direction
 */
function calcuteCloudOffset() {
    setInterval(function () {
        cloudoffset = cloudoffset + 0.25;
    }, 50)
}


//-------------Enemies--------------------------------------------------

/**
 * createEnemyList: initializes planned enemies for level
 */
function createEnemyList() {
    chickens = [
        createChicken('brown', bg_elem_1_x + 600, 2),
        createChicken('yellow', bg_elem_1_x + 800, 4),
        createChicken('yellow', bg_elem_1_x + 1000, (Math.random() * 5))
    ]
}

/**
 * calculateChickenPosition: keeps track of current chicken position in x direction and updates chickens array
 */
function calculateChickenPosition() {
    setInterval(function () {
        for (i = 0; i < chickens.length; i++) {
            let chicken = chickens[i];
            chicken.position_x = chicken.position_x - chicken.speed;
        }
    }, 50)
}

/**
 * drawChicken(): function to display small enemy chicken
 */
function drawChicken() {
    for (i = 0; i < chickens.length; i++) {
        let enemy = chickens[i];
        addBackgroundObject(enemy.img, enemy.position_x, enemy.position_y, enemy.scale);
    }
}

/**
 * createChicken: constructs chicken-specific object with all regarding information
 * @param {string} type 
 * @param {number} position_x 
 */
function createChicken(type, position_x, speed) {
    return {
        "img": "./img/enemies/chicken_" + type + "/1_walk.png",
        "position_x": position_x,
        "position_y": 325,
        "scale": 0.32,
        "speed": speed
    };
}



//------movement------------------------------------------------------

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

        if (e.code == 'Space' && timePassedSinceJump > WHOLE_JUMP_TIME) {
            lastJumpStarted = new Date().getTime();
            AUDIO_JUMPING.play();

        }
        else { isJumping = false; } // TEST JUMPING /////////////////////////////////////////
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