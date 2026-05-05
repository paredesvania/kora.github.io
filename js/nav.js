// nav.js — dark mode toggle + parallax + nav visibility
(function () {
  // ── Aplicar dark mode ANTES del primer paint ──
  // El inline script en cada <head> ya setea html.dark-pre y html background.
  // Aquí aplicamos body.dark en cuanto se ejecuta nav.js (antes de DOMContentLoaded).
  var saved = localStorage.getItem("kora-theme");
  if (saved === "dark") {
    document.body
      ? document.body.classList.add("dark")
      : document.addEventListener("DOMContentLoaded", function () {
          document.body.classList.add("dark");
        });
  }

  document.addEventListener("DOMContentLoaded", function () {

    // Asegurar dark class en body (por si body no existía antes)
    if (saved === "dark") document.body.classList.add("dark");
    // Limpiar la clase auxiliar del html
    document.documentElement.classList.remove("dark-pre");

    // ── DARK TOGGLE ──
    var toggle = document.querySelector(".dark-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        // Sincronizar background del html para evitar flash en navegación
        document.documentElement.style.background =
          document.body.classList.contains("dark") ? "#0a0a0a" : "#fafafa";
        localStorage.setItem("kora-theme",
          document.body.classList.contains("dark") ? "dark" : "light");
      });
    }

    // ── PARALLAX en p-bignumber ──
    var bigNum = document.querySelector(".p-bignumber");
    if (bigNum) {
      window.addEventListener("scroll", function () {
        bigNum.style.transform = "translateY(" + (window.scrollY * 0.28) + "px)";
      }, { passive: true });
    }

    // ── NAV en index: empieza oculto, el scroll del index lo revela ──
    // Detectamos index por presencia de #hero-scroll-zone
    var nav = document.querySelector("nav");
    if (nav && document.getElementById("hero-scroll-zone")) {
      nav.classList.add("nav-hidden");
      // El scroll handler en index.html se encarga de quitarlo.
    }
  });
})();