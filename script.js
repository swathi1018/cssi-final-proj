// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, collideRectCircle, keyCode, mouseX, mouseY, line, mouseIsPressed, 
          windowWidth, windowHeight, noStroke, LEFT_ARROW, RIGHT_ARROW, frameCount, keyIsDown, textAlign, CENTER, textStyle BOLD textFont textSize
          noFill, collideRectRect */  

let playerImage, player1, vel, score, newPlatformPosition, space, newPlatform, yMovement,
    p, startGame, stars, starImage, gameOver, platforms, platformCounter;

const numPlatforms = 5, numStars = 50

function preload(){
  playerImage = loadImage("https://cdn.glitch.com/bb52dd36-2050-4746-bc69-96e74a13122e%2Fdoodlejumpthing.png?v=1595870028038")
  starImage = loadImage("https://cdn.glitch.com/bb52dd36-2050-4746-bc69-96e74a13122e%2Fstar.png?v=1595890888658")
}

function setup() {
  createCanvas(400, 600);
  colorMode(HSB, 360, 100, 100);
  background(230,70,50);
  player1 = new Player()
  vel = 2
  platformCounter = 0
  space = height - 50
  score = 0
  stars = []
  platforms = [];
  yMovement = 2
  startGame = false
  //hit = false
  gameOver = false
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  for (let j = 0; j < stars.length; j++) {
    stars[j].draw()
  }
  
 for(let k = 0; k < numPlatforms; k++){   //this for loop makes the code crash idk why
     platforms.push(new Platform(space))
     space -= 90
   }
  
  image(playerImage, 160, 350, 100, 100);
  textStyle(BOLD);
  fill(100);
  textSize(40);
  textFont('Georgia');
  text('Doodle Jump', 65, 300)
  textSize(20);
  text('Press "s" to play.', 120, 330)
}

function draw() {
  
 if(startGame){
   background(230,70,50)
   keyDown()
   
   for (let j = 0; j < stars.length; j++) { stars[j].draw() } //draws stars in background
   
   for(let k = 0; k < platforms.length; k++){
    platforms[k].create()
  }
   
  if (frameCount % 10 == 0){ score++ } //increases score
  
  keyDown()
  displayScore()
   
  player1.draw()
  player1.move()
  //drawPlatforms()
  checkCollision()
  moveScreenUp()
}

  if(gameOver){
  textStyle(BOLD);
  fill(100);
  textSize(40);
  textFont('Georgia');
  text('GAME OVER', 65, 300)
  textSize(20);
  text(`Score: ${score}`, 120, 330)
  }
}


class Player{
  constructor() {
    this.x = 200;
    this.y = 200;
    this.size = 40;
    this.gravity = 0.7
    this.lift = -30
    this.liftMult = 0.9
    this.velocity = 0
  }

  draw() {
    // noStroke();
    image(playerImage, this.x, this.y, this.size, this.size);
    fill(0,100,100)
    noFill()
    rect(this.x+5, this.y + this.size - 3,this.size-20,5)
  }
  
  move(){
    this.velocity += this.gravity
    this.velocity *= 0.9
    this.y += this.velocity
    
    if(this.y + this.size >= height){
      this.y = 0
      this.velocity = 0;
     }
    
    if(this.x < 0){
      this.x = width
    }
    
    if(this.x > width){
      this.x = 0
    }
    
  }
  up(){
    this.velocity += this.lift
    this.velocity *= this.liftMult
    this.y += this.velocity
  }
  }

class Platform {
  constructor(space) {
    this.x = random(0,width-50);
    this.y = space
    this.width = 50;  
    this.height = 5;
    this.speed = 2;
}
  create(){
    fill(255);
    rect(this.x, this.y, this.width, this.height);
    
    if(platformCounter % 5 ==0){
      space = 0
    }
    if (this.y > height){
    platforms.pop()
    newPlatform = new Platform(space)
    platforms.unshift(newPlatform) //unshift adds new elements to the the beginning of an array
    platformCounter+=1
    space -= 80
  }
  }
  
  
}


function checkCollision()
{
  for (let i = 0; i < platforms.length; i++)
  {
    let hit = collideRectRect(player1.x+5, player1.y + player1.size - 3, player1.size-20, 5, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    console.log(hit)                  
    if (hit)
    {
      player1.up() 
    }
  }
}

function keyDown() {
  
  if (keyIsDown(LEFT_ARROW)) {
    player1.x -= 3;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player1.x += 3;
  }
}

function keyPressed() {
  
  if (keyCode === 83) {
    startGame = true
  }
}

function displayScore() {
  fill(0);
  textSize(20);
  text(`Score: ${score}`, 10, 20);
}

function moveScreenUp(){
  if(player1.y < 250){
    yMovement = 4
  }
  else{
    yMovement = 0
  }
  
  for (let i = 0; i < platforms.length; i++)
    {
      platforms[i].y += yMovement;
    }
}

class Star{
  constructor(){
      this.x = random(width)
      this.y = random(height)
      this.size = random(5,10)
  }
  
  draw(){
    noStroke()
    image(starImage, this.x, this.y, this.size, this.size);
  }
  
}

function setUpPlatforms(){
  space = height - 50
  for(let k = 0; k < numPlatforms; k++){   //this for loop makes the code crash idk why
     platforms.push(new Platform(space))
     space -= 90
   }
}
  
