var gameState="PLAY";

var background1,background2,background3,background4;
var mario;
var marioRunning,marioJumping;
var starImage;
var monster,seaMonster,valleyMonster;
var score=0;
var ground;
var reset;

function preload(){
  marioRunning=loadImage("mario-run.png");
  marioJumping=loadImage("mario jump.png")

 valleyMonster=loadImage("valley monster.png");

 background1=loadImage("valley-bg-level1.jpg");
 background2=loadImage("seabg-level2.png");
 background3=loadImage("mountain-bg-level3.jpg");
 background4=loadImage("volcano-bg2-4thlevel.jpg");

 starImage=loadImage("star right.png");

 restartImage=loadImage("resetImage.png")
 gameOverImage=loadImage("gameover.png")
}

function setup(){
 createCanvas(1000,600);

 bg=createSprite(500,300);
 bg.addImage("bg",background1);
 bg.addImage("bg2",background2);
 bg.addImage("bg3",background3);
 bg.addImage("bg4",background4);
 bg.velocityX = -2;
 bg.x=bg.width/2

 mario=createSprite(200,580);
 mario.addImage("image",marioRunning);
 mario.scale=0.07;

 ground=createSprite(200,590,1000,20);
 ground.velocityX=-3;
 ground.visible=false;

 restart=createSprite(500,400);
 restart.addImage("reset",restartImage);
 restart.scale=0.2;

 gameOver=createSprite(500,250)
 gameOver.addImage("gameover",gameOverImage)
 gameOver.scale=0.2

 monsterGroup=new Group();
 starGroup=new Group();
}

function draw(){

  background(255)
  
  if(gameState==="PLAY"){
    restart.visible=false;
    gameOver.visible=false;

    score=score + Math.round(getFrameRate() / 60);

    if(keyDown ("SPACE") && mario.y > 350 ){
      mario.addImage("image",marioJumping);
      mario.scale=0.2;
      mario.velocityY=-7;
      mario.setCollider("rectangle",0,0,420,650);
    }
     mario.velocityY=mario.velocityY + 0.8;
  
    if(bg.x < 0){
      bg.x=bg.width/2
    }
  
    if(ground.x < 0){
      ground.x=ground.width/2
    }
    mario.collide(ground)
  
    if(monsterGroup.isTouching(mario)){
      monsterGroup.destroyEach();
      score=score-100;
    }
  
    if(starGroup.isTouching(mario)){
      starGroup.destroyEach();
      score=score+200;
    }
  
    if(score >= 500 && score < 1000){
      bg.changeImage("bg2",background2);
      bg.scale=5;
    }
    else if(score >= 1000 && score < 1500){
      bg.changeImage("bg3",background3);
      bg.scale=1.5;
    }
    else if(score >= 1500 && score < 2000){
    bg.changeImage("bg4",background4);
    bg.scale=1.75
    }
   else if(score >= 0 && score <500){
   bg.changeImage("bg",background1) ;
   bg.scale=1.75
   }
  
    spawnStar();
    spawnMonsters();

    if(score >= 2500  && score < 3000){
      gameState="END";
    }
  }
  else if(gameState==="END"){
    gameOver.visible=true;
    restart.visible=true;
    bg.velocityX=0;
    mario.velocityX=0;
    mario.velocityY=0;
    monsterGroup.setVelocityXEach(0);
    starGroup.setVelocityXEach(0);
  }
  
  if(mousePressedOver(restart)){
     reset();
  }
  
  drawSprites();

  stroke("yellow");
  fill("black")
  textSize(20)
  text("Score: "  +   score, 800,50);
}

function spawnMonsters(){
  if(frameCount % 200===0){
    monster=createSprite(500,560);
    monster.addImage("valley",valleyMonster);
    monster.scale=0.2;
    monster.velocityX=-2;
    monster.y=Math.round(random(350,550))
    monsterGroup.add(monster)
  }
}

function spawnStar(){
  if(frameCount % 350===0){
    star=createSprite(800,560);
    star.addImage("coin",starImage);
    star.scale=0.1;
    star.velocityX=-2;
    star.y=Math.round(random(350,550))
    starGroup.add(star)
  }
}

function reset(){
  gameState="PLAY";
  score=0;
  mario.changeImage("image",marioRunning);
  mario.velocityX=-7;
  monsterGroup.destroyEach();
  starGroup.destroyEach();
}