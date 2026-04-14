let points = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'fixed');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '0');

  for (let i = 0; i < 80; i++) {
    points.push({
      x: random(width),
      y: random(height),
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5)
    });
  }
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
