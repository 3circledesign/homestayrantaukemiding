document.addEventListener('DOMContentLoaded', () => {
  // === Slideshow logic ===
  const slideshow = document.querySelector('.slideshow');
  if (slideshow) {
    const slides = Array.from(slideshow.querySelectorAll('.slide'));
    const dots = Array.from(slideshow.querySelectorAll('.dot'));
    const prevBtn = slideshow.querySelector('.slide-nav.prev');
    const nextBtn = slideshow.querySelector('.slide-nav.next');
    let currentIndex = 0;
    let autoTimer = null;
    const AUTO_DELAY = 6000; // 6 seconds

    function goToSlide(index) {
      if (!slides.length) return;
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function startAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = setInterval(nextSlide, AUTO_DELAY);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        startAuto();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAuto();
      });
    }

    // Dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-slide') || '0', 10);
        goToSlide(target);
        startAuto();
      });
    });

    // Pause on hover
    slideshow.addEventListener('mouseenter', stopAuto);
    slideshow.addEventListener('mouseleave', startAuto);

    // Start auto if data-autoplay is true
    if (slideshow.dataset.autoplay === 'true') {
      startAuto();
    }
  }

  // === Language toggle for packages ===
  const langButtons = document.querySelectorAll('.lang-btn');
  const packageGroups = document.querySelectorAll('.packages');

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;

      // Toggle button active state
      langButtons.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });

      // Show/hide package groups
      packageGroups.forEach(group => {
        const isTarget = group.classList.contains(`lang-${lang}`);
        group.classList.toggle('active', isTarget);
      });
    });
  });
});
