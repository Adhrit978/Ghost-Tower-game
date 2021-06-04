var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  spookySound.loop();

  tower = createSprite(width/2, height/2, 420, height);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(width/2,height-200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play")
   {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 4;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    
    ghost.velocityY = ghost.velocityY + 0.4
    
    if(tower.y > height-200){
      tower.y = height/2
    }
    spawnDoors();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > height){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", width/2, height/2);
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 140 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(550, 900));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 3;
    climber.velocityY = door.velocityY;
    invisibleBlock.velocityY = climber.velocityY;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = height/3;
    climber.lifetime = height/3;
    invisibleBlock.lifetime = height/3;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}