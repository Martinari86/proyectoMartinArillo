// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu Functionality ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                }
            });
        });
    }

    // --- Language Toggle Functionality ---
    const langToggleBtn = document.querySelector('.lang-toggle');
    const htmlElement = document.documentElement;
    const langTextSpan = langToggleBtn.querySelector('.lang-text');

    if (langToggleBtn && htmlElement) {
        langToggleBtn.addEventListener('click', function() {
            let currentLang = htmlElement.getAttribute('data-lang');
            let newLang = currentLang === 'es' ? 'en' : 'es';
            htmlElement.setAttribute('data-lang', newLang);
            updateContentLanguage(newLang);

            if (newLang === 'en') {
                langTextSpan.textContent = 'Español';
                langToggleBtn.setAttribute('data-lang-toggle', 'es');
            } else {
                langTextSpan.textContent = 'English';
                langToggleBtn.setAttribute('data-lang-toggle', 'en');
            }
        });
    }

    function updateContentLanguage(lang) {
        document.querySelectorAll('[data-en]').forEach(element => {
            if (lang === 'en') {
                // Store original content if not already stored
                if (!element.dataset.originalContent) {
                    element.dataset.originalContent = element.innerHTML; // Cambiado de textContent a innerHTML
                }
                element.innerHTML = element.getAttribute('data-en'); // Cambiado de textContent a innerHTML
            } else {
                // Revert to original content if it exists
                if (element.dataset.originalContent) {
                    element.innerHTML = element.dataset.originalContent; // Cambiado de textContent a innerHTML
                }
            }
        });
    }

    // --- Carousel Functionality (for multiple carousels) ---
    const allCarouselContainers = document.querySelectorAll('.carousel-container');

    allCarouselContainers.forEach(container => {
        let slideIndex = 1;
        const slides = container.querySelectorAll('.carousel-slide');
        const dots = container.querySelectorAll('.carousel-dot');
        const prevButton = container.querySelector('.carousel-prev');
        const nextButton = container.querySelector('.carousel-next');

        showSlidesInCarousel(slideIndex, slides, dots);

        if (prevButton) {
            prevButton.addEventListener('click', function() {
                showSlidesInCarousel(slideIndex += -1, slides, dots);
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                showSlidesInCarousel(slideIndex += 1, slides, dots);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlidesInCarousel(slideIndex = index + 1, slides, dots);
            });
        });

        function showSlidesInCarousel(n, slidesArr, dotsArr) {
            if (n > slidesArr.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slidesArr.length; }

            slidesArr.forEach(slide => {
                slide.style.display = "none";
            });

            dotsArr.forEach(dot => {
                dot.classList.remove("active");
            });

            if (slidesArr[slideIndex - 1]) {
                slidesArr[slideIndex - 1].style.display = "block";
            }
            if (dotsArr[slideIndex - 1]) {
                dotsArr[slideIndex - 1].classList.add("active");
            }
        }
    });

    // --- Header Visibility on Scroll ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY; // Guarda la última posición de scroll

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            // Bajando el scroll
            header.classList.add('header-hidden');
        } else {
            // Subiendo el scroll
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY; // Actualiza la última posición de scroll
    });

    // Para asegurar que el header sea visible al cargar la página si no hay scroll inicial
    // Y manejar el caso de recarga en una posición de scroll
    if (window.scrollY === 0) {
        header.classList.remove('header-hidden');
    }
});