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

/* ============================================================
   PROJECT SIZE SECTION — interactive selector
   Append this block to the bottom of assets/js/script.js
   ============================================================ */

(function () {
  var optionsContainer = document.getElementById('projectSizeOptions');
  if (!optionsContainer) return;

  optionsContainer.addEventListener('click', function (e) {
    var btn = e.target.closest('.project-size__option');
    if (!btn) return;

    // Deselect all, select clicked
    optionsContainer.querySelectorAll('.project-size__option').forEach(function (el) {
      el.classList.remove('project-size__option--selected');
    });
    btn.classList.add('project-size__option--selected');
  });

  // "Weiter" button — wire up as needed
  var submitBtn = document.getElementById('projectSizeSubmit');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var selected = optionsContainer.querySelector('.project-size__option--selected');
      var size = selected ? selected.getAttribute('data-size') : '';
      // Replace the line below with your real next-step logic:
      console.log('Selected project size:', size);
    });
  }
})();

/* ── RISKS SLIDER ── */
(function () {
  var track = document.getElementById('risksTrack');
  var trackWrap = document.getElementById('risksTrackWrap');
  var prevBtn = document.getElementById('risksPrev');
  var nextBtn = document.getElementById('risksNext');

  if (!track || !prevBtn || !nextBtn) return;

  var slides = track.querySelectorAll('.risks-slider__slide');
  var total = slides.length;
  var currentIndex = total - 1;
  var GAP = 20;

  function setSlideSize() {
    var h = trackWrap.clientHeight;
    if (h <= 0) h = 500;
    slides.forEach(function (s) {
      s.style.width = h + 'px';
      s.style.height = h + 'px';
    });
  }

  function updateTrack() {
    var size = slides[0] ? slides[0].offsetHeight : 500;
    var wrapWidth = trackWrap.offsetWidth;
    var offset = -(currentIndex * (size + GAP)) + (wrapWidth - size);
    track.style.transform = 'translateX(' + offset + 'px)';
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= total - 1;
  }

  function init() {
    setSlideSize();
    updateTrack();
  }

  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) { currentIndex--; updateTrack(); }
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex < total - 1) { currentIndex++; updateTrack(); }
  });

  window.addEventListener('resize', function () {
    setSlideSize();
    updateTrack();
  });

  setTimeout(init, 50);
})();
