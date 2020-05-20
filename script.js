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
  gameIsOver = false
}

function draw() {
  background(backgroundColor)
  ellipse(coinX, coinY, 20)
  ellipse(mouseX, mouseY, 20)
  text(`Time remaining: ${time}`, 20, 40)
  handleTime()
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
}

function handleTime() {
  if(time <= 0) {
    gameIsOver = true
    return
  }
  time -= 1
}
