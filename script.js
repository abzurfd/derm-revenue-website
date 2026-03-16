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

const REQUEST_STORAGE_KEY = "derm-demo-requests";
const requestForm = document.getElementById("demo-request-form");
const statusEl = document.getElementById("demo-request-status");

function saveRequest(data) {
  const existing = JSON.parse(window.localStorage.getItem(REQUEST_STORAGE_KEY) || "[]");
  existing.unshift({
    id: `demo-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...data,
  });
  window.localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
}

document.querySelectorAll(".platform-download").forEach((card) => {
  const platform = card.getAttribute("data-platform");
  if (platform === "mac") {
    card.setAttribute("href", "https://www.dropbox.com/scl/fi/keq7si62h8vjvwujsce8o/Health-Solutions-mac.zip?rlkey=6azi244qaf32ucyso50e9yo3w&st=si8fulm1&dl=1");
    card.setAttribute("download", "Health-Solutions-mac.zip");
    return;
  }

  card.addEventListener("click", (event) => {
    event.preventDefault();
    const requestTypeInput = requestForm?.querySelector('input[name="requestType"]');
    const notesInput = requestForm?.querySelector('textarea[name="notes"]');
    if (requestTypeInput) {
      requestTypeInput.value = `${platform} access request`;
    }
    if (notesInput && !notesInput.value.trim()) {
      notesInput.value = `Interested in ${platform} access for our team.`;
    }
    document.getElementById("request-demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (requestForm) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(requestForm);
    const payload = Object.fromEntries(formData.entries());
    saveRequest(payload);
    requestForm.reset();
    if (statusEl) {
      statusEl.textContent = "Request captured. You can now route this lead into your onboarding or sales process.";
    }
  });
}
