const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    currentIndex = 0;

slides.forEach((slide, index) => {
    const slideImg = slide.querySelector('img');
    slideImg.addEventListener('dragstart', (e) => e.preventDefault())

    // Touch function



    // Mouse function
})

