window.addEventListener('DOMContentLoaded', () => {
    const paintBox = document.querySelector('.paintbox');

    for (let i = 1; i <= 400; i++) {
        paintBox.innerHTML += '<div class="pixel"></div>';
    }
    
    let someIndex = [];
    
    let setPixel = function(e) {
        if (e.target.classList.contains('pixel')) {
            e.target.classList.add('pixelCircle');
            someIndex[0] = 1;
        }
    }

    paintBox.addEventListener('click', (event) => {
        if (someIndex[0]) {
            paintBox.removeEventListener('mouseover', setPixel);
            someIndex = [];
        } else {
            event.target.classList.add('pixelCircle');
            paintBox.addEventListener('mouseover', setPixel);
        } 
    });
    
    
});