const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal, .reveal-delay").forEach((element) => observer.observe(element));
document.getElementById("year").textContent = String(new Date().getFullYear());

const motionCards = document.querySelectorAll("[data-depth]");
const zoomSections = document.querySelectorAll("[data-zoom]");

function handleMotion() {
  const scrollY = window.scrollY;

  motionCards.forEach((element) => {
    const depth = Number(element.dataset.depth || 0);
    const rect = element.getBoundingClientRect();
    const offsetFromViewportCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
    const translateY = scrollY * depth * -0.18;
    const rotate = offsetFromViewportCenter * depth * -0.02;
    element.style.transform = `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg)`;
  });

  zoomSections.forEach((section) => {
    const zoom = Number(section.dataset.zoom || 0);
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(window.innerHeight / 2 - (rect.top + rect.height / 2));
    const normalized = Math.max(0, 1 - distance / (window.innerHeight * 0.9));
    const scale = 1 + normalized * zoom;
    section.style.transform = `scale(${scale})`;
  });
}

window.addEventListener("scroll", handleMotion, { passive: true });
window.addEventListener("resize", handleMotion);
handleMotion();

document.querySelectorAll(".platform-download").forEach((card) => {
  const platform = card.getAttribute("data-platform");
  if (platform === "mac") {
    card.setAttribute("href", "https://www.dropbox.com/scl/fi/keq7si62h8vjvwujsce8o/Health-Solutions-mac.zip?rlkey=6azi244qaf32ucyso50e9yo3w&st=si8fulm1&dl=1");
    card.setAttribute("download", "Health-Solutions-mac.zip");
  }
});
