//SKETCH 8
//COMPLETED BY: your name
///DATE: 

nn.on("load", () => {

  // KAPLAY SETUP

  kaplay({

    // button setup

    buttons: {
      moveUp: {
        keyboard: ["up", "w"],
        gamepad: ["dpad-up"],
      },
      moveDown: {
        keyboard: ["down", "s"],
        gamepad: ["dpad-down"],
      },
      moveLeft: {
        keyboard: ["left", "a"],
        gamepad: ["dpad-left"],
      },
      moveRight: {
        keyboard: ["right", "d"],
        gamepad: ["dpad-right"],
      },
    },

    background:(211, 211, 211)
    // background settings

  });



  // GLOBAL VARIABLES


  const SPEED = 120;
  const JUMP_FORCE = 500;
  const DEADZONE = 0.15;

  let soundEffect;
  let isPlaying = false;
  let bgm;

  let timeLeft = 30;
  let gameScore = 0;

  let spawnSide = "left";




  // SPRITES

  // player sprite

  loadSprite(
    "player", "assets/bear.png" , {
      
      sliceX: 4,
      sliceY: 3,
        anims: {
          "back":{
          from: 0,
          to: 2,
          speed: 5,
          loop: true,
        },
          "left":{
          from: 3,
          to: 5,
          speed: 10,
          loop: true,
      },
          "right":{
          from: 9,
          to: 11,
          speed: 10,
          loop: true,
      },
        forward:{
          from: 6,
          to: 8,
          speed: 5,
          loop: true,
        },
    }
      // sprite animation

    }
  );

  // idle sprite

  loadSprite(
    "name",

    // sprite file

    {

      // frame animation

    }
  );

  // enemy sprite

  loadSprite( "enemy", "assets/bug.png");


  // collectible sprite

  loadSprite("apple", "assets/apple.png");


  // AUDIO ASSETS

  loadSound("explode", "assets/explode.mp3" );

  loadSound( "bell", "assets/bell.mp3"  );

  loadMusic("music", "assets/music.mp3" );



  // HELPERS

  function playSoundEffect () {

   if(!isPlaying){
     isPlaying = true;
     soundEffect = play("bell",
                        {
                       volume: 0.04
  });
     soundEffect.onEnd(() => {
       isPlaying = false;
     });



  function makePlatform (x, y, w, colorValue) {

    add([
      rect(w, 40),
      area(),
      outline(6),
      pos(x,y),
      body({
        isStatic: true
      }),
      color(colorValue),
      "platform"
      // platform setup

    ]);

  }



  function spawnCollectible () {

    add([
      sprite("apple"),
      pos(rand(0,width()), rand(0,height())),
      scale(rand(0.5,1.5)),
      rotate(rand(0,65)),
      area(),
      anchor("center"),
      "apple"
      // collectible setup

    ]);

  }



  function spawnEnemy () {

    const enemy = add([
      sprite("enemy"),
      pos( rand(100, width()-100),
          rand(100, height()-100) ),
      area(),
      anchor("center"),
      "enemy"

    ]);

    wait(rand(3,30), () => {
      if(enemy.exist()){
        destroy(enemy);
      }
    });

  }



  function spawnEnemyWave () {
    const amount = randi(2,5)
    for(let i = 0; i < amount; i++){
      spawnEnemy();
    }
    }



  // LVL 1 SCENE

  scene("level1", () => {

    setGravity(640);

    let facing = RIGHT;

    const scoreText = add([
      text(gameScore.toString(),{
          size: 24,
          }),
      
      pos(24,24),
      color(BLACK),

    ]);

    const timer = add([
      text(timeLeft.toFixed(0)),
      pos(width()-24,24),
      anchor("topright"),
      color(BLACK)

    ]);



    const player = add([
      sprite("player"),
      pos(center()),
      anchor("center"),
      area(),
      body({
        jumpForce: JUMP_FORCE,
      }),
        doubleJump(),
    ]);

player.play("forward");

    // LEVEL EXIT

    const levelExit = add([
      rect(10, height()),
      pos(width()-10,0),
      area(),
      color(GREEN),
      //opacity(0),
      "levelExit"
     
    ]);



    // PLATFORMS

    makePlatform(0,height()-24, width(), MAGENTA);

    for (let i = 0; i < 5; i++) {

      // random platforms
      makePlatform(
      rand( 0 , 
        width() - 250),
        height() - 150 - (i * 100),
        rand( 50, 230 ),
        rgb(rand(0,255),0,rand(0,255))
        
    );
    }

    // COLLECTIBLES

    for (let i = 0; i < 5; i++) {

      spawnCollectible();

    }

    // collectible loop
loop(5, spawnCollectible);

    // ENEMIES

    spawnEnemyWave();

    // enemy loop

loop(15, spawnEnemyWave);

    // CONTROLS

    onButtonDown("moveRight", () => {

      player.move(SPEED, 0);
      facing = RIGHT,
      playSoundEffect();
      player.play("right");

    });



    onButtonDown("moveLeft", () => {

     player.move(-SPEED, 0);
      facing = LEFT,
      playSoundEffect();
      player.play("left");

    });



    onButtonDown("moveUp", () => {
      
      player.doubleJump();
      player.play("forward");

    });



    onButtonDown("moveDown", () => {

        
      player.move(0, -SPEED);
      player.play("back");

    });



    // PROJECTILES

    function shoot () {

      add([

        // projectile setup

      ]);

    }

    // shoot controls



    // CAMERA

    // camera follow



    // TIMER & JOYSTICK (ANALOG) MOVEMENT

    onUpdate(() => {

      // movement logic

      // timer logic

      // win check

      // lose check

    });



    // COLLISIONS

    player.onCollide("collectible", (item) => {

      // collect logic

    });



    player.onCollide("enemy", () => {

      // lose logic

    });



    onCollide("bullet", "enemy", (bullet, enemy) => {

      // projectile collision

    });



    // TRANSITION EFFECT

    const fade = add([

      // fade overlay

    ]);



    player.onCollide("levelExit", () => {

      // level transition

    });

  });



  // LVL 2 SCENE

  scene("level2", () => {

    setGravity(640);

    let facing = RIGHT;



    const scoreText = add([

      // score display

    ]);



    const timer = add([

      // timer display

    ]);



    const player = add([

      // player setup

    ]);



    const returnExit = add([

      // return exit

    ]);



    // PLATFORMS

    makePlatform(

      // floor platform

    );



    // random platforms



    // ENEMIES

    spawnEnemyWave();



    // enemy loop



    // COLLECTIBLES

    spawnCollectible();



    // collectible loop



    // CONTROLS

    // movement controls



    // PROJECTILES

    function shoot () {

      add([

        // projectile setup

      ]);

    }



    // COLLISIONS

    player.onCollide("collectible", (item) => {

      // collect logic

    });



    player.onCollide("enemy", () => {

      // lose logic

    });



    onCollide("bullet", "enemy", (bullet, enemy) => {

      // projectile collision

    });



    // CAMERA
    // camera scale

    // camera follow



    // TIMER + ANALOG MOVEMENT

    onUpdate(() => {

      // movement logic

      // timer logic

      // win check

      // lose check

    });



    player.onCollide("returnExit", () => {

      // return transition

    });

  });



  // WIN GAME SCENE

  scene("win", () => {

    add([

      // win text

    ]);



    add([

      // restart text

    ]);



    onKeyPress("enter", () => {

      // reset variables

      // restart game

    });

  });



  //LOSE GAME SCENE

  scene("lose", () => {

    add([

      // lose text

    ]);



    add([

      // restart text

    ]);



    onKeyPress("enter", () => {

      // reset variables

      // restart game

    });

  });



  // START MUSIC ONCE LOADED

  onLoad(() => {

    // music start

  });



  onKeyPress("space", () => {

    // music toggle

  });



  // RESET GAME 

  go("level1");

});
    
    
    
    
    
    
    
    // onClick("player", (p) => {
    //   p.use(sprite("kat"));
    //   play("");
    //   score += 10;
    // })
    
    player.onCollide("player", (p) => {
      const playerPos = p.pos;
      destroy(p);
      add({
        sprite(),
        pos(playerPos),
        anchor("center")
      })
    })