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


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
