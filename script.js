// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, collideRectCircle, keyCode, mouseX, mouseY, line, mouseIsPressed, 
          windowWidth, windowHeight, noStroke, LEFT_ARROW, RIGHT_ARROW, frameCount, keyIsDown, textAlign, CENTER, textStyle BOLD textFont textSize
          noFill, collideRectRect */  

let playerImage, player1, vel, score, newPlatformPosition, hit, spacing, newPlatform, yMovement, p, startGame, stars, starImage
let platforms = [];

const numPlatforms = 10, numStars = 50

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
  score = 0
  stars = []
  spacing = height / numPlatforms
  yMovement = 2
  startGame = false
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  for (let j = 0; j < stars.length; j++) {
    stars[j].draw()
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
   background(230,70,50);
   for (let j = 0; j < stars.length; j++) {
    stars[j].draw()
  }
  if (frameCount % 10 == 0){
     score++
  }
  
  keyDown();
  displayScore()
  player1.draw()
  player1.update();
  
  
     
  drawPlatforms()
  
  
 /* for (let i = 0; i < platforms.length; i++)
    {
      platforms[i].show();
      platforms[i].update();
    } */
  
 // checkCollision();
}
}


class Player{
  constructor() {
    this.x = 200;
    this.y = 200;
    this.size = 40;
    this.gravity = 0.9
    this.lift = -16
    this.velocity = 0
  }

  draw() {
    noStroke();
    image(playerImage, this.x, this.y, this.size, this.size);
    noFill()
    rect(this.x+5, this.y + this.size - 3,this.size-20,1)
  }
  
  update(){
   /* this.velocity += this.gravity
    this.velocity *= 0.9
    this.y += this.velocity
    
    if(this.y >= height){
      this.y = height - 100
      this.velocity = 0;
     } */
    
    if(this.x < 0){
      this.x = width
    }
    
    if(this.x > width){
      this.x = 0
    }
    
  
  }
  }

class Platform {
  constructor(y) {
    this.x = random(0,width-50);
    this.y = y
    this.width = 50;  
    this.height = 5;
    this.speed = 2;
    fill(255);
    rect(this.x, this.y, this.width, this.height);
}
  
}


function checkCollision()
{
  for (let i = 0; i < platforms.length; i++)
    {
    hit = collideRectRect(player1.x, player1.y , player1.size, player1.size,
                          platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);  
    }
  if (hit)
    {
      player1.y -= 20;
    }
}

function keyDown() {
  
  if (keyIsDown(LEFT_ARROW)) {
    player1.x -= 2;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    player1.x += 2;
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

function setUpPlatforms(){
    for (let i = 0; i < numPlatforms; i++)
    {
      newPlatformPosition = spacing * i
      newPlatform = new Platform(newPlatformPosition)
      platforms.push(newPlatform)
    }  
  }

function drawPlatforms(){
    this.y += yMovement
    fill(255);
    rect(this.x, this.y, this.width, this.height);
 
  if(this.y > height){
    platforms.pop()
    newPlatform = new Platform(0)
    platforms.unshift(newPlatform) //unshift adds new elements to the the beginning of an array
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
  
