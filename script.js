// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          strokeWeight, keyCode, line, mouseIsPressed, windowWidth, windowHeight, noStroke */

let brushHue, collideRectCircle, backgroundColor, specialTimeDuration, specialTimeBool, specialCoinBool, specialCoinDuration, coinX1, coinY1, coinX2, coinY2, coinX3, coinY3, coinX4, coinY4, score, time, gameIsOver, hit1, hit2, hit3, hit4;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  backgroundColor = 95;
  coinX1 = random(width);
  coinY1 = random(height);
  coinX2 = random(width);
  coinY2 = random(height);
  coinX3 = random(width);
  coinY3 = random(height);
  coinX4 = random(width);
  coinY4 = random(height);
  time = 1000;
  gameIsOver = false;
  score = 0
  specialCoinDuration = 0
  specialTimeDuration = 0
}

function draw() {
  background(backgroundColor);
  fill(47,74,94)
  ellipse(coinX1, coinY1, 20);
  ellipse(coinX2, coinY2, 20);
  fill(1,74,94)
  ellipse(mouseX, mouseY, 20);
  fill(0,0,0)
  text(`Time remaining: ${time}`, 20, 40);
  text(`Score: ${score}`,20,60)
  handleCollision()
  handleTime()
  if(specialCoinBool && specialCoinDuration > 0){
    specialGreenCoin()
    specialCoinDuration--
  }
  
  if(specialTimeBool && specialTimeDuration > 0){
    specialTimeCoin()
    specialTimeDuration--
  }
  
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  hit1 = collideCircleCircle(mouseX, mouseY, 20, coinX1, coinY1, 20)
  hit2 = collideCircleCircle(mouseX, mouseY, 20, coinX2, coinY2, 20)
  hit3 = collideCircleCircle(mouseX, mouseY, 20, coinX3, coinY3, 20)
  hit4 = collideRectCircle(mouseX, mouseY, 20, 20, coinX4, coinY4, 20)
  
  if(hit1 && !gameIsOver){
    score +=1
    coinX1 = random(width);
    coinY1 = random(height);
  }
  
  if(hit2 && !gameIsOver){
    score +=1
    coinX2 = random(width);
    coinY2 = random(height);
  }
  
  if(hit3 && !gameIsOver){
    score += 10
    coinX3 = random(width);
    coinY3 = random(height);
    specialCoinBool = false
  }
  
  if(hit4 && !gameIsOver){
    time += 100
    coinX4 = random(width);
    coinY4 = random(height);
    specialTimeBool = false
  }
}

function handleTime() {
  // We'll write code to handle the time.
  if(time <=0 || gameIsOver){
    gameIsOver = true
    text('GAME OVER!', width/2 -50, height/2 - 50)
  }
  else if(time%100 == 0){
    time -=1
    coinX3 = random(width);
    coinY3 = random(height);
    specialCoinDuration = 50
    specialCoinBool = true
  }
  
  else if(time%250 == 0){
    time -=1
    coinX4 = random(width);
    coinY4 = random(height);
    specialTimeDuration = 25
    specialTimeBool = true
  }
  else{
    time -=1
  }
}

function keyPressed() {
  if (keyCode === 82) {
    setup()
  }
}

function specialGreenCoin(){
    fill(145,74,94)
    ellipse(coinX3, coinY3, 20);
}

function specialTimeCoin(){
    fill(260,74,94)
    rect(coinX4, coinY4, 20);
}