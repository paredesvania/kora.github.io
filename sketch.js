document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");
  if (!el) return;

  const lines = [
    "> initializing system...",
    "> loading modules...",
    "> connecting nodes...",
    "> compiling identity...",
    "> kora_lab();",
    "> deleting suffix...",
    "> kora"
  ];

  let lineIndex = 0;
  let charIndex = 0;

  const typingSpeed = 35;
  const pauseBetweenLines = 600;

  function typeLine() {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    el.innerHTML += currentLine.charAt(charIndex);
    charIndex++;

    if (charIndex < currentLine.length) {
      setTimeout(typeLine, typingSpeed);
    } else {
      el.innerHTML += "<br>";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, pauseBetweenLines);
    }
  }

  // pequeño delay inicial para que se sienta intencional
  setTimeout(typeLine, 500);

});
