var path,maincar;
var player1,player2,player3;
var pathImg,mainDriverImg1,mainDriverImg2;

var blackCarImg,blackCarImg2;
var yellowCarImg,yellowCarImg2
var redCarImg,redCarImg2;
var gameOverImg,carHorn;

var blackCGrp, yellowCGrp,redCGrp; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("road road .png");
  mainDriverImg1 = loadAnimation("purplecar.png");
  mainDriverImg2= loadAnimation("purplecarcrash.png");
  
  blackCarImg= loadAnimation("removebg-preview.png");
  blackCarImg2= loadAnimation("car_damage.png");
  
  yellowCarImg= loadAnimation("yellowcar.png");
  yellowCarImg2= loadAnimation("yellowdamage.png");
  
  redCarImg = loadAnimation("redcar.png");
  redCarImg2 = loadAnimation("reddamage.png");
  
  //carHorn = loadSound("");
  gameOverImg = loadImage("gameover.png");
}

function setup(){
  
createCanvas(1200,500);
// Moving background
path=createSprite(600,200);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
maincar  = createSprite(70,150);
maincar.addAnimation("car1",mainDriverImg1);
maincar.scale=0.2;
  
//set collider for mainDriver
maincar.setCollider("rectangle",0,0,40,40);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
blackCGrp = new Group();
yellowCGrp = new Group();
redCGrp = new Group();
  
edges = createEdgeSprites();
}

function draw() {
  background(0);
  drawSprites();

  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   maincar.y = World.mouseY;
  
   
  // maincar.collide(edges[3]);
  edges=createEdgeSprites();
  maincar.collide(edges);
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/8;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
  carHorn.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      blackDriver();
    } else if (select_oppPlayer == 2) {
      yellowDriver();
    } else {
      redDriver();
    }
  }
  
   if(blackCGrp.isTouching(maincar)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",blackCarImg2);
   }
    
    if(yellowCGrp.isTouching(maincar)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",yellowCarImg2);
    }
    
    if(redCGrp.isTouching(maincar)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",redCarImg2);
    }
  
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    maincar.velocityY = 0;
    maincar.addAnimation("car3",mainDriverImg2);
  
    blackCGrp.setVelocityXEach(0);
    blackCGrp.setLifetimeEach(-1);
  
    yellowCGrp.setVelocityXEach(0);
    yellowCGrp.setLifetimeEach(-1);
  
    redCGrp.setVelocityXEach(0);
    redCGrp.setLifetimeEach(-1);
   
    if(keyDown("UP_ARROW")) {
     reset();
     }
    
}
}
function blackDriver(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.3;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",blackCarImg);
        player1.setLifetime=170;
        blackCGrp.add(player1);
}

function yellowDriver(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.3;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",yellowCarImg);
        player2.setLifetime=170;
        yellowCGrp.add(player2);
}

function redDriver(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.3;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",redCarImg);
        player3.setLifetime=170;
        redCGrp.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCar.changeAnimation("car1",mainDriverImg1);
  
  pinkCGrp.destroyEach();
  yellowCGrp.destroyEach();
  redCGrp.destroyEach();
  
  distance = 0;
 }





