// Importações
const ioniconsEsm = document.createElement("script");
ioniconsEsm.type = "module";
ioniconsEsm.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js";
document.head.appendChild(ioniconsEsm);

const ioniconsNoModule = document.createElement("script");
ioniconsNoModule.noModule = true;
ioniconsNoModule.src = "https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js";
document.head.appendChild(ioniconsNoModule);

const jQueryScript = document.createElement("script");
jQueryScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js";
document.head.appendChild(jQueryScript);

// Constantes e variáveis
const header = document.getElementById("header");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".center nav ul");
const navLinks = document.querySelectorAll('.center nav ul li a');
let lastScrollY = window.scrollY;

const statItems = document.querySelectorAll('.stat-item');
const videoContainer = document.getElementById('video-container');
const videoFrame = document.getElementById('video-frame');
const closeButton = document.getElementById('close-button');

const nameElement = document.getElementById("name");

// Declaração de funções
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

document.querySelectorAll(".hero-slider").forEach((currentSlider) => {
  const sliderContainer = currentSlider.querySelector(".slider-container");
  const sliderPrevBtn = currentSlider.querySelector(".slider-btn.prev");
  const sliderNextBtn = currentSlider.querySelector(".slider-btn.next");

  let currentSlidePos = 0;

  const moveSliderItem = () => {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  const slideNext = () => {
    const slideEnd = currentSlidePos >= sliderContainer.childElementCount - 1;

    currentSlidePos = slideEnd ? 0 : currentSlidePos + 1;

    moveSliderItem();
  };

  const slidePrev = () => {
    const isFirstSlide = currentSlidePos <= 0;

    currentSlidePos = isFirstSlide
      ? sliderContainer.childElementCount - 1
      : currentSlidePos - 1;

    moveSliderItem();
  };

  sliderNextBtn.addEventListener("click", slideNext);
  sliderPrevBtn.addEventListener("click", slidePrev);

  // Esconde os botões se houver apenas um slide
  if (sliderContainer.childElementCount <= 1) {
    sliderNextBtn.style.display = "none";
    sliderPrevBtn.style.display = "none";
  }
});

document.querySelectorAll('.accordion-card').forEach(card => {
  const button = card.querySelector('.accordion-btn');

  button.addEventListener('click', () => {
    // Alterna a classe 'expanded' no cartão clicado
    card.classList.toggle('expanded');
    document.querySelectorAll('.accordion-card').forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('expanded')) {
        otherCard.classList.remove('expanded');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  nameElement.addEventListener("change", function () {
    var dataElements = document.querySelectorAll(".data");

    dataElements.forEach(function (element) {
      element.style.display = "none";
    });

    var selectedId = nameElement.value;
    var selectedElement = document.getElementById(selectedId);
    if (selectedElement) {
      selectedElement.style.display = "block";
      selectedElement.style.transition = "opacity 0.7s";
      selectedElement.style.opacity = 1;
    }
  });

  nameElement.dispatchEvent(new Event('change'));
});

// Chamamento das funções
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    if (!hamburger.classList.contains("active")) {
      if (window.scrollY > lastScrollY) {
        header.classList.add("hidden");
      } else {
        header.classList.remove("hidden");
      }
    }
    lastScrollY = window.scrollY;
  });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  addEventOnElements(navTogglers, "click", toggleNavbar);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });

  for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }

  for (let i = 0, len = accordions.length; i < len; i++) { initAccordion(accordions[i]); }
});

