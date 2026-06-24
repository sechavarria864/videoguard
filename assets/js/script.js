const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Menü öffnen");
    });
  });
}

const messageIcons = document.querySelectorAll(".hero-message-icon");
const messageTexts = document.querySelectorAll(".hero-message-text");
let currentMessageIndex = 0;

if (messageIcons.length && messageTexts.length) {
  setInterval(() => {
    messageIcons[currentMessageIndex].classList.remove("active");
    messageTexts[currentMessageIndex].classList.remove("active");

    currentMessageIndex = (currentMessageIndex + 1) % messageIcons.length;

    messageIcons[currentMessageIndex].classList.add("active");
    messageTexts[currentMessageIndex].classList.add("active");
  }, 3000);
}

const mobileStats = document.querySelectorAll(".mobile-stat");
let currentMobileStatIndex = 0;

if (mobileStats.length) {
  setInterval(() => {
    mobileStats[currentMobileStatIndex].classList.remove("active");
    currentMobileStatIndex = (currentMobileStatIndex + 1) % mobileStats.length;
    mobileStats[currentMobileStatIndex].classList.add("active");
  }, 3000);
}

const counters = document.querySelectorAll(".counter");

const formatNumber = (value) => {
  return new Intl.NumberFormat("de-DE").format(value);
};

const animateCounter = (element, target, duration = 2000) => {
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || hasAnimated) return;

        hasAnimated = true;
        const startTime = performance.now();

        const updateCounter = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(target * easeProgress);

          element.textContent = formatNumber(currentValue);

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = formatNumber(target);
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(element);
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(element);
};

counters.forEach((counter) => {
  const target = Number(counter.dataset.target || 0);
  animateCounter(counter, target, 2000);
});
