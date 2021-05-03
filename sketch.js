var p1Bow,p2Bow;
var redGrp,blueGrp,greenGrp,purpleGrp,balloon1Grp,balloon2Grp,balloon3Grp,balloon4Grp,balloon5Grp;
var bombGrp, heartGrp;
var p1arrowGrp, p2arrowGrp;
var b1Img, b2Img, b3Img, b4Img, b5Img;
var popSound, start, bombSound, killSound, arrowCollisionSound;
var startImg, edges;
var p1wins, p2wins;
var p1score = 0;
var p2score = 0;
var p1lives = 5;
var p2lives = 5;
var gameState = 0;
var restart, restartImg;

function setup() {
  createCanvas(displayWidth - 50,displayHeight - 110);
  p1Bow = createSprite(40, displayHeight/2, 50, 50);
  p2Bow = createSprite(displayWidth - 80, displayHeight/2, 50, 50);
  start = createSprite(width/2, height/2+20, 50, 50);
  restart = createSprite(width/2, height/2+230, 10, 10);

//  start.addImage(startImg);
  balloon1Grp = new Group();
  balloon2Grp = new Group();
  balloon3Grp = new Group();
  balloon4Grp = new Group();
  balloon5Grp = new Group();
  bombGrp = new Group();
  heartGrp = new Group();
  p1arrowGrp = new Group();
  p2arrowGrp = new Group();
  
  b1Img = loadImage ("red.png");
  b2Img = loadImage ("green.png");
  b3Img = loadImage ("yellow.png");
  b4Img = loadImage ("purple.png");
  b5Img = loadImage ("blue.png");
  bow1 = loadImage ("bow1.png");
  bow2 = loadImage ("bow2.png");
  heartImg = loadImage ("heart.png");
  bombImg = loadImage ("bomb.png");
  startImg = loadImage("start.png");
  p1arrImg = loadImage ("p1arrow.png");
  p2arrImg = loadImage ("p2arrow.png");
  popSound = loadSound ("sounds/pop.mp3");
  bombSound = loadSound ("sounds/bomb.mp3");
  arrowCollisionSound = loadSound ("sounds/arrow_coll.mp3");
  killSound = loadSound ("sounds/kill.mp3");
  p1wins = loadImage("p1wins.png");
  p2wins = loadImage("p2wins.png");
  start.addImage(startImg);
  start.scale = 0.2;
  p1Bow.addImage(bow1);
  p1Bow.scale = 0.1;
  p2Bow.addImage(bow2);
  p2Bow.scale = 0.1;
  restartImg = loadImage("restart.png");
  restart.addImage(restartImg);
restart.scale = 0.25;
}

function draw() {
  background(255,255,255); 
  textSize (18);
  edges = createEdgeSprites();
  p1Bow.collide(edges[2]);
  p1Bow.collide(edges[3]);
  p2Bow.collide(edges[2]);
  p2Bow.collide(edges[3]);

  text("Score: " + p1score, 10, 50); 
  text("Lives: " + p1lives, 10, 80); 
  text("Score: " + p2score, displayWidth-150, 50); 
  text("Lives: " + p2lives, displayWidth-150, 80); 
  textSize (18);
  if (gameState === 0){
    restart.visible = false;
    text("Player 1 moves with 'W' and 'S'; Shoots with 'Space Bar'", width/2-180, height/2-100);
    text("Player 2 moves with 'Up Arrow' and 'Down Arrow'; Shoots with 'Left Arrow'", width/2-250, height/2-80);
    text("To win, score 1000 points before your opponent or deplete your opponent of their lives", width/2- 280, height/2-60 );
    text("Hit balloons to score points, if you hit a bomb you lose a life and if your hit a heart, you gain one", width/2-300, height/2-40);
    text("You will also lose a life if your opponent's arrow hits you", width/2-180, height/2-20);
    if(mousePressedOver(start)){
      start.visible = false;
      gameState = 1;
    }
  }
  else if(gameState === 1){
    restart.visible = false;
    if(keyDown('w')){
      p1Bow.velocityY = -5;
    }
    if(keyDown('s')){
      p1Bow.velocityY = 5;
    }
    if(keyDown(UP_ARROW)){
      p2Bow.velocityY = -5;
    }
    if(keyDown(DOWN_ARROW)){
      p2Bow.velocityY = 5;
    }
    if (frameCount%100===0){
    spawnRedGrp();
    }
    if (frameCount%150===0){
      spawnGreenGrp();
    }
        
    if (frameCount%200===0){
      spawnYellowGrp();
    }
    if (frameCount%220===0){
      spawnPurpleGrp();
    }
    if (frameCount%250===0){
      spawnBlueGrp();
    }  
    if (frameCount%240===0){
      spawnBomb();
    }
    if (frameCount%500===0){
      spawnHeart();
   }
   if(keyWentDown('LEFT_ARROW')){
     if(frameCount%2===0){
     spawnP2Arrow();
     }
   }
   if(keyWentDown('space')){
     if(frameCount%2==0){
    spawnP1Arrow();
     }
  }
   if(p1arrowGrp.isTouching (balloon1Grp)){
     balloon1Grp.destroyEach() ;
     p1arrowGrp.destroyEach() ;
     popSound.play();
     p1score += 25;
   }
   if(p1arrowGrp.isTouching (balloon2Grp)){
    balloon2Grp.destroyEach() ;
    p1arrowGrp.destroyEach() ;
    popSound.play();
    p1score += 40;
  }
  if(p1arrowGrp.isTouching (balloon3Grp)){
    balloon3Grp.destroyEach() ;
    p1arrowGrp.destroyEach() ;
    popSound.play();
    p1score += 70;
  }
  if(p1arrowGrp.isTouching (balloon4Grp)){
    balloon4Grp.destroyEach() ;
    p1arrowGrp.destroyEach() ;
    popSound.play();
    p1score += 100;
  }
  if(p1arrowGrp.isTouching (balloon5Grp)){
    balloon5Grp.destroyEach() ;
    p1arrowGrp.destroyEach() ;
    popSound.play();
    p1score += 150;
  }
  if(p1arrowGrp.isTouching (bombGrp)){
    bombGrp.destroyEach() ;
    p1arrowGrp.destroyEach() ;
    bombSound.play();
    p1lives -= 1;
  }
  if(p1arrowGrp.isTouching (heartGrp)){
    heartGrp.destroyEach() ;
    p1arrowGrp.destroyEach() ;
    p1lives += 1;
  }

  if(p2arrowGrp.isTouching (balloon1Grp)){
    balloon1Grp.destroyEach() ;
    p2arrowGrp.destroyEach() ;
    popSound.play();
    p2score += 25;
  }
  if(p2arrowGrp.isTouching (balloon2Grp)){
   balloon2Grp.destroyEach() ;
   p2arrowGrp.destroyEach() ;
   popSound.play();
   p2score += 40;
 }
 if(p2arrowGrp.isTouching (balloon3Grp)){
   balloon3Grp.destroyEach() ;
   p2arrowGrp.destroyEach() ;
   popSound.play();
   p2score += 70;
 }
 if(p2arrowGrp.isTouching (balloon4Grp)){
   balloon4Grp.destroyEach() ;
   p2arrowGrp.destroyEach() ;
   popSound.play();
   p2score += 100;
 }
 if(p2arrowGrp.isTouching (balloon5Grp)){
   balloon5Grp.destroyEach() ;
   p2arrowGrp.destroyEach() ;
   popSound.play();
   p2score += 150;
 }
 if(p2arrowGrp.isTouching (bombGrp)){
   bombGrp.destroyEach() ;
   p2arrowGrp.destroyEach() ;
   bombSound.play();
   p2lives -= 1;
 }
 if(p2arrowGrp.isTouching (heartGrp)){
   heartGrp.destroyEach() ;
   p2arrowGrp.destroyEach() ;
   p2lives += 1;
 }
 if (p2arrowGrp.isTouching (p1arrowGrp)){
   p2arrowGrp.destroyEach() ;
   p1arrowGrp.destroyEach() ;
   arrowCollisionSound.play();
 }
 if(p1arrowGrp.isTouching (p2Bow)){
   p1arrowGrp.destroyEach() ;
   p2lives -= 1;
   killSound.play();
 }
 if(p2arrowGrp.isTouching (p1Bow)){
   p2arrowGrp.destroyEach() ;
  p1lives -= 1;
  killSound.play();
 }
 if(p1score>=1000||p2lives<=0){
   gameState = 2;
 }
 if(p2score>=1000||p1lives<=0){
  gameState = 3;
}
  }
else if (gameState === 2){
balloon1Grp.destroyEach() ;
balloon2Grp.destroyEach() ;
balloon3Grp.destroyEach() ;
balloon4Grp.destroyEach() ;
balloon5Grp.destroyEach() ;
heartGrp.destroyEach() ;
bombGrp.destroyEach() ;
p1arrowGrp.destroyEach() ;
p2arrowGrp.destroyEach() ;
start.visible = false;
restart.visible = true;
imageMode(CENTER);
  image(p1wins, width/2, height/2-80, width-500, height -200);
p2Bow.visible = false;
}
else if (gameState === 3){
  balloon1Grp.destroyEach() ;
  balloon2Grp.destroyEach() ;
  balloon3Grp.destroyEach() ;
  balloon4Grp.destroyEach() ;
  balloon5Grp.destroyEach() ;
  heartGrp.destroyEach() ;
  bombGrp.destroyEach() ;
  p2arrowGrp.destroyEach() ;
  p1arrowGrp.destroyEach() ;
  start.visible = false;
  restart.visible = true;
  imageMode(CENTER);
  image(p2wins, width/2, height/2- 80, width-500, height -200);
  p1Bow.visible = false;
  }
  drawSprites();
  if(mousePressedOver(restart)){
    p1score = 0;
    p2score = 0;
    p1lives = 5;
    p2lives = 5;
    p1Bow.visible = true;
    p2Bow.visible = true;
    p1Bow.y = height/2;
    p2Bow.y = height/2;
    gameState = 1;

  }
}
function spawnRedGrp(){

  var balloon1 = createSprite(Math.round(random(200, displayWidth-300),0, 10, 10));
  balloon1.velocityY = 10;
  balloon1.lifetime = 150;
  balloon1.addImage (b1Img);  
  balloon1.scale = 0.3;
 balloon1Grp.add(balloon1);
}

function spawnGreenGrp(){

  var balloon1 = createSprite(Math.round(random(200, displayWidth-300),0, 10, 10));
  balloon1.velocityY = 5;
  balloon1.lifetime = 150;
  balloon1.addImage (b2Img);  
  balloon1.scale = 0.3;
 balloon2Grp.add(balloon1);
}
function spawnYellowGrp(){

  var balloon1 = createSprite(Math.round(random(200, displayWidth-300),0, 10, 10));
  balloon1.velocityY = 4;
  balloon1.lifetime = 220;
  balloon1.addImage (b3Img);  
  balloon1.scale = 0.3;
 balloon3Grp.add(balloon1);
}
function spawnPurpleGrp(){

  var balloon1 = createSprite(Math.round(random(200, displayWidth-300),0, 10, 10));
  balloon1.velocityY = 7;
  balloon1.lifetime = 150;
  balloon1.addImage (b4Img);  
  balloon1.scale = 0.3;
 balloon4Grp.add(balloon1);
}
function spawnBlueGrp(){

  var balloon1 = createSprite(Math.round(random(200, displayWidth-300),0, 10, 10));
  balloon1.velocityY = 10;
  balloon1.lifetime = 150;
  balloon1.addImage (b5Img);  
  balloon1.scale = 0.3;
 balloon5Grp.add(balloon1);
}
function spawnHeart(){

  var heart = createSprite(Math.round(random(200, displayWidth-300),0, 10, 10));
  heart.velocityY = 10;
  heart.lifetime = 150;
  heart.addImage (heartImg);  
  heart.scale = 0.3;
 heartGrp.add(heart);
}
function spawnBomb(){
  var bomb = createSprite(Math.round(random(200, displayWidth-300),0, 10, 10));
  bomb.velocityY = 5;
  bomb.lifetime = 150;
  bomb.addImage (bombImg);  
  bomb.scale = 0.1;
 bombGrp.add(bomb);
}
function spawnP1Arrow(){
  var arrow = createSprite(p1Bow.x, p1Bow.y, 10, 10);
arrow.addImage(p1arrImg);
arrow.scale = 0.3;
arrow.velocityX = 7;
arrow.lifetime = width ;
p1Bow.depth = arrow.depth +1;
p1arrowGrp.add(arrow);
}

function spawnP2Arrow(){
  var arrow = createSprite(p2Bow.x, p2Bow.y, 10, 10);
arrow.addImage(p2arrImg);
arrow.scale = 0.3;
arrow.velocityX = -7;
arrow.lifetime = width ;
p2Bow.depth = arrow.depth +1;
p2arrowGrp.add(arrow);
}