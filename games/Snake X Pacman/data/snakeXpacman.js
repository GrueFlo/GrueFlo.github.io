//createCanvas(500, 500);
//noStroke();

//disable scroll with arrows
window.addEventListener(
  "keydown",
  function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

var mySound;
var s1 = 0;
var s2 = 0;
var x1 = 300;
var y1 = 275;

var x2 = 500;
var y2 = 275;

var x3 = 400;
var y3 = 375;

var x4 = 400;
var y4 = 175;

var x5 = 400;
var y5 = 375;

var x6 = 400;
var y6 = 175;

var xkey = 400;
var ykey = 275;
var key = false;
var level = 1;

var snake1 = [];
var snake2 = [];
var laenge1 = 0;
var laenge2 = 0;

var random = 0;

var food = [];

var fruitsX = 400;
var fruitsY = 275;

var fruitcounter2 = 0;
var fruitcounter1 = 0;

var speed = 0;
//var gravitation = 0;
//var beschleunigung = 0;

var win = false;
var start = true;
var end = false;

var leveltimer = 250;
var timer = 0 + leveltimer;

var direction1 = 0;
var direction2 = 0;

/*
function preload() {
  mySound = loadSound("../assets/LeagueofLegends-ArcadeTheme.mp3");
}
*/

function starten() {
  if (start == true) {
    background(0, 0, 0);
    fill(255, 132, 0);
    rect(275, 175, 300, 200);
    fill(65, 0, 255);
    rect(280, 180, 290, 190);
    fill(0, 0, 0);
    rect(285, 185, 280, 180);
    fill(255, 255, 255);
    textFont("Impact");
    textSize(27);
    fill(65, 0, 255);
    text("Press ENTER to Play!", 315, 265, 300);

    fill(255, 132, 0);
    text("Level: " + level, 380, 300, 300);
    if (keyIsDown(13)) {
      x1 = 300;
      y1 = 275;

      x2 = 500;
      y2 = 275;

      x3 = 400;
      y3 = 375;

      x4 = 400;
      y4 = 175;

      x5 = 400;
      y5 = 375;

      x6 = 400;
      y6 = 175;

      fruitsX = 400;
      fruitsY = 275;

      direction1 = 0;
      direction2 = 0;

      speed = 0;

      start = false;
    }
  }
}

function mars() {
  if (start == false) {
    background(0, 0, 0);

    //arena

    //outland
    stroke(35, 0, 165);
    strokeWeight(5);

    fill(0, 0, 0);
    rect(200, 75, 400, 400);
    noStroke();
    rect(150, 200, 500, 150);
    rect(325, 25, 150, 500);

    // fill(0,255,0);
    //  rect(200,475,100,5);

    //inland
    fill(65, 0, 255);
    rect(350, 225, 15, 15);
    rect(435, 225, 15, 15);

    rect(350, 310, 15, 15);
    rect(435, 310, 15, 15);
  }
}

function hunger() {
  if (start == false) {
    fill(255, 132, 0);
    textSize(25);
    text(timer, 75, 90, 150);

    timer = timer - 1;
  }
}

function collision() {
  //snake2 in back of 1
  for (var i = 0; i < snake1.length; i++) {
    if (
      snake1[i][0] < x2 + 35 &&
      snake1[i][1] < y2 + 35 &&
      snake1[i][0] > x2 - 35 &&
      snake1[i][1] > y2 - 35
    ) {
      end = true;
    }
  }

  //snake1 in back of 2
  for (var i = 0; i < snake2.length; i++) {
    if (
      snake2[i][0] < x1 + 35 &&
      snake2[i][1] < y1 + 35 &&
      snake2[i][0] > x1 - 35 &&
      snake2[i][1] > y1 - 35
    ) {
      end = true;
    }
  }

  if (start == false) {
    //Player Collision
    if (x1 < x2 + 35 && y1 < y2 + 35 && x1 > x2 - 35 && y1 > y2 - 35) {
      end = true;
    }

    if (x2 > x1 + 35 && y2 > y1 + 35 && x2 < x1 + 35 && y2 < y1 + 35) {
      end = true;
    }

    //Walls P1

    //inland
    if (x1 + 35 > 365 && y1 + 35 > 240 && x1 - 35 < 350 && y1 - 35 < 225) {
      end = true;
    }

    if (x1 + 35 > 450 && y1 + 35 > 240 && x1 - 35 < 435 && y1 - 35 < 225) {
      end = true;
    }

    if (x1 + 35 > 365 && y1 + 35 > 325 && x1 - 35 < 350 && y1 - 35 < 310) {
      end = true;
    }

    if (x1 + 35 > 450 && y1 + 35 > 325 && x1 - 35 < 435 && y1 - 35 < 310) {
      end = true;
    }

    //outland
    //horizontal
    if (x1 + 30 > 200 && y1 + 30 > 75 && x1 - 30 < 320 && y1 - 30 < 75) {
      end = true;
    }

    if (x1 + 30 > 470 && y1 + 30 > 75 && x1 - 30 < 590 && y1 - 30 < 75) {
      end = true;
    }

    if (x1 + 30 > 200 && y1 + 30 > 475 && x1 - 30 < 320 && y1 - 30 < 475) {
      end = true;
    }

    if (x1 + 30 > 470 && y1 + 30 > 475 && x1 - 30 < 590 && y1 - 30 < 475) {
      end = true;
    }

    //vertical
    if (x1 + 30 > 200 && y1 + 30 > 75 && x1 - 30 < 200 && y1 - 30 < 200) {
      end = true;
    }

    if (x1 + 30 > 200 && y1 + 30 > 345 && x1 - 30 < 200 && y1 - 30 < 475) {
      end = true;
    }

    if (x1 + 30 > 600 && y1 + 30 > 75 && x1 - 30 < 600 && y1 - 30 < 200) {
      end = true;
    }

    if (x1 + 30 > 600 && y1 + 30 > 345 && x1 - 30 < 600 && y1 - 30 < 475) {
      end = true;
    }

    //Walls P2

    //inland
    if (x2 + 35 > 365 && y2 + 35 > 240 && x2 - 35 < 350 && y2 - 35 < 225) {
      end = true;
    }

    if (x2 + 35 > 450 && y2 + 35 > 240 && x2 - 35 < 435 && y2 - 35 < 225) {
      end = true;
    }

    if (x2 + 35 > 365 && y2 + 35 > 325 && x2 - 35 < 350 && y2 - 35 < 310) {
      end = true;
    }

    if (x2 + 35 > 450 && y2 + 35 > 325 && x2 - 35 < 435 && y2 - 35 < 310) {
      end = true;
    }

    //outland
    //horizontal
    if (x2 + 30 > 200 && y2 + 30 > 75 && x2 - 30 < 320 && y2 - 30 < 75) {
      end = true;
    }

    if (x2 + 30 > 470 && y2 + 30 > 75 && x2 - 30 < 590 && y2 - 30 < 75) {
      end = true;
    }

    if (x2 + 30 > 200 && y2 + 30 > 475 && x2 - 30 < 320 && y2 - 30 < 475) {
      end = true;
    }

    if (x2 + 30 > 470 && y2 + 30 > 475 && x2 - 30 < 590 && y2 - 30 < 475) {
      end = true;
    }

    //vertical
    if (x2 + 30 > 200 && y2 + 30 > 75 && x2 - 30 < 200 && y2 - 30 < 200) {
      end = true;
    }

    if (x2 + 30 > 200 && y2 + 30 > 345 && x2 - 30 < 200 && y2 - 30 < 475) {
      end = true;
    }

    if (x2 + 30 > 600 && y2 + 30 > 75 && x2 - 30 < 600 && y2 - 30 < 200) {
      end = true;
    }

    if (x2 + 30 > 600 && y2 + 30 > 345 && x2 - 30 < 600 && y2 - 30 < 475) {
      end = true;
    }

    //fruits
    //1
    if (
      fruitsX < x1 + 50 &&
      fruitsY < y1 + 50 &&
      fruitsX > x1 - 50 &&
      fruitsY > y1 - 50
    ) {
      fruitsX = Math.floor(Math.random() * 425) + 75;
      fruitsY = Math.floor(Math.random() * 425) + 75;
      laenge1++;
      timer = timer + 75;
      fruitcounter1 = fruitcounter1 + 1;
    }
    //2
    if (
      fruitsX < x2 + 50 &&
      fruitsY < y2 + 50 &&
      fruitsX > x2 - 50 &&
      fruitsY > y2 - 50
    ) {
      fruitsX = Math.floor(Math.random() * 425) + 75;
      fruitsY = Math.floor(Math.random() * 425) + 75;
      laenge2++;
      timer = timer + 75;
      fruitcounter2 = fruitcounter2 + 1;
    }

    if (level == 2) {
      //Ghosts
      //ghost1 - p1
      if (x3 < x1 + 40 && y3 < y1 + 40 && x3 > x1 - 40 && y3 > y1 - 40) {
        end = true;
      }

      //ghost1 - p2
      if (x3 < x2 + 40 && y3 < y2 + 40 && x3 > x2 - 40 && y3 > y2 - 40) {
        end = true;
      }
    }

    if (level == 3) {
      //Ghosts
      //ghost1 - p1
      if (x3 < x1 + 40 && y3 < y1 + 40 && x3 > x1 - 40 && y3 > y1 - 40) {
        end = true;
      }

      //ghost1 - p2
      if (x3 < x2 + 40 && y3 < y2 + 40 && x3 > x2 - 40 && y3 > y2 - 40) {
        end = true;
      }

      //ghost2 - p1
      if (x4 < x1 + 40 && y4 < y1 + 40 && x4 > x1 - 40 && y4 > y1 - 40) {
        end = true;
      }

      //ghost2 - p2
      if (x4 < x2 + 40 && y4 < y2 + 40 && x4 > x2 - 40 && y4 > y2 - 40) {
        end = true;
      }
    }

    if (level == 4) {
      //Ghosts
      //ghost1 - p1
      if (x3 < x1 + 40 && y3 < y1 + 40 && x3 > x1 - 40 && y3 > y1 - 40) {
        end = true;
      }

      //ghost1 - p2
      if (x3 < x2 + 40 && y3 < y2 + 40 && x3 > x2 - 40 && y3 > y2 - 40) {
        end = true;
      }

      //ghost2 - p1
      if (x4 < x1 + 40 && y4 < y1 + 40 && x4 > x1 - 40 && y4 > y1 - 40) {
        end = true;
      }

      //ghost2 - p2
      if (x4 < x2 + 40 && y4 < y2 + 40 && x4 > x2 - 40 && y4 > y2 - 40) {
        end = true;
      }

      //ghost3 - p1
      if (x5 < x1 + 40 && y5 < y1 + 40 && x5 > x1 - 40 && y5 > y1 - 40) {
        end = true;
      }

      //ghost3 - p2
      if (x5 < x2 + 40 && y5 < y2 + 40 && x5 > x2 - 40 && y5 > y2 - 40) {
        end = true;
      }
    }

    if (level == 5) {
      //Ghosts

      //ghost1 - p1
      if (x3 < x1 + 40 && y3 < y1 + 40 && x3 > x1 - 40 && y3 > y1 - 40) {
        end = true;
      }

      //ghost1 - p2
      if (x3 < x2 + 40 && y3 < y2 + 40 && x3 > x2 - 40 && y3 > y2 - 40) {
        end = true;
      }

      //ghost2 - p1
      if (x4 < x1 + 40 && y4 < y1 + 40 && x4 > x1 - 40 && y4 > y1 - 40) {
        end = true;
      }

      //ghost2 - p2
      if (x4 < x2 + 40 && y4 < y2 + 40 && x4 > x2 - 40 && y4 > y2 - 40) {
        end = true;
      }

      //ghost3 - p1
      if (x5 < x1 + 40 && y5 < y1 + 40 && x5 > x1 - 40 && y5 > y1 - 40) {
        end = true;
      }

      //ghost3 - p2
      if (x5 < x2 + 40 && y5 < y2 + 40 && x5 > x2 - 40 && y5 > y2 - 40) {
        end = true;
      }

      //ghost4 - p1
      if (x6 < x1 + 40 && y6 < y1 + 40 && x6 > x1 - 40 && y6 > y1 - 40) {
        end = true;
      }

      //ghost4 - p2
      if (x6 < x2 + 40 && y6 < y2 + 40 && x6 > x2 - 40 && y6 > y2 - 40) {
        end = true;
      }
    }
  }
}

function levels() {
  if (start == false) {
    if (timer >= leveltimer + 250) {
      key = true;
    }

    if (key == true) {
      fill(0, 255, 0);
      ellipse(xkey, ykey, 50, 50);
      if (
        (xkey < x1 + 50 &&
          ykey < y1 + 50 &&
          xkey > x1 - 50 &&
          ykey > y1 - 50) ||
        (xkey < x2 + 50 && ykey < y2 + 50 && xkey > x2 - 50 && ykey > y2 - 50)
      ) {
        level++;
        key = false;
        start = true;
      }
    }
    if (level == 2) {
      leveltimer = 400;

      //Ghost 1

      fill(65, 0, 255);
      ellipse(x3, y3, 50);
      fill(0, 0, 0);
      textSize(25);
      text("3", x3 - 7.5, y3 + 10, 50);

      x3 = x3 - (Math.floor(Math.random() * 3) + 5);
    }

    if (level == 3) {
      leveltimer = 600;
      //Ghost 1

      fill(65, 0, 255);
      ellipse(x3, y3, 50);
      fill(0, 0, 0);
      textSize(25);
      text("3", x3 - 7.5, y3 + 10, 50);

      x3 = x3 - (Math.floor(Math.random() * 3) + 5);

      //Ghost 2

      fill(65, 0, 255);
      ellipse(x4, y4, 50);
      fill(0, 0, 0);
      textSize(25);
      text("4", x4 - 7.5, y4 + 10, 50);

      y4 = y4 + (Math.floor(Math.random() * 3) + 5);
    }

    if (level == 4) {
      leveltimer = 800;
      //Ghost 1

      fill(65, 0, 255);
      ellipse(x3, y3, 50);
      fill(0, 0, 0);
      textSize(25);
      text("3", x3 - 7.5, y3 + 10, 50);

      x3 = x3 - (Math.floor(Math.random() * 3) + 5);

      //Ghost 2

      fill(65, 0, 255);
      ellipse(x4, y4, 50);
      fill(0, 0, 0);
      textSize(25);
      text("4", x4 - 7.5, y4 + 10, 50);

      y4 = y4 + (Math.floor(Math.random() * 3) + 5);

      //Ghost 3

      fill(65, 0, 255);
      ellipse(x5, y5, 50);
      fill(0, 0, 0);
      textSize(25);
      text("5", x5 - 7.5, y5 + 10, 50);

      x5 = x5 + (Math.floor(Math.random() * 3) + 5);
      y5 = y5 + (Math.floor(Math.random() * 3) + 5);
    }

    if (level == 5) {
      leveltimer = 1000;
      //Ghost 1

      fill(65, 0, 255);
      ellipse(x3, y3, 50);
      fill(0, 0, 0);
      textSize(25);
      text("3", x3 - 7.5, y3 + 10, 50);

      x3 = x3 - (Math.floor(Math.random() * 3) + 5);

      //Ghost 2

      fill(65, 0, 255);
      ellipse(x4, y4, 50);
      fill(0, 0, 0);
      textSize(25);
      text("4", x4 - 7.5, y4 + 10, 50);

      y4 = y4 + (Math.floor(Math.random() * 3) + 5);

      //Ghost 3

      fill(65, 0, 255);
      ellipse(x5, y5, 50);
      fill(0, 0, 0);
      textSize(25);
      text("5", x5 - 7.5, y5 + 10, 50);

      x5 = x5 + (Math.floor(Math.random() * 3) + 5);
      y5 = y5 + (Math.floor(Math.random() * 3) + 5);

      //Ghost 4

      fill(65, 0, 255);
      ellipse(x6, y6, 50);
      fill(0, 0, 0);
      textSize(25);
      text("6", x6 - 7.5, y6 + 10, 50);

      x6 = x6 - (Math.floor(Math.random() * 3) + 5);
      y6 = y6 - (Math.floor(Math.random() * 3) + 5);
    }
  }
}

function spaceship() {
  if (start == false) {
    //SNAKE 1

    for (var i = 0; i < snake1.length; i++) {
      fill(255, 132, 0);
      ellipse(snake1[i][0], snake1[i][1] + speed, 50);
    }
    fill(255, 132, 0);
    ellipse(x1, y1, 50);
    fill(0, 0, 0);
    textSize(25);
    text("1", x1 - 7.5, y1 + 10 + speed, 50);

    //SNAKE 2

    for (var j = 0; j < snake2.length; j++) {
      fill(255, 132, 0);
      ellipse(snake2[j][0], snake2[j][1] + speed, 50);
    }
    fill(255, 132, 0);
    ellipse(x2, y2, 50);
    fill(0, 0, 0);
    textSize(25);
    text("2", x2 - 7.5, y2 + 10 + speed, 50);
  }
}

function movementSpaceship() {
  if (start == false) {
    snake1.push([x1, y1]);
    if (snake1.length > laenge1) {
      snake1.shift();
    }

    snake2.push([x2, y2]);
    if (snake2.length > laenge2) {
      snake2.shift();
    }
  }
}

function fruits() {
  if (start == false) {
    for (var m = 0; m < food.length; m++) {
      fill(255, 0, 0);
      ellipse(food[m][0], food[m][1], 50);
    }
  }
}

function positionFood() {
  if (start == false) {
    food.pop([fruitsX, fruitsY]);
    food.push([fruitsX, fruitsY]);
  }
}

function steuerung() {
  if (start == false) {
    //w
    if (keyIsDown(87) && direction1 !== 4) {
      direction1 = 1;
    }

    //a
    if (keyIsDown(65) && direction1 !== 3) {
      direction1 = 2;
      // gravitation += 0.025;
    }
    //d
    if (keyIsDown(68) && direction1 !== 2) {
      direction1 = 3;
      //beschleunigung += 0.025;
    }
    //s
    if (keyIsDown(83) && direction1 !== 1) {
      direction1 = 4;
      //  beschleunigung -= 0.025;
    }
    //s+a
    if (keyIsDown(83) && keyIsDown(65) && direction1 !== 7) {
      direction1 = 5;
      //  beschleunigung -= 0.025;
    }
    //d+s
    if (keyIsDown(83) && keyIsDown(68) && direction1 !== 8) {
      direction1 = 6;
      //  beschleunigung -= 0.025;
    }
    //w+d
    if (keyIsDown(87) && keyIsDown(68) && direction1 !== 5) {
      direction1 = 7;
      //  beschleunigung -= 0.025;
    }
    //w+a
    if (keyIsDown(87) && keyIsDown(65) && direction1 !== 6) {
      direction1 = 8;
      //  beschleunigung -= 0.025;
    }

    //speed -= beschleunigung;

    //UP
    if (keyIsDown(38) && direction2 !== 4) {
      direction2 = 1;
    }

    //LEFT
    if (keyIsDown(37) && direction2 !== 3) {
      direction2 = 2;
    }
    //RIGHT
    if (keyIsDown(39) && direction2 !== 2) {
      direction2 = 3;
    }
    //DOWN
    if (keyIsDown(40) && direction2 !== 1) {
      direction2 = 4;
    }

    //DOWN+LEFT
    if (keyIsDown(40) && keyIsDown(37) && direction2 !== 7) {
      direction2 = 5;
      //  beschleunigung -= 0.025;
    }
    //RIGHt+DOWN
    if (keyIsDown(40) && keyIsDown(39) && direction2 !== 8) {
      direction2 = 6;
      //  beschleunigung -= 0.025;
    }
    //UP+RIGHT
    if (keyIsDown(38) && keyIsDown(39) && direction2 !== 5) {
      direction2 = 7;
      //  beschleunigung -= 0.025;
    }
    //UP+LEFT
    if (keyIsDown(38) && keyIsDown(37) && direction2 !== 6) {
      direction2 = 8;
      //  beschleunigung -= 0.025;
    }
    //speed -= beschleunigung;
  }
}

function wincondition() {
  if (timer == 0) {
    timer = 0;
    end = true;
  }
  //loose

  if (end == true) {
    start = true;
    background(0, 0, 0);
    fill(255, 132, 0);
    rect(275, 175, 300, 200);
    fill(65, 0, 255);
    rect(280, 180, 290, 190);
    fill(0, 0, 0);
    rect(285, 185, 280, 180);
    fill(255, 255, 255);
    textFont("Impact");
    textSize(27);

    fill(65, 0, 255);
    text("GAME OVER!", 360, 230, 300);

    text("Reset: BACKSPACE", 325, 260, 300);
    fill(255, 132, 0);

    text("P1: " + fruitcounter1, 325, 325, 300);

    text("P2: " + fruitcounter2, 475, 325, 300);

    text("Level: " + level, 380, 300, 300);
  }

  //win
  if (level == 6) {
    start = true;
    background(0, 0, 0);
    fill(255, 132, 0);
    rect(275, 175, 300, 200);
    fill(65, 0, 255);
    rect(280, 180, 290, 190);
    fill(0, 0, 0);
    rect(285, 185, 280, 180);
    fill(255, 255, 255);
    textFont("Impact");
    textSize(27);

    fill(65, 0, 255);
    text("YOU WON THE GAME!", 355, 230, 300);

    text("Reset: BACKSPACE", 325, 260, 300);
    fill(255, 132, 0);

    text("P1: " + fruitcounter1, 325, 325, 300);

    text("P2: " + fruitcounter2, 475, 325, 300);

    text("Level: " + level, 380, 300, 300);
  }

  if (keyIsDown(8)) {
    /*
    start = true;
    end = false;
    direction = false;
timer = 0+leveltimer;

    var x1 = 300;
    var y1 = 275;
    
    var x2 = 500;
    var y2 = 275;
    
    var x3 = 400;
    var y3 = 375;
    
    var x4 = 400;
    var y4 = 175;
    
    var x5 = 400;
    var y5 = 375;
    
    var x6 = 400;
    var y6 = 175;
    
    for (var j = 0; j < snake1.length && j < snake2.length; j++) {
      snake1.pop([x1, y1]);
      snake2.pop([x2, y2]);
    }
    */

    location.reload();
  }
}

function border() {
  //randreset P1
  if (x1 < 0) {
    x1 = 800;
  }

  if (y1 < 0) {
    y1 = 600;
  }

  if (x1 > 800) {
    x1 = 0;
  }

  if (y1 > 600) {
    y1 = 0;
  }

  //randreset P2
  if (x2 < 0) {
    x2 = 800;
  }

  if (y2 < 0) {
    y2 = 600;
  }

  if (x2 > 800) {
    x2 = 0;
  }

  if (y2 > 600) {
    y2 = 0;
  }

  //randreset G1
  if (x3 < 0) {
    x3 = 800;
  }

  if (y3 < 0) {
    y3 = 600;
  }

  if (x3 > 800) {
    x3 = 0;
  }

  if (y3 > 600) {
    y3 = 0;
  }

  //randreset G2
  if (x4 < 0) {
    x4 = 800;
  }

  if (y4 < 0) {
    y4 = 600;
  }

  if (x4 > 800) {
    x4 = 0;
  }

  if (y4 > 600) {
    y4 = 0;
  }

  //randreset G3
  if (x5 < 0) {
    x5 = 800;
  }

  if (y5 < 0) {
    y5 = 600;
  }

  if (x5 > 800) {
    x5 = 0;
  }

  if (y5 > 600) {
    y5 = 0;
  }

  //randreset G4
  if (x6 < 0) {
    x6 = 800;
  }

  if (y6 < 0) {
    y6 = 600;
  }

  if (x6 > 800) {
    x6 = 0;
  }

  if (y6 > 600) {
    y6 = 0;
  }
}

console.log("W - UP");
console.log("A - LEFT");
console.log("D - RIGHT");
console.log("S - DOWN");
console.log("_____________");
console.log("UP - UP");
console.log("LEFT - LEFT");
console.log("RIGHT - RIGHT");
console.log("DOWN - DOWN");

function draw() {
  clear();
  starten();
  mars();
  hunger();
  positionFood();
  collision();
  levels();
  fruits();
  spaceship();
  movementSpaceship();
  border();
  steuerung();
  wincondition();
  frameRate(15);

  //steuerung1
  //w
  if (direction1 == 1) {
    y1 = y1 - 10;
  }
  //a
  if (direction1 == 2) {
    x1 = x1 - 10;
  }
  //d
  if (direction1 == 3) {
    x1 = x1 + 10;
  }
  //s
  if (direction1 == 4) {
    y1 = y1 + 10;
  }
  //a+s
  if (direction1 == 5) {
    x1 = x1 - 10;
    y1 = y1 + 10;
  }
  //d+s
  if (direction1 == 6) {
    x1 = x1 + 10;
    y1 = y1 + 10;
  }
  //w+d
  if (direction1 == 7) {
    x1 = x1 + 10;
    y1 = y1 - 10;
  }
  //w+a
  if (direction1 == 8) {
    x1 = x1 - 10;
    y1 = y1 - 10;
  }

  //steuerung2
  if (direction2 == 1) {
    y2 = y2 - 10;
  }

  if (direction2 == 2) {
    x2 = x2 - 10;
  }

  if (direction2 == 3) {
    x2 = x2 + 10;
  }

  if (direction2 == 4) {
    y2 = y2 + 10;
  }

  //LEFT+DOWN
  if (direction2 == 5) {
    x2 = x2 - 10;
    y2 = y2 + 10;
  }
  //RIGHT+DOWN
  if (direction2 == 6) {
    x2 = x2 + 10;
    y2 = y2 + 10;
  }
  //UP+LEFT
  if (direction2 == 7) {
    x2 = x2 + 10;
    y2 = y2 - 10;
  }
  //UP+RIGHT
  if (direction2 == 8) {
    x2 = x2 - 10;
    y2 = y2 - 10;
  }

  //console.log(direction1);
  //console.log(x1);
  //console.log(y1);
}
