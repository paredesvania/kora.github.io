let points = [];

function setup() {
  let canvas = createCanvas(window.innerWidth, 500);
  canvas.parent("p5-container");
  pixelDensity(1);
  initSketch();
}

function draw() {
  clear();
  stroke(0, 40);

  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;

    ellipse(p.x, p.y, 2);

    let d = dist(p.x, p.y, mouseX, mouseY);
    if (d < 120) {
      line(p.x, p.y, mouseX, mouseY);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
