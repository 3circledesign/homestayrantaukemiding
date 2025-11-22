document.addEventListener('DOMContentLoaded', () => {
  /* ========== Language toggle for packages ========== */
  const langButtons = document.querySelectorAll('.lang-btn');
  const langSections = document.querySelectorAll('.lang-section');

  function setLanguage(lang) {
    langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    langSections.forEach(sec => {
      if (sec.classList.contains('lang-' + lang)) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  }

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // Default language: English
  setLanguage('en');

  /* ========== Slideshow ========== */
  const slides = document.querySelectorAll('.slide');
  if (slides.length > 0) {
    let currentIndex = 0;
    const intervalMs = 5000;
    const nextBtn = document.querySelector('.slide-nav.next');
    const prevBtn = document.querySelector('.slide-nav.prev');
    const dotsContainer = document.querySelector('.slide-dots');
    const dots = [];

    // Create dots
    if (dotsContainer) {
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('data-index', idx);
        dotsContainer.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
          showSlide(idx);
          restartInterval();
        });
      });
    }

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      currentIndex = index;
    }

    function nextSlide() {
      const newIndex = (currentIndex + 1) % slides.length;
      showSlide(newIndex);
    }

    function prevSlideFn() {
      const newIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(newIndex);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        restartInterval();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlideFn();
        restartInterval();
      });
    }

    let autoInterval = setInterval(nextSlide, intervalMs);

    function restartInterval() {
      clearInterval(autoInterval);
      autoInterval = setInterval(nextSlide, intervalMs);
    }

    // Show first slide
    showSlide(0);
  }
});
