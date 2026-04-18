document.addEventListener("DOMContentLoaded", () => {

  // Detectar si está en modo oscuro para saber el color del fade
  function bgColor() {
    return document.body.classList.contains("dark") ? "#0a0a0a" : "#fafafa";
  }

  const el = document.createElement("div");
  el.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 999999;
    pointer-events: none;
    opacity: 1;
    transition: none;
  `;
  el.style.background = bgColor();
  document.body.appendChild(el);

  // Fade de entrada: opaco → transparente
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.25s ease";
      el.style.opacity = "0";
    });
  });

  // Si el modo oscuro cambia mientras el fade existe, actualizar color
  const observer = new MutationObserver(() => {
    if (parseFloat(el.style.opacity) < 0.5) return; // solo si está visible
    el.style.background = bgColor();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

  // Fade de salida al clickear link interno
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;
    const internal =
      !href.startsWith("http")   &&
      !href.startsWith("mailto") &&
      !href.startsWith("#")      &&
      !href.startsWith("//");
    if (!internal) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;

    e.preventDefault();
    el.style.background = bgColor();
    el.style.transition = "opacity 0.2s ease";
    el.style.opacity = "1";
    setTimeout(() => { window.location.href = href; }, 220);
  });

});