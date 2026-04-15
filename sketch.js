document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");
  if (!el) return;

  const sequences = [
    "kora_lab();",
    "kora();"
     "kora("<3");"
  ];

  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 1300;

  let seqIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  let finished = false;

  function loop() {
    if (finished) return;

    const current = sequences[seqIndex];

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      // terminó de escribir la palabra actual
      if (charIndex === current.length) {

        // si es la última → congelar
        if (seqIndex === sequences.length - 1) {
          finished = true;
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

  function startCursorBlink() {
    let show = true;

    setInterval(() => {
      el.textContent = sequences[seqIndex] + (show ? "|" : "");
      show = !show;
    }, 500);
  }

  loop();

});
