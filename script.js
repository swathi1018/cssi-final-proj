// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, collideRectCircle, keyCode, mouseX, mouseY, line, mouseIsPressed, 
          windowWidth, windowHeight, noStroke, LEFT_ARROW, RIGHT_ARROW, frameCount, keyIsDown*/  

let playerImage, player1, vel, score;
let platforms = [];

const numPlatforms = 10;

function setup() {
  // Canvas & color settings
  createCanvas(400, 600);
  colorMode(HSB, 360, 100, 100);
  playerImage = loadImage("https://cdn.glitch.com/bb52dd36-2050-4746-bc69-96e74a13122e%2Fdoodlejumpthing.png?v=1595870028038")
  player1 = new Player()
  vel = 2
  score = 0
  
  for (let i = 0; i < numPlatforms; i++)
    {
      platforms.push(new Platform());
    }  
}

function draw() {
  keyDown();
  background(230,70,80);
  player1.draw()
  player1.update();
  
  if (frameCount % 60 == 0)
    {
      platforms.push(new Platform());
      platforms.push(new Platform());
      platforms.push(new Platform());
    }
  for (let i = 0; i < platforms.length; i++)
    {
      platforms[i].show();
      platforms[i].update();
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
  constructor() {
    this.x = random(width);
    this.y = random(height/4);
    this.width = 50;  
    this.height = 5;
    this.speed = 2;
}
  
  show()
  {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
  
  update()
  {
    this.y += this.speed
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