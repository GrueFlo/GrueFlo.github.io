
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
}

window.addEventListener("resize", function() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});

new p5();
var width = windowWidth;
var height = windowHeight;