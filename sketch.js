var trex, trex_running, edges;
var groundImage;
var cloudImage;
var obs1;
var obs2;
var obs3;
var obs4;
var obs5;
var obs6;
var score = 0;
var gamestate = "play"
var gameover, gameoverImage
var restart, restartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png")
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obs1= loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  gameoverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  dieSound = loadSound("die.mp3")
  checkpointSound = loadSound("checkPoint.mp3")
  jumpSound = loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200);
 
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  edges = createEdgeSprites();
  //trex.debug = true
  trex.setCollider("circle",0,0,50 )
  ground = createSprite(200,180, 600, 10)
ground.addImage(groundImage)
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  invisibleground = createSprite(0,190,600,10)
  invisibleground.visible = false
  cloudGroup = new Group()
  obstacleGroup = new Group()
  gameover = createSprite(300,100)
  gameover.addImage(gameoverImage)
  gameover.scale = 0.5
  restart = createSprite(300,140)
   restart.addImage(restartImage)   
  restart.scale = 0.5
  
}


function draw(){
  //set background color 
  background("white");
  
  //logging the y position of the trex
 // console.log(trex.y)
 
  text("Score:"+score,500,50)
  if(gamestate === "play"){
    restart.visible = false
    gameover.visible = false
     score = score+ Math.round(getFrameRate() /60)
     if(score > 0 && score %100 === 0 ){
       checkpointSound.play()
     }                          
 if(ground.x < 0){
    ground.x = ground.width /2        
                  }
   ground.velocityX = -(6 + 3*score/100);  
  //jump when space key is pressed
  if(keyDown("space")){
  jumpSound.play() ; 
    trex.velocityY = -12}
  spawnClouds()
  spawnObstacles()
  trex.velocityY = trex.velocityY + 0.5;  
    if(trex.isTouching(obstacleGroup)){
       gamestate = "end"
      dieSound.play()
  //    trex.velocityY = -10
    //  jumpSound.play()
       }
  } 
  else if (gamestate === "end"){
    restart.visible = true
    gameover.visible = true
ground.velocityX = 0
       cloudGroup.setVelocityXEach(0)
    obstacleGroup.setVelocityXEach(0)
    cloudGroup.setLifetimeEach(-1)
    obstacleGroup.setLifetimeEach(-1)
    trex.changeAnimation("collided",trex_collided)
    if(mousePressedOver(restart)){
    reset()
    }
  }
 
  
  //stop trex from falling down
  trex.collide(invisibleground)
  drawSprites();
}
function reset(){
  gamestate = "play"
  gameover.visible = false
  restart.visible = false
  cloudGroup.destroyEach()
  obstacleGroup.destroyEach()
  score = 0
  trex.changeAnimation("running",trex_running)
}
function spawnObstacles(){
  if(frameCount %100 === 0 ){
    obstacle = createSprite(600, 160, 20, 40)
   obstacle.velocityX = -(4+score/100) 
    
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage(obs1);
        break;
        case 2: obstacle.addImage(obs2);
        break;
        case 3: obstacle.addImage(obs3);
        break;
        case 4: obstacle.addImage(obs4);
        break;
        case 5: obstacle.addImage(obs5);
        break;
        case 6: obstacle.addImage(obs6);
        break;
        default: break;
    }
    obstacle.scale = 0.5
    obstacleGroup.add(obstacle)
    
  }
}
function spawnClouds(){
  if(frameCount %60 === 0 ){
    var rand = Math.round(random(100,60))
    Cloud = createSprite(400, rand, 30, 10)
    Cloud.velocityX = -4
    Cloud.addImage(cloudImage)
    Cloud.scale = 0.5
   
    Cloud.depth = trex.depth
    trex.depth = trex.depth+1
     console.log(trex.depth)
    console.log(Cloud.depth)
    cloudGroup.add(Cloud)
  }
           
}