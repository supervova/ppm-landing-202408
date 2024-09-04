// Get external content, utilities
import initModals from './components/modal/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const cefr = document.querySelector('.cefr');
  const main = document.querySelector('main.main');
  const parallaxImage = document.querySelector(
    '.is-playphrase-way .section__image img'
  );
  const topButton = document.querySelector('.header .btn');
  const progress = document.querySelector('.progress');
  const mainElement = document.querySelector('.main');
  const searchForm = document.getElementById('form-search');
  const searchInput = document.getElementById('form-search-input');
  const animatedElements = document.querySelectorAll('[data-animation]');

  // Scroll threshold percentage (0.0 to 1.0) where progress reaches max height
  const scrollThreshold = 0.8; // Измените это значение для экспериментов

  // Update parallax effect
  function updateParallax() {
    const scrollPosition = window.scrollY;
    const mainHeight = main.offsetHeight;
    const windowHeight = window.innerHeight;
    const cefrHeight = cefr.offsetHeight;

    // Parallax for .cefr
    if (mainHeight > windowHeight && cefrHeight > windowHeight) {
      const heightDifference = cefrHeight - mainHeight;
      const scrollPercent = scrollPosition / (mainHeight - windowHeight);
      const translateY = scrollPercent * heightDifference;
      cefr.style.transform = `translateY(-${translateY}px)`;
    }

    // Parallax effect for .section.is-playphrase-way (for screens wider than 768px)
    if (window.matchMedia('(min-width: 768px)').matches) {
      const parallaxTranslateY = scrollPosition * -0.32;
      parallaxImage.style.transform = `translateY(${parallaxTranslateY}px)`;
    }
  }

  // Update topButton opacity and progress bar height
  function updateScrollEffects() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const { scrollHeight } = document.documentElement;

    // Top button opacity
    const opacity = 1 - scrollTop / (scrollHeight - windowHeight);
    topButton.style.opacity = opacity;

    // Progress bar height
    const maxHeight =
      mainElement.offsetHeight - (106 * windowHeight) / 100 - 150;

    // Calculate the percentage of the scroll at which progress reaches maxHeight
    const scrollFraction = Math.min(
      scrollTop / ((scrollHeight - windowHeight) * scrollThreshold),
      1
    );

    // Calculate new height value for progress
    const newHeight = 50 + maxHeight * scrollFraction;

    // Set a new height value for progress
    progress.style.height = `${newHeight}px`;
  }

  // Handle search form submission
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchInput.value;
    const url = `https://www.playphrase.me/#/search?q=${encodeURIComponent(query)}`;
    window.location.href = url;
  });

  // Animate timeline dots with IntersectionObserver
  const observerOptions = {
    threshold: [0, 0.5, 1],
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.5) {
        entry.target.classList.add('is-animated');
      } else if (entry.intersectionRatio === 0) {
        entry.target.classList.remove('is-animated');
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => observer.observe(element));

  // Event listeners
  window.addEventListener('scroll', () => {
    updateParallax();
    updateScrollEffects();
  });

  window.addEventListener('resize', () => {
    updateParallax();
  });

  // Initial call
  updateParallax();
  updateScrollEffects();
  initModals();
});
