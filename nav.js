// nav.js — dark mode toggle
(function () {
  // Aplicar tema guardado
  const saved = localStorage.getItem("kora-theme");
  if (saved === "dark") document.body.classList.add("dark");

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".dark-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("kora-theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  });
})();