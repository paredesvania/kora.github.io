// about.js — reveal con scroll en info-items + border-left animado
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".info-item");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 110);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
});