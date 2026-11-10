const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function nextChristmas() {
  const now = new Date();
  let year = now.getFullYear();
  let target = new Date(year, 11, 25, 0, 0, 0);
  if (now >= target) target = new Date(year + 1, 11, 25, 0, 0, 0);
  return target;
}

function tick() {
  const now = new Date();
  const target = nextChristmas();
  let diff = Math.max(0, target - now);

  const days = Math.floor(diff / 86400000);
  diff -= days * 86400000;
  const hours = Math.floor(diff / 3600000);
  diff -= hours * 3600000;
  const minutes = Math.floor(diff / 60000);
  diff -= minutes * 60000;
  const seconds = Math.floor(diff / 1000);

  countdownEls.days.textContent = String(days).padStart(2, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
}
tick();
setInterval(tick, 1000);

const slides = [...document.querySelectorAll(".hamper-slide")];
const count = document.getElementById("slideCount");
let current = 0;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === current));
  count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}
document.getElementById("next").addEventListener("click", () => showSlide(current + 1));
document.getElementById("prev").addEventListener("click", () => showSlide(current - 1));

let autoSlide = setInterval(() => showSlide(current + 1), 6500);
document.getElementById("hamperSlider").addEventListener("mouseenter", () => clearInterval(autoSlide));
document.getElementById("hamperSlider").addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => showSlide(current + 1), 6500);
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
