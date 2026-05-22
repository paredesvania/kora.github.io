// nav.js — dark mode toggle + parallax + nav visibility
(function () {

  // ── Aplicar dark mode ANTES del primer paint ──
  // (El script inline en <head> ya lo hace; esto es un fallback de seguridad)
  var saved = localStorage.getItem("kora-theme");
  if (saved === "dark" && document.body) {
    document.body.classList.add("dark");
  }

  document.addEventListener("DOMContentLoaded", function () {

    document.documentElement.classList.remove("dark-pre");

    // ── DARK TOGGLE ──
    var toggle = document.querySelector(".dark-toggle");
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        toggle.blur();

        document.body.classList.toggle("dark");
        var isDark = document.body.classList.contains("dark");
        document.documentElement.style.background = isDark ? "#0a0a0a" : "#fafafa";
        localStorage.setItem("kora-theme", isDark ? "dark" : "light");

        // Fuerza recálculo de colores en elementos con scroll-driven color
        window.dispatchEvent(new Event("scroll"));
      });
    }

    // ── PARALLAX en p-bignumber ──
    var bigNum = document.querySelector(".p-bignumber");
    if (bigNum) {
      window.addEventListener("scroll", function () {
        bigNum.style.transform = "translateY(" + (window.scrollY * 0.28) + "px)";
      }, { passive: true });
    }

    // ── NAV oculta en index hasta que el usuario scrollea ──
    var nav = document.querySelector("nav");
    if (nav && document.getElementById("hero-scroll-zone")) {
      nav.classList.add("nav-hidden");
    }

  

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      overlay.classList.add("open");
      menuBtn.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeMenu() {
      isOpen = false;
      overlay.classList.remove("open");
      menuBtn.classList.remove("open");
      document.body.style.overflow = "";
    }

    menuBtn.addEventListener("click", function () {
      isOpen ? closeMenu() : openMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen) closeMenu();
    });

  });
})();