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
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)


    // Mouse function
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)

})

window.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false
}

function touchStart(index) {
    return function (event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;
        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')

    }
}

function touchEnd() {
    isDragging = false
    cancelAnimationFrame(animationID)
    slider.classList.remove('grabbing')
    // slider.classList.add('grab')
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < slides.length - 1)
        currentIndex += 1
    if (movedBy > 100 && currentIndex > 0)
        currentIndex -= 1

    setPositionByIndex();


}

function touchMove(event) {
    if (isDragging) {
        const currentPostion = getPositionX(event)
        currentTranslate = prevTranslate + currentPostion - startPos
    }
}

const getPositionX = (event) => {
    return event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
}

const animation = () => {
    setSliderPosition();
    if (isDragging)
        requestAnimationFrame(animation)
}

const setSliderPosition = () => {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition()
}