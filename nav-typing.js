// nav-typing.js — misma animación que el hero, pero en el logo del nav
// Usada en about.html y projects.html
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("nav-typing-text");
  if (!el) return;

  const sequences = ["kora_lab();", "kora();", 'print("<3");'];
  let i = 0, j = 0, deleting = false;

  function type() {
    const current = sequences[i];
    if (!deleting) {
      el.textContent = current.substring(0, j + 1);
      j++;
      if (j === current.length) {
        if (i === sequences.length - 1) return; // última frase: se queda fija
        deleting = true;
        setTimeout(type, 1200);
        return;
      }
      setTimeout(type, 70);
    } else {
      el.textContent = current.substring(0, j - 1);
      j--;
      if (j === 0) { deleting = false; i++; setTimeout(type, 300); return; }
      setTimeout(type, 40);
    }
  }

  setTimeout(type, 200);
});