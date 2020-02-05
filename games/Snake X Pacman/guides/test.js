//createCanvas(500, 500);
noStroke();

var y2 = 0;
var x2 = 300;

var speed = 0;
//var gravitation = 0;
var beschleunigung = 0;
var win = false;

function mars() {
  background(0, 0, 0);
}
function spaceship() {
  //up
  if (keyIsDown(38)) {

    //flames
    fill(100, 25, 0);
    ellipse(x2 + 15, y2 + 70 + speed, 35);
    fill(100, 25, 0);
    ellipse(x2 + 35, y2 + 70 + speed, 35);
    fill(200, 50, 0);
    ellipse(x2 + 25, y2 + 70 + speed, 45);
    fill(200, 100, 0);
    ellipse(x2 + 25, y2 + 70 + speed, 35);
    fill(210, 150, 0);
    ellipse(x2 + 25, y2 + 70 + speed, 25);
    fill(220, 190, 0);
    ellipse(x2 + 25, y2 + 70 + speed, 20);
    fill(235, 210, 0);
    ellipse(x2 + 25, y2 + 70 + speed, 15);
    fill(255, 255, 0);
    ellipse(x2 + 25, y2 + 70 + speed, 10);
    y2 = y2 - 10;
  } 

  //bodyrocket
  fill(20, 0, 200);
  rect(x2, y2 + speed, 50, 70);
  fill(255, 255, 255);
  ellipse(x2 + 25, y2 + 30 + speed, 35);
  fill(0, 0, 100);
  textSize(30);
  text("M", x2 + 12.5, y2 + 40 + speed, 150);
  fill(0, 0, 100);
  arc(x2 + 25, y2 + speed, 50, 50, PI, 0);
  fill(255, 255, 255);
  triangle(
    x2 + 10,
    y2 + speed - 20,
    x2 + 25,
    y2 + speed - 30,
    x2 + 40,
    y2 + speed - 20
  );
  fill(255, 255, 255);
  ellipse(x2 + 25, y2 + 65 + speed, 55, 10);
  fill(0, 0, 100);
  ellipse(x2 + 25, y2 + 67.5 + speed, 55, 5);
  fill(0, 0, 50);
  ellipse(x2 + 25, y2 + 70 + speed, 55, 5);

}


function keyPressed() {
  //0
  if (keyIsDown(96)) {
    x2 = Math.floor(random(0, 500));
    y2 = 100;
    speed = 0;

    beschleunigung = 0;
  }
  //LEFT
  if (keyIsDown(37)) {
    x2 = x2 - 10;

  }
  //RIGHT
  if (keyIsDown(39)) {
    x2 = x2 + 10;

  }
    //DOWN
    if (keyIsDown(40)) {
        y2 = y2 + 10;

      }
    

  speed -= beschleunigung;
}

console.log("UP - UP");
console.log("LEFT - LEFT");
console.log("RIGHT - RIGHT");
console.log("DOWN - DOWN");
console.log("0 - RESET");

function draw() {
  clear();
  // keyPressed();
  mars();
  spaceship();
  keyPressed();
  if (y2 == 280) {
    wincondition();
  }
  // console.log(x);
}
