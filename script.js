// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke */

let brushHue, backgroundColor, coinX, coinY, score, time, gameIsOver, hit

function setup() {
  // Canvas & color settings
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100)
  brushHue = 0
  backgroundColor = 95
  coinX = random(width)
  coinY = random(height)
  time = 1000
  score = 0
  gameIsOver = false
}

function draw() {
  background(backgroundColor)
  ellipse(coinX, coinY, 20)
  ellipse(mouseX, mouseY, 20)
  text(`Time remaining: ${time}`, 20, 40)
  text(`Score: ${score}`, 20, 60)
  handleCollision()
  handleTime()
}

function handleCollision() {
  if(gameIsOver) return;
  
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20)
  
  if(hit) {
    coinX = random(width)
    coinY = random(height)
    score += 1
  }
}

function handleTime() {
  if(time <= 0) {
    gameIsOver = true
    text(`Game over`, 165, 200)
    return
  }
  time -= 1
}
