// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, collideRectCircle, keyCode, mouseX, mouseY, line, mouseIsPressed, 
          windowWidth, windowHeight, noStroke, LEFT_ARROW, RIGHT_ARROW, frameCount, keyIsDown, textAlign, CENTER, textStyle BOLD textFont textSize
          noFill, collideRectRect */  

let playerImage, player1, vel, score, newPlatformPosition, hit, space, newPlatform, yMovement, 
    p, startGame, stars, starImage, gameOver, platforms;

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
  space = height
  score = 0
  stars = []
  platforms = [];
  yMovement = 2
  startGame = false
  gameOver = false
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  for (let j = 0; j < stars.length; j++) {
    stars[j].draw()
  }
  
 for(let k = 0; k = numPlatforms; k++){   //this for loop makes the code crash idk why
    platforms.push(new Platform(space))
    space -= 20
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
   
   for(let k = 0; k = platforms.length; k++){
    platforms[k].create()
  }
   
  if (frameCount % 10 == 0){ score++ } //increases score
  
  keyDown()
  displayScore()
   
   
  player1.draw()
  //player1.move()
  //drawPlatforms()
  checkCollision()
  //moveScreenUp()
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
    
    if(this.y > height){
    platforms.pop()
    newPlatform = new Platform(0)
    platforms.unshift(newPlatform) //unshift adds new elements to the the beginning of an array
  }
  }
  
  
}


function checkCollision()
{
  for (let i = 0; i < platforms.length; i++)
    {
    hit = collideRectRect(player1.x, player1.y , player1.size, player1.size, platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);  
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

function moveScreenUp(){
  if(player1.y < 250){
    yMovement = 4
  }
  else{
    yMovement = 0
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
  
