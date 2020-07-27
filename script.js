// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, collideRectCircle, keyCode, mouseX, mouseY, line, mouseIsPressed, windowWidth, windowHeight, noStroke */  

let playerImage

function setup() {
  // Canvas & color settings
  createCanvas(400, 600);
  colorMode(HSB, 360, 100, 100);
  playerImage = loadImage("https://cdn.glitch.com/bb52dd36-2050-4746-bc69-96e74a13122e%2Fdoodlejumpthing.png?v=1595870028038")
  
  
}

function draw() {
  background(230,70,80);
  image(playerImage, 200, 200, 40, 40);
}


class Player{
  
  
  
}

function Platform(){
  
  
}

function keyPressed()
{
  
}