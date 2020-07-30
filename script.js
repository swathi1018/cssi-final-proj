// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, collideRectCircle, keyCode, mouseX, mouseY, line, mouseIsPressed, getItem, storeItem,
          windowWidth, windowHeight, noStroke, LEFT_ARROW, RIGHT_ARROW, frameCount, keyIsDown, textAlign, CENTER, textStyle BOLD textFont textSize
          noFill, collideRectRect */  

let playerImage, player1, vel, score, newPlatformPosition, space, newPlatform, yMovement,
    p, startGame, stars, starImage, gameOver, platforms, platformCounter, highScore;

const numPlatforms = 1000, numStars = 50

function preload(){
  playerImage = loadImage("https://cdn.glitch.com/bb52dd36-2050-4746-bc69-96e74a13122e%2Fdoodlejumpthing.png?v=1595870028038")
  starImage = loadImage("https://cdn.glitch.com/bb52dd36-2050-4746-bc69-96e74a13122e%2Fstar.png?v=1595890888658")
}

function setup() {
  createCanvas(400, 600);
  colorMode(HSB, 360, 100, 100);
  background(230,70,50);
  vel = 2
  space = height / numPlatforms;
  score = 0
  stars = []
  platforms = [];
  yMovement = 2
  startGame = false
  highScore = getItem('high score')
  gameOver = false
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
  for (let j = 0; j < stars.length; j++) {
    stars[j].draw()
  }
  
 for(let k = 0; k < numPlatforms; k++){   
     platforms.push(new Platform(space))
     space -= 70
   }
  
  player1 = new Player(platforms[0].x, platforms[0].y - 50)
  
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
     
    // setUpPlatforms();
    // drawPlatforms();
       /* for(let l = 0; l < platforms.length; l++){
          if (platforms[l].y > height){
          platforms.pop()
          newPlatform = new Platform((height/platforms.length) + l*space)
          platforms.unshift(newPlatform) //unshift adds new elements to the the beginning of an array
          platformCounter+=1
          }
        }*/
    
  }
    
  keyDown()
  displayScore()
   
  player1.draw()
  player1.move()
  checkCollision()
  moveScreenUp()
   
  
}
  if(player1.y >= height){
    startGame = false
    if(score > highScore){
      highScore = score
      storeItem('high score', highScore);
    }
    gameOverScreen()
  }

}


class Player{
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
  if (keyCode === 82) {
    startGame = true
    setup()
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
    player1.velocity += 0.25
    score+=1 
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
  for(let k = 0; k < numPlatforms; k++){   //this for loop makes the code crash idk why
     platforms.push(new Platform(k * space))
   }
}

function drawPlatforms()
{
  for (let i = 0; i < platforms.length; i++)
    {
      platforms[i].y += yMovement;
      
      if (platforms[i].y > height)
        {
          platforms.pop();
          platforms.unshift(new Platform(0));
        }
    }
}
  
function gameOverScreen(){
  colorMode(HSB, 360, 100, 100);
  background(10,70,50);
  
  image(playerImage, 160, 350, 100, 100);
  textStyle(BOLD);
  fill(100);
  textSize(40);
  textFont('Georgia');
  text('GAME OVER', 66, 300)
  textSize(20);
  text('Press "r" to restart.', 100, 330)
  text(`Score: ${score}`, 155, 470)
  text(`High Score: ${highScore}`, 125, 500)
  
}
