let canvas;

function setup() {
  const container = document.getElementById('canvas-container');
  canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent(container);
}

function draw() {
  clear();

  stroke(0);
  noFill();

  ellipse(mouseX, mouseY, 60);

  line(mouseX, 0, mouseX, height);
  line(0, mouseY, width, mouseY);
}

function windowResized() {
  const container = document.getElementById('canvas-container');
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}
