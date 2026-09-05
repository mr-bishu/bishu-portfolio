const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 5, 4) * 70}ms`;
  observer.observe(el);
});

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll("nav a")];

window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  let active = sections[0]?.id;
  sections.forEach(section => {
    if (y >= section.offsetTop) active = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${active}`));
});
