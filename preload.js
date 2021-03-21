
/**

* Preload all images, executed before starting the game.

* imagePaths contains all image paths that will be loaded: ['img/image1.png', 'img/image2.png', 'img/image3.png', ...]

*/

let imagePaths = [
    'img/character-1.png',
    './img/character/02_WALK/W-21.png', './img/character/02_WALK/W-22.png', './img/character/02_WALK/W-23.png', './img/character/02_WALK/W-24.png', './img/character/02_WALK/W-25.png', './img/character/02_WALK/W-26.png',
    './img/character/02_WALK/W-L-21.png', './img/character/02_WALK/W-L-22.png', './img/character/02_WALK/W-L-23.png', './img/character/02_WALK/W-L-24.png', './img/character/02_WALK/W-L-25.png', './img/character/02_WALK/W-L-26.png',
    './img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/01_IDLE/IDLE/I-1.png',
    './img/character/03_JUMP/J-L-34.png', './img/character/03_JUMP/J-L-34.png', './img/character/03_JUMP/J-L-35.png', './img/character/03_JUMP/J-L-35.png', './img/character/03_JUMP/J-L-36.png', './img/character/03_JUMP/J-L-36.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/01_IDLE/IDLE/I-1.png',
    './img/character/01_IDLE/IDLE/I-10.png', './img/character/01_IDLE/IDLE/I-10.png', './img/character/01_IDLE/IDLE/I-10.png', './img/character/01_IDLE/LONG_IDLE/I-11.png', './img/character/01_IDLE/LONG_IDLE/I-11.png', './img/character/01_IDLE/LONG_IDLE/I-11.png', './img/character/01_IDLE/LONG_IDLE/I-12.png', './img/character/01_IDLE/LONG_IDLE/I-12.png', './img/character/01_IDLE/LONG_IDLE/I-13.png', './img/character/01_IDLE/LONG_IDLE/I-13.png', './img/character/01_IDLE/LONG_IDLE/I-14.png', './img/character/01_IDLE/LONG_IDLE/I-14.png', './img/character/01_IDLE/LONG_IDLE/I-15.png', './img/character/01_IDLE/LONG_IDLE/I-15.png', './img/character/01_IDLE/LONG_IDLE/I-16.png', './img/character/01_IDLE/LONG_IDLE/I-16.png',
    './img/enemies/chicken_yellow/1_walk.png', './img/enemies/chicken_yellow/2_walk.png', './img/enemies/chicken_yellow/3_walk.png',
    './img/enemies/chicken_brown/1_walk.png', './img/enemies/chicken_brown/2_walk.png', './img/enemies/chicken_brown/3_walk.png',
    './img/enemies/chicken_boss/1_walk/G1.png', './img/enemies/chicken_boss/1_walk/G2.png', './img/enemies/chicken_boss/1_walk/G3.png', './img/enemies/chicken_boss/1_walk/G4.png',
    './img/enemies/chicken_boss/5_dead/G23.png', './img/enemies/chicken_boss/5_dead/G24.png', './img/enemies/chicken_boss/5_dead/G25.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png',
    './img/items/Bottle_Tabasco/rotation/rotate1_0.png', './img/items/Bottle_Tabasco/rotation/rotate2_90.png', './img/items/Bottle_Tabasco/rotation/rotate3_180.png', './img/items/Bottle_Tabasco/rotation/rotate4_270.png',
    './img/items/Bottle_Tabasco/2_bottle_buried1.png',
    './img/items/Taco_HealthPotion/taco_johannes.png',
    './img/background/05_Sky_1920-1080px.png',
    './img/background/06_Ground.png',
    './img/background/03_farBG/Completo.png',
    './img/background/02_middleBG/completo.png',
    './img/background/01_nearBG/completo.png',
    './img/background/04_clouds/Completo.png', './img/background/04_clouds/1.png', './img/background/04_clouds/2.png'
];

let images = [];

function preloadImages() {
    for (let i = 0; i < imagePaths.length; i++) {
  
      let image = new Image();
  
      image.src = imagePaths[i];
  
      images.push(image); // push image-path to images-array (which contains all image-paths)
  
    }
  
  }



//-----------------------------------------------------------------

  /**
   * preload images loads images into browser cache
   */

/*function preloadImages(array) { //https://stackoverflow.com/questions/10240110/how-do-you-cache-an-image-in-javascript
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  var list = preloadImages.list;
  for (var i = 0; i < array.length; i++) {
    var img = new Image();
    img.onload = function () {
      var index = list.indexOf(this);
      if (index !== -1) {
        // remove image from the array once it's loaded
        // for memory consumption reasons
       // list.splice(index, 1);
        console.log('item preloaded');
      }
    }
    list.push(img);
    img.src = array[i];
  }
}

function initPreload() {
  preloadImages([
    'img/character-1.png',
    './img/character/02_WALK/W-21.png', './img/character/02_WALK/W-22.png', './img/character/02_WALK/W-23.png', './img/character/02_WALK/W-24.png', './img/character/02_WALK/W-25.png', './img/character/02_WALK/W-26.png',
    './img/character/02_WALK/W-L-21.png', './img/character/02_WALK/W-L-22.png', './img/character/02_WALK/W-L-23.png', './img/character/02_WALK/W-L-24.png', './img/character/02_WALK/W-L-25.png', './img/character/02_WALK/W-L-26.png',
    './img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-34.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-35.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-36.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/03_JUMP/J-37.png', './img/character/01_IDLE/IDLE/I-1.png',
    './img/character/03_JUMP/J-L-34.png', './img/character/03_JUMP/J-L-34.png', './img/character/03_JUMP/J-L-35.png', './img/character/03_JUMP/J-L-35.png', './img/character/03_JUMP/J-L-36.png', './img/character/03_JUMP/J-L-36.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/03_JUMP/J-L-37.png', './img/character/01_IDLE/IDLE/I-1.png',
    './img/character/01_IDLE/IDLE/I-10.png', './img/character/01_IDLE/IDLE/I-10.png', './img/character/01_IDLE/IDLE/I-10.png', './img/character/01_IDLE/LONG_IDLE/I-11.png', './img/character/01_IDLE/LONG_IDLE/I-11.png', './img/character/01_IDLE/LONG_IDLE/I-11.png', './img/character/01_IDLE/LONG_IDLE/I-12.png', './img/character/01_IDLE/LONG_IDLE/I-12.png', './img/character/01_IDLE/LONG_IDLE/I-13.png', './img/character/01_IDLE/LONG_IDLE/I-13.png', './img/character/01_IDLE/LONG_IDLE/I-14.png', './img/character/01_IDLE/LONG_IDLE/I-14.png', './img/character/01_IDLE/LONG_IDLE/I-15.png', './img/character/01_IDLE/LONG_IDLE/I-15.png', './img/character/01_IDLE/LONG_IDLE/I-16.png', './img/character/01_IDLE/LONG_IDLE/I-16.png',
    './img/enemies/chicken_yellow/1_walk.png', './img/enemies/chicken_yellow/2_walk.png', './img/enemies/chicken_yellow/3_walk.png',
    './img/enemies/chicken_brown/1_walk.png', './img/enemies/chicken_brown/2_walk.png', './img/enemies/chicken_brown/3_walk.png',
    './img/enemies/chicken_boss/1_walk/G1.png', './img/enemies/chicken_boss/1_walk/G2.png', './img/enemies/chicken_boss/1_walk/G3.png', './img/enemies/chicken_boss/1_walk/G4.png',
    './img/enemies/chicken_boss/5_dead/G23.png', './img/enemies/chicken_boss/5_dead/G24.png', './img/enemies/chicken_boss/5_dead/G25.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png', './img/enemies/chicken_boss/5_dead/G26.png',
    './img/items/Bottle_Tabasco/rotation/rotate1_0.png', './img/items/Bottle_Tabasco/rotation/rotate2_90.png', './img/items/Bottle_Tabasco/rotation/rotate3_180.png', './img/items/Bottle_Tabasco/rotation/rotate4_270.png'
  ]);
}*/