//-----------------variables-------------------------------------------

//general canvas
let canvas;
let ctx;

//character
let character_x = 130;
let character_y = 110;
let character_energy = 100;
let isMovingRight = false;
let isMovingLeft = false;
let lastJumpStarted = 0;
let isFalling = false;
let isJumping = false;
let timeoutInvincible = false;
PlayerLastDirection = 'right';
let currentCharacterImage = 'img/character-1.png';
let characterRunningGraphicsRight = ['./img/character/02_WALK/W-21.png', './img/character/02_WALK/W-22.png', './img/character/02_WALK/W-23.png', './img/character/02_WALK/W-24.png', './img/character/02_WALK/W-25.png', './img/character/02_WALK/W-26.png'];
let characterRunningGraphicsLeft = ['./img/character/02_WALK/W-L-21.png', './img/character/02_WALK/W-L-22.png', './img/character/02_WALK/W-L-23.png', './img/character/02_WALK/W-L-24.png', './img/character/02_WALK/W-L-25.png', './img/character/02_WALK/W-L-26.png'];
let characterJumpingGraphicsRight = ['./img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png'];
let characterJumpingGraphicsLeft = [];
let characterGraphicsIndex = 0;
let characterGraphicsJumpingIndex = 0;

//background
let bg_elem_1_x = 0; //foreground x, counters "walking" speed of player 
let bg_elem_2_x = 0;
let bg_elem_3_x = 0;
let cloudoffset = 0;

//enemies
let chickens = [];
let enemy_small_x = 0;
let boss_position_x = 600;
let boss_health = 100;
let boss_defeated_at = 0;
let bosstimeoutInvincible = false;

//items
let placedBottles = [200, 600, 990, 1700, 2450];
let collectedBottles = 50;
let bottleThrowTime = 0;
let thrownBottle_x = 0; //x position of thrown object
let thrownBottle_y = 0;
let tacos = [
    { "tacoposition_x": 500, "tacoposition_y": 350, "tacoscale": 0.1 },
    { "tacoposition_x": 900, "tacoposition_y": 350, "tacoscale": 0.1 }
];

//-------------------constants-----------------------------------------
let GAME_SPEED = 5; //variable to control speed of game
let GRAVITY = 7;    //gravity downwards pull for thrown objects
let JUMP_TIME_UP = 270; //240 //time moving up while jumping
let WHOLE_JUMP_TIME = JUMP_TIME_UP + JUMP_TIME_UP * 1.9; //duration of whole jump 
let COLLISION_DETECT_OFFSET_Y = 215;    //bridges offset in y direction between character and small enemies
let INVINCIBILITY_DURATION_AFTER_HIT = 800; //disables damage for a certain time in ms after being hit
let BOSS_INVINCIBILITY_DURATION_AFTER_HIT = 500; //disables damage to boss for a certain time in ms after hit by player
let DAMAGE_ONE_HIT = 20; //damage received for one hit by regular enemy
let DAMAGE_BOSS_ONE_HIT = 25; //damage received for one hit by boss

let LEVEL_WALL_START = -5; //invisible wall on (left) start side of level
let LEVEL_WALL_FINISH = -2500; //invisible wall on (right) end side of level, increases with negatively

let TACO_HEALTH_POTION = 40; //amount of health gained by picking up taco powerup

//--------------------sounds----------------------------------------
let AUDIO_RUNNING = new Audio('./sounds/cartoon_running.mp3');
AUDIO_RUNNING.volume = 0.9;
let AUDIO_JUMPING = new Audio('./sounds/cartoon_jump.mp3');
AUDIO_JUMPING.volume = 0.6;
let AUDIO_LOOP = new Audio('./sounds/mariachi.mp3');
AUDIO_LOOP.loop = true;
AUDIO_LOOP.volume = 0.1;
let AUDIO_BOTTLE_PICKUP = new Audio('./sounds/powerup_2.mp3');
AUDIO_BOTTLE_PICKUP.volume = 0.6;
let AUDIO_BOTTLE_THROW = new Audio('./sounds/bottle_throw_short.mp3');
AUDIO_BOTTLE_THROW.volume = 0.6;
let AUDIO_TACO_PICKUP = new Audio('./sounds/powerup_1.mp3');
AUDIO_TACO_PICKUP.volume = 0.6;
let PLAYER_DAMAGE_HIT= new Audio('./sounds/character_damage_uu.mp3');
PLAYER_DAMAGE_HIT.volume = 0.4;
let BOSS_DAMAGE_HIT = new Audio('./sounds/damage_punch.mp3');
BOSS_DAMAGE_HIT.volume = 0.6;
//---------------------functions-----------------------------------------


/**
 * StartMusic: starts playing the music theme for the level
 */
async function StartMusic() {
    AUDIO_LOOP.play();
}

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
    checkForCollision();
    listenForKeys();

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

/**
 * checkForJumping(): checks for jump condition and displays jumping animation 
 */
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
 * checkForCollision(): checks if character is in collision radius with relevant objects
 */
function checkForCollision() {
    setInterval(function () {
        checkCollisionSmallEnemies();
        checkCollisionBottles();
        checkCollisionTacos();
        checkCollisionBoss();
    }, 50)
}

function checkCollisionSmallEnemies() {
    for (let i = 0; i < chickens.length; i++) {
        let enemy = chickens[i];
        //let enemy_x_absolute = enemy.position_x + bg_elem_1_x;
        if ((enemy.position_x - 80) < character_x && (enemy.position_x + 20) > character_x) { //check x direction
            // if ((enemy_x_absolute - 10) < character_x && (enemy_x_absolute + 10) > character_x) { //proposition of Junus, not working
            //console.log('collisionX');   
            if ((enemy.position_y - COLLISION_DETECT_OFFSET_Y - 20) < character_y && (enemy.position_y - COLLISION_DETECT_OFFSET_Y + 20) > character_y) {
                if (!timeoutInvincible) {
                    character_energy = character_energy - DAMAGE_ONE_HIT;
                    invincibilityAfterDamage();
                    PLAYER_DAMAGE_HIT.play();
                }
            }
        }
    }
}

function checkCollisionBottles() {
    for (let i = 0; i < placedBottles.length; i++) {
        let object_x = placedBottles[i];
        if ((object_x - 30) < (character_x - bg_elem_1_x) && (object_x + 30) > (character_x - bg_elem_1_x)) { //check x direction 

            if (character_y > 100) {
                placedBottles.splice(i, 1);
                AUDIO_BOTTLE_PICKUP.play();
                collectedBottles = collectedBottles + 1;
            }
        }
    }
}

function checkCollisionBoss() {

    if ((boss_x - 60) < (character_x - bg_elem_1_x) && (boss_x + 220) > (character_x - bg_elem_1_x)) { //collision boss-player: check x direction
        if (!timeoutInvincible) {
            character_energy = character_energy - DAMAGE_BOSS_ONE_HIT;
            invincibilityAfterDamage();
            PLAYER_DAMAGE_HIT.play();
        }
    }
    if ((thrownBottle_x - 40) < boss_x && (thrownBottle_x + 180) > boss_x) { // collision boss-thrown bottle: check x direction
        console.log('hitX');
        if (!bosstimeoutInvincible) {
            boss_health = boss_health - 25;
            BossinvincibilityAfterDamage();
            console.log(boss_health);
            BOSS_DAMAGE_HIT.play();
        }
    }
}

function checkCollisionTacos() {
    for (let i = 0; i < tacos.length; i++) {
        let powerup = tacos[i];

        if ((powerup.tacoposition_x + bg_elem_1_x - 100) < character_x && (powerup.tacoposition_x + bg_elem_1_x + 20) > character_x) { //check x direction
            if ((powerup.tacoposition_y - 240 - 20) < character_y && (powerup.tacoposition_y + 20) > character_y) {
                character_energy = character_energy + TACO_HEALTH_POTION;
                if (character_energy > 100) {
                    character_energy = 100;
                }
                tacos.splice(i, 1);
                AUDIO_TACO_PICKUP.play();
            }
        }
    }
}


/**
 * invincibilityAfterDamage: creates a timeframe of invincibilty after taking damage
 */
function invincibilityAfterDamage() {
    timeoutInvincible = true;
    setTimeout(function () {
        timeoutInvincible = false;
    }, INVINCIBILITY_DURATION_AFTER_HIT);

}

function BossinvincibilityAfterDamage() {
    bosstimeoutInvincible = true;
    setTimeout(function () {
        bosstimeoutInvincible = false;
    }, BOSS_INVINCIBILITY_DURATION_AFTER_HIT);
}

/**
 * draw visible elements
 */
function draw() {
    drawBackground();
    updateCharacter();
    drawChicken();
    drawItemBottles();
    drawItemTacos();
    requestAnimationFrame(draw);
    drawEnergybar();
    drawStatusbar();
    drawThrowBottle();
    drawBoss();
}

/**
 * drawStatusbar(): displays collected items
 */
function drawStatusbar() {
    ctx.font = '20px Impact' //text amount
    ctx.fillStyle = 'white';
    ctx.fillText('x ' + collectedBottles, 50, 50);
    let bottleicon = new Image(); //icon bottle
    bottleicon.src = './img/items/Bottle_Tabasco/1_bottle_straight.png';
    if (bottleicon.complete) {
        ctx.drawImage(bottleicon, 0, 0, bottleicon.width * 0.17, bottleicon.height * 0.17);
    }
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

function drawEnergybar() {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "white"; //frame energybar
    ctx.fillRect(500, 10, 210, 30);
    ctx.fillStyle = "red"; //energybar
    ctx.fillRect(505, 15, 2 * character_energy, 20);
    ctx.globalAlpha = 1;
}

function ThrowBottle() {
    let timePassed = new Date().getTime() - bottleThrowTime;
    if (timePassed > 800) {
        collectedBottles--;
        bottleThrowTime = new Date().getTime();
        drawThrowBottle();
        AUDIO_BOTTLE_THROW.play();
    }
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
    if (isMovingRight && bg_elem_1_x > LEVEL_WALL_FINISH) { //&& bg_elem_1_x < LEVEL_WALL_FINISH)
        bg_elem_1_x = bg_elem_1_x - GAME_SPEED;
        bg_elem_2_x = bg_elem_2_x - (0.5 * GAME_SPEED);
        bg_elem_3_x = bg_elem_3_x - (0.35 * GAME_SPEED);
        for (i = 0; i < chickens.length; i++) {
            chickens[i].position_x = chickens[i].position_x - GAME_SPEED;
        }
    }

    if (isMovingLeft && bg_elem_1_x < LEVEL_WALL_START) {
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

    for (j = 0; j < 6; j++) {
        addBackgroundObject('./img/background/02_middleBG/completo.png', bg_elem_2_x + j * 1050, 70, 0.28);  //middle distanced background layer
    }

    for (k = 0; k < 10; k++) {
        addBackgroundObject('./img/background/01_nearBG/completo.png', bg_elem_1_x + k * 960, -30, 0.45);    //nearest background layer
    }
}

/**
 * drawclouds: adds cloud objects
 */
function drawclouds() {
    addBackgroundObject('./img/background/04_clouds/Completo.png', 100 - cloudoffset, -60, 0.5);
    addBackgroundObject('./img/background/04_clouds/1.png', 1000 - cloudoffset, -60, 0.5);
    addBackgroundObject('./img/background/04_clouds/2.png', 1200 - cloudoffset, -60, 0.6);
}

/**
 * calcuteCloudOffset(): calculates cloud images offset in x direction
 */
function calcuteCloudOffset() {
    setInterval(function () {
        cloudoffset = cloudoffset + 0.25;
    }, 50)
}

/**
 * drawItemBottle: draws bottles on canvas
 */
function drawItemBottles() {
    for (i = 0; i < placedBottles.length; i++) {
        let bottle_x = placedBottles[i];
        addBackgroundObject('./img/items/Bottle_Tabasco/2_bottle_buried1.png', bg_elem_1_x + bottle_x, 310, 0.25);
    }
}

/**
 * drawThrowBottle():displays thrown bottles
 */
function drawThrowBottle() {
    if (bottleThrowTime) {  //checks if bottleThrowTime is defined, which is with every throw
        let timePassed = new Date().getTime() - bottleThrowTime;
        let gravityAdded = Math.pow(GRAVITY, timePassed / 200);
        thrownBottle_x = 180 + (timePassed * 0.6);
        thrownBottle_y = character_y + 100 - (timePassed * 0.4 - gravityAdded);
        let image = new Image(); //icon bottle
        image.src = './img/items/Bottle_Tabasco/1_bottle_straight.png';
        if (image.complete) {
            ctx.drawImage(image, thrownBottle_x, thrownBottle_y, image.width * 0.25, image.height * 0.25);
        }
    }
}

function drawItemTacos() {

    for (i = 0; i < tacos.length; i++) {
        let position_x = tacos[i].tacoposition_x + bg_elem_1_x;
        let position_y = tacos[i].tacoposition_y;
        let scale = tacos[i].tacoscale;
        addBackgroundObject('./img/items/Taco_HealthPotion/taco-placeholder.png', position_x, position_y, scale);
    }
}
//-------------Enemies--------------------------------------------------

/**
 * createEnemyList: initializes planned enemies for level
 */
function createEnemyList() {
    chickens = [
        createChicken('brown', bg_elem_1_x + 600, 2),
        createChicken('yellow', bg_elem_1_x + 900, 3),
        createChicken('yellow', bg_elem_1_x + 1000, (Math.random() * 5)),
        createChicken('brown', bg_elem_1_x + 1200, 2),
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

function drawBoss() {
    boss_x = boss_position_x;
    addBackgroundObject('./img/enemies/chicken_boss/2_alert/G10.png', bg_elem_1_x + boss_x, 60, 0.3);
    //boss health bar
    if (boss_health > 0) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = "white"; //frame boss energybar
        ctx.fillRect(bg_elem_1_x + boss_x - 5, 75, 140, 20);
        ctx.fillStyle = "red"; // boss energybar
        ctx.fillRect(bg_elem_1_x + boss_x, 80, 1.3 * boss_health, 10);
        ctx.globalAlpha = 1;
    }

}

//------movement------------------------------------------------------

/**
 *listenForKeys: enable and distribute keys to movement
 */

function listenForKeys() {

    document.addEventListener("keydown", e => {
        const k = e.key;
        // if (handler.hasOwnProperty(k)) {
        //     handler[k](k);
        // }
        //console.log(k); //log keydowns in realtime
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

        if (k == 'd' && collectedBottles > 0) {
            ThrowBottle();
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