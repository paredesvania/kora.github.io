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

  function render(text) {
    el.innerHTML = `${text}<span class="cursor"></span>`;
  }

  function loop() {
    const current = sequences[seqIndex];

    if (finished) {
      render(current);
      setTimeout(loop, 500);
      return;
    }

    if (!isDeleting) {
      const text = current.substring(0, charIndex + 1);
      render(text);
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
      const text = current.substring(0, charIndex - 1);
      render(text);
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
