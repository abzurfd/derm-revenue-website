const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal, .reveal-delay").forEach((element) => observer.observe(element));
document.getElementById("year").textContent = String(new Date().getFullYear());

document.querySelectorAll(".platform-download").forEach((card) => {
  const platform = card.getAttribute("data-platform");
  if (platform === "mac") {
    card.setAttribute("href", "https://www.dropbox.com/scl/fi/keq7si62h8vjvwujsce8o/Health-Solutions-mac.zip?rlkey=6azi244qaf32ucyso50e9yo3w&st=si8fulm1&dl=1");
    card.setAttribute("download", "Health-Solutions-mac.zip");
  }
});
