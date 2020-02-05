createCanvas(500, 500);
noStroke();

var y = 0;
var x = 300;

var speed = 0;
var gravitation = 0;
var beschleunigung = 0;
var win = false;

function mars() {
  background(0, 0, 0);
  //stars
  fill(255, 255, 255);
  textSize(5);
  text("*", Math.floor(random(0, 400)), Math.floor(random(0, 400)), 10);
  text("X", Math.floor(random(0, 400)), Math.floor(random(0, 400)), 15);
  text("+", Math.floor(random(0, 400)), Math.floor(random(0, 400)), 20);
  text("#", Math.floor(random(0, 400)), Math.floor(random(0, 400)), 25);

  //earth
  fill(0, 111, 200);
  ellipse(100, 100, 93, 100);
  fill(0, 100, 50);
  ellipse(90, 80, 30, 50);
  ellipse(80, 65, 20, 15);
  ellipse(100, 100, 35, 10);
  ellipse(110, 125, 30, 47);
  ellipse(115, 120, 30, 40);

  //surface
  fill(188, 111, 100);
  ellipse(250, 750, 1500, 1000);

  //crater1
  fill(115, 85, 87);
  ellipse(130, 290, 100, 20);
  ellipse(330, 280, 150, 20);
  ellipse(100, 350, 150, 20);
  ellipse(400, 300, 100, 10);
  ellipse(0, 320, 120, 20);
  ellipse(450, 350, 250, 20);
  ellipse(200, 385, 150, 20);
  ellipse(480, 390, 300, 10);

  //crater2
  fill(140, 88, 90);
  ellipse(130, 290, 80, 10);
  ellipse(330, 280, 130, 10);
  ellipse(100, 350, 130, 10);
  ellipse(400, 300, 80, 5);
  ellipse(0, 320, 110, 10);
  ellipse(450, 350, 220, 10);
  ellipse(200, 385, 110, 10);
  ellipse(480, 390, 280, 5);

  //landingspace
  fill(100, 100, 100);
  rect(190, 300, 70, 60);
  textSize(50);
  fill(255, 255, 255);
  text("X", 207.5, 347.5, 150);

  //controls
  fill(255, 255, 255);
  rect(390, 10, 50, 50);
  fill(0, 0, 0);
  rect(395, 15, 40, 40);
  fill(0, 0, 200);
  rect(400, 20, 30, 30);

  //reset
  fill(255, 255, 255);
  textSize(10);
  text("Reset", 402.5, 27.5, 150);
  textSize(20);
  text("S", 410, 47, 150);
}

function spaceship() {
  //w
  if (keyIsDown(87)) {
    beschleunigung += 0.05;
    //flames
    fill(100, 25, 0);
    ellipse(x + 15, y + 70 + speed, 35);
    fill(100, 25, 0);
    ellipse(x + 35, y + 70 + speed, 35);
    fill(200, 50, 0);
    ellipse(x + 25, y + 70 + speed, 45);
    fill(200, 100, 0);
    ellipse(x + 25, y + 70 + speed, 35);
    fill(210, 150, 0);
    ellipse(x + 25, y + 70 + speed, 25);
    fill(220, 190, 0);
    ellipse(x + 25, y + 70 + speed, 20);
    fill(235, 210, 0);
    ellipse(x + 25, y + 70 + speed, 15);
    fill(255, 255, 0);
    ellipse(x + 25, y + 70 + speed, 10);
  } else {
    gravitation += 0.05;
  }

  //bodyrocket
  fill(20, 0, 200);
  rect(x, y + speed, 50, 70);
  fill(255, 255, 255);
  ellipse(x + 25, y + 30 + speed, 35);
  fill(0, 0, 100);
  textSize(30);
  text("M", x + 12.5, y + 40 + speed, 150);
  fill(0, 0, 100);
  arc(x + 25, y + speed, 50, 50, PI, 0);
  fill(255, 255, 255);
  triangle(
    x + 10,
    y + speed - 20,
    x + 25,
    y + speed - 30,
    x + 40,
    y + speed - 20
  );
  fill(255, 255, 255);
  ellipse(x + 25, y + 65 + speed, 55, 10);
  fill(0, 0, 100);
  ellipse(x + 25, y + 67.5 + speed, 55, 5);
  fill(0, 0, 50);
  ellipse(x + 25, y + 70 + speed, 55, 5);

  //reset
  if (y + speed <= 280) {
    //rect(x, y + speed, 50, 70);
    //ellipse(x + 25, y + 30 + speed, 35);
  } else {
    //x = 100;
    y = 280;
    speed = 0;
    gravitation = 0;
    beschleunigung = 0;
    //fill(100, 0, 0);
    // rect(x, y, 50, 50);
  }
}

function keyPressed() {
  //reset
  if (keyIsDown(83)) {
    x = Math.floor(random(0, 500));
    y = 0;
    speed = 0;
    gravitation = 0;
    beschleunigung = 0;

    console.log("W - UP");
    console.log("A - LEFT");
    console.log("D - RIGHT");
    console.log("S - RESET");
  }
  //a
  if (keyIsDown(65)) {
    x = x - 1;
    gravitation += 0.025;
  }
  //d
  if (keyIsDown(68)) {
    x = x + 1;
    beschleunigung += 0.025;
  }

  speed += gravitation - beschleunigung;
}

function wincondition() {
  if (y >= 250 && y <= 300 && x <= 240 && x >= 160) {
    //console.log("win");
    win = true;
  } else {
    //console.log("loose");
    win = false;
  }
  if (win == true) {
    fill(255, 255, 255);
    rect(170, 65, 130, 50);
    fill(0, 0, 0);
    rect(175, 70, 120, 40);
    fill(0, 0, 200);
    rect(180, 75, 110, 30);
    fill(255, 255, 255);
    text("WIN", 207.5, 100, 150);
  } else if (win == false) {
    fill(255, 255, 255);
    rect(170, 65, 130, 50);
    fill(0, 0, 0);
    rect(175, 70, 120, 40);
    fill(0, 0, 200);
    rect(180, 75, 110, 30);
    fill(255, 255, 255);
    text("LOOSE", 180, 100, 150);
  }
}

console.log("W - UP");
console.log("A - LEFT");
console.log("D - RIGHT");
console.log("S - RESET");

function draw() {
  clear();
  // keyPressed();
  mars();
  spaceship();
  keyPressed();
  if (y == 280) {
    wincondition();
  }
  // console.log(x);
}
