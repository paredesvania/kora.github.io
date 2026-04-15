document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");
  if (!el) return;

  const sequences = [
    "kora_lab();",
    "kora();"
  ];

  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 1300;

  let seqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function loop() {
    const current = sequences[seqIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      // TERMINA DE ESCRIBIR
      if (charIndex === current.length) {

        // SI ES EL ÚLTIMO TEXTO → NO BORRAR
        if (seqIndex === sequences.length - 1) {
          startCursorBlink();
          return;
        }

        isDeleting = true;
        setTimeout(loop, pauseTime);
        return;
      }

      setTimeout(loop, typingSpeed);

    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        seqIndex++;
        setTimeout(loop, 400);
        return;
      }

      setTimeout(loop, deletingSpeed);
    }
  }

  // Cursor parpadeante tipo terminal
  function startCursorBlink() {
    let showCursor = true;

    setInterval(() => {
      el.textContent = sequences[seqIndex] + (showCursor ? "|" : "");
      showCursor = !showCursor;
    }, 500);
  }

  loop();

});
