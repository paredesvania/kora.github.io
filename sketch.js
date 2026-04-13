function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function draw() {
  clear();

  noFill();
  stroke(0);

  ellipse(mouseX, mouseY, 80);

  line(mouseX, 0, mouseX, height);
}
