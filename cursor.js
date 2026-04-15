const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);
document.addEventListener("mousemove", (e) => {
cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";
});
const links = document.querySelectorAll("a");
links.forEach(link => {
link.addEventListener("mouseenter", () => {
cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
});
link.addEventListener("mouseleave", () => {
cursor.style.transform = "translate(-50%, -50%) scale(1)";
});
});

window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 10) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});
