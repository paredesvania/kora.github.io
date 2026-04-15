// =======================
// CONFIGURACIÓN
// =======================

// Textos (puedes cambiar fácil aquí)
const text1 = "K O R A   L A B";
const text2 = "Kora.";

// Velocidades (en milisegundos)
const typingSpeed = 100;
const deletingSpeed = 60;

// Pausas
const pauseAfterTyping = 1200;
const pauseAfterDeleting = 500;

// Loop (true = repite, false = se queda en "Kora.")
const loop = true;


// =======================
// LÓGICA
// =======================

const textElement = document.getElementById("typing-text");

let currentText = "";
let index = 0;
let isDeleting = false;
let phase = 0; 
// 0 = escribiendo text1
// 1 = borrando
// 2 = escribiendo text2
// 3 = terminado

function type() {
  let fullText;

  if (phase === 0) fullText = text1;
  else if (phase === 2) fullText = text2;

  if (phase === 0 || phase === 2) {
    // ESCRIBIENDO
    currentText = fullText.substring(0, index + 1);
    textElement.innerHTML = currentText;
    index++;

    if (index === fullText.length) {
      if (phase === 0) {
        phase = 1;
        setTimeout(type, pauseAfterTyping);
      } else {
        phase = 3;
        if (loop) {
          setTimeout(() => {
            phase = 1;
            index = currentText.length;
            type();
          }, pauseAfterTyping);
        }
      }
      return;
    }

    setTimeout(type, typingSpeed);
  }

  else if (phase === 1) {
    // BORRANDO
    currentText = currentText.substring(0, currentText.length - 1);
    textElement.innerHTML = currentText;

    if (currentText.length === 0) {
      if (index > 0) index = 0;

      if (phase === 1 && textElement.innerHTML === "") {
        phase = 2;
        setTimeout(type, pauseAfterDeleting);
        return;
      }
    }

    setTimeout(type, deletingSpeed);
  }
}

// iniciar
type();
