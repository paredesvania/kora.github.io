// cursor.js — bola rosada, solo en desktop
if (window.matchMedia("(pointer: fine)").matches) {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
  });

  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.style.transform = "translate(-50%, -50%) scale(1.8)");
    el.addEventListener("mouseleave", () => cursor.style.transform = "translate(-50%, -50%) scale(1)");
  });
}