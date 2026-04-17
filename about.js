// about.js — reveal con scroll en info-items
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".info-item");
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(item => observer.observe(item));
});