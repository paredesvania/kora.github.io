document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");

  // ======================
  // CONFIG
  // ======================

  const sequences = [
    "kora_lab();",
    "kora();"
  ];

  const typingSpeed = 90;
  const deletingSpeed = 50;
  const pauseTime = 1200;

  let seqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function loop() {
    const current = sequences[seqIndex];

    if (!isDeleting) {
      // escribiendo
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(loop, pauseTime);
        return;
      }

      setTimeout(loop, typingSpeed);

    } else {
      // borrando
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        seqIndex++;

        if (seqIndex >= sequences.length) {
          // se queda en el último
          seqIndex = sequences.length - 1;
          return;
        }

        setTimeout(loop, 400);
        return;
      }

      setTimeout(loop, deletingSpeed);
    }
  }

  loop();

});
