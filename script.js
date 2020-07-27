// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, collideRectCircle, keyCode, mouseX, mouseY, line, mouseIsPressed, 
          windowWidth, windowHeight, noStroke, LEFT_ARROW, RIGHT_ARROW */  

let playerImage, player1

function setup() {
  // Canvas & color settings
  createCanvas(400, 600);
  colorMode(HSB, 360, 100, 100);
  playerImage = loadImage("https://cdn.glitch.com/bb52dd36-2050-4746-bc69-96e74a13122e%2Fdoodlejumpthing.png?v=1595870028038")
  player1 = new Player()
  
}

function draw() {
  background(230,70,80);
  player1.draw()
  player1.update();
}


class Player{
  constructor() {
    this.x = 200;
    this.y = 500;
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
    this.velocity += this.gravity
    this.velocity *= 0.9
    this.y += this.velocity
    
    if(this.y >= height){
      this.x = 0;
      this.y = 0;
      this.y = height - 101
    this.velocity = 0;
  }
  
  }
  }

function Platform(){
  
  
}

function keyPressed()
{
  if (keyCode === LEFT_ARROW)
    {
      player1.x -= 20;
    }
  else if (keyCode === RIGHT_ARROW)
    {
      player1.x += 20;
    }
}