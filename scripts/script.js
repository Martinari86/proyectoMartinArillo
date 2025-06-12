document.addEventListener('DOMContentLoaded', function() {
    // --- Hamburger Menu Functionality ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('open');
        });
    }

    // --- Carousel Functionality (for multiple carousels) ---
    // Select all carousel containers
    const allCarouselContainers = document.querySelectorAll('.carousel-container');

    allCarouselContainers.forEach(container => {
        let slideIndex = 1; // Each carousel gets its own slideIndex
        const slides = container.querySelectorAll('.carousel-slide');
        const dots = container.querySelectorAll('.carousel-dot');
        const prevButton = container.querySelector('.carousel-prev');
        const nextButton = container.querySelector('.carousel-next');

        // Initial display for each carousel
        showSlidesInCarousel(slideIndex, slides, dots);

        // Navigation controls for this specific carousel
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

        // Dot controls for this specific carousel
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlidesInCarousel(slideIndex = index + 1, slides, dots);
            });
        });

        // Function to display slides for a specific carousel
        function showSlidesInCarousel(n, slidesArr, dotsArr) {
            if (n > slidesArr.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slidesArr.length; }

            // Hide all slides
            slidesArr.forEach(slide => {
                slide.style.display = "none";
            });

            // Deactivate all dots
            dotsArr.forEach(dot => {
                dot.classList.remove("active");
            });

            // Display the current slide and activate its dot
            if (slidesArr[slideIndex - 1]) { // Check if slide exists
                slidesArr[slideIndex - 1].style.display = "block";
            }
            if (dotsArr[slideIndex - 1]) { // Check if dot exists
                dotsArr[slideIndex - 1].classList.add("active");
            }
        }
    });
});