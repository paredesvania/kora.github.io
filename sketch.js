document.addEventListener("DOMContentLoaded", () => {

  const el = document.getElementById("typing-text");
  if (!el) return;

  const fullText = "kora_lab";
  const finalText = "kora";

  let charIndex = 0;

  const typingSpeed = 100;
  const deletingSpeed = 60;
  const pauseTime = 1200;

  // ESCRIBIR kora_lab
  function typeFull() {
    el.textContent = fullText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex < fullText.length) {
      setTimeout(typeFull, typingSpeed);
    } else {
      setTimeout(deleteToKora, pauseTime);
    }
  }

  // BORRAR hasta "kora"
  function deleteToKora() {
    el.textContent = fullText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex > finalText.length) {
      setTimeout(deleteToKora, deletingSpeed);
    } else {
      // asegura que quede EXACTO "kora"
      el.textContent = finalText;
      // y NO hace nada más → se queda ahí
    }
  }

  typeFull();

});
