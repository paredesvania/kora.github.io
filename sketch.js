document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");
  if (!el) return;

  const sequences = [
    "kora_lab();",
    "kora();",
    "print(\"<3\");"
  ];

  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 1300;

  let seqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let finished = false;

  function loop() {
    const current = sequences[seqIndex];

    // Si ya terminamos todo, dejamos el texto fijo + cursor
    if (finished) {
      el.textContent = current + " |";
      setTimeout(loop, 500);
      return;
    }

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1) + " |";
      charIndex++;

      if (charIndex === current.length) {

        // Si es el último comando, NO borrar
        if (seqIndex === sequences.length - 1) {
          finished = true;
          setTimeout(loop, pauseTime);
          return;
        }

        isDeleting = true;
        setTimeout(loop, pauseTime);
        return;
      }

      setTimeout(loop, typingSpeed);

    } else {
      el.textContent = current.substring(0, charIndex - 1) + " |";
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

  loop();

});
