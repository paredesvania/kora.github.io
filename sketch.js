document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");

  const sequences = [
    "kora_lab();",
    "kora();",
    "print(\"<3\");"
  ];

  let i = 0;
  let j = 0;
  let deleting = false;

  function type() {
    const current = sequences[i];

    // ESCRIBIENDO
    if (!deleting) {
      el.textContent = current.substring(0, j + 1);
      j++;

      if (j === current.length) {

        // 👇 SI ES LA ÚLTIMA FRASE, NO BORRAR
        if (i === sequences.length - 1) {
          return; // se queda fijo con cursor
        }

        deleting = true;
        setTimeout(type, 1200);
        return;
      }

      setTimeout(type, 70);

    } 
    // BORRANDO (solo si NO es la última)
    else {
      el.textContent = current.substring(0, j - 1);
      j--;

      if (j === 0) {
        deleting = false;
        i++;
        setTimeout(type, 300);
        return;
      }

      setTimeout(type, 40);
    }
  }

  type();
});

let points = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-2');
}

function draw() {
  background(250); // var(--white)
  
  // Dibujar grid de círculos que reaccionan al mouse
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      let d = dist(mouseX, mouseY, x, y);
      let size = map(d, 0, 300, 15, 2, true);
      fill(d < 100 ? '#ff2aa3' : 200);
      noStroke();
      ellipse(x, y, size, size);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
