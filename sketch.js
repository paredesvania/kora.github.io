document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");
  if (!el) return;

  const sequences = [
    "kora_lab();",
    "kora();",
    "print(\"<3\");"
  ];

  let seqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let finished = false;

  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 1300;

  function loop() {
    const current = sequences[seqIndex];

    if (finished) {
      el.textContent = current; // <- sin cursor aquí
      setTimeout(loop, 500);
      return;
    }

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {

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
      el.textContent = current.slice(0, charIndex - 1);
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
