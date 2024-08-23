/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

// popup box
document.addEventListener("DOMContentLoaded", function () {
  var currentSlideIndex = {}; // Store current index for each popup
  var popups = document.querySelectorAll(".popup");

  // Initialize current slide index for each popup
  popups.forEach(function (popup) {
    var id = popup.id;
    currentSlideIndex[id] = 0;
  });

  function showPopup(popup) {
    popup.classList.add("show");
    popup.classList.remove("hide");
    showSlide(popup.id, currentSlideIndex[popup.id]);
  }

  function hidePopup(popup) {
    popup.classList.add("hide");
    popup.classList.remove("show");
    setTimeout(function () {
      popup.style.display = "none";
    }, 300);
  }

  function showSlide(popupId, index) {
    var popup = document.getElementById(popupId);
    var slides = popup.querySelectorAll(".slide");
    slides.forEach(function (slide, i) {
      slide.style.display = i === index ? "flex" : "none";
    });
    currentSlideIndex[popupId] = index;
    updateArrows(popup);
  }

  function nextSlide(popup) {
    var popupId = popup.id;
    var slides = popup.querySelectorAll(".slide");
    currentSlideIndex[popupId] = (currentSlideIndex[popupId] + 1) % slides.length;
    showSlide(popupId, currentSlideIndex[popupId]);
  }

  function prevSlide(popup) {
    var popupId = popup.id;
    var slides = popup.querySelectorAll(".slide");
    currentSlideIndex[popupId] = (currentSlideIndex[popupId] - 1 + slides.length) % slides.length;
    showSlide(popupId, currentSlideIndex[popupId]);
  }

  function updateArrows(popup) {
    var prevArrow = popup.querySelector(".prev-arrow");
    var nextArrow = popup.querySelector(".next-arrow");
    var index = currentSlideIndex[popup.id];
    var slides = popup.querySelectorAll(".slide");

    prevArrow.style.display = index === 0 ? "none" : "flex";
    nextArrow.style.display = index === slides.length - 1 ? "none" : "flex";
  }

  document.querySelectorAll("[data-popup]").forEach(function (img) {
    img.addEventListener("click", function () {
      var popupId = img.getAttribute("data-popup");
      var popup = document.getElementById(popupId);
      popup.style.display = "flex";
      showPopup(popup);
    });
  });

  document.querySelectorAll(".close-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      hidePopup(btn.closest(".popup"));
    });
  });

  document.querySelectorAll(".next-arrow").forEach(function (arrow) {
    arrow.addEventListener("click", function () {
      nextSlide(arrow.closest(".popup"));
    });
  });

  document.querySelectorAll(".prev-arrow").forEach(function (arrow) {
    arrow.addEventListener("click", function () {
      prevSlide(arrow.closest(".popup"));
    });
  });

  document.querySelectorAll(".popup").forEach(function (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        hidePopup(popup);
      }
    });
  });
});
