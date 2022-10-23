window.addEventListener('DOMContentLoaded', () => {
    const paintBox = document.querySelector('.paintbox'),
          btn = document.querySelector('.btn__wrap'),
          btnOneStep = document.querySelector('.one-step'),
          btnLongStep = document.querySelector('.long-step'),
          getColor = document.querySelector('.swatchy-output');

    getColor.style.backgroundColor = '#03A9F4';

          //создаем поле
    for (let i = 1; i <= 400; i++) {
        paintBox.innerHTML += '<div class="pixel"></div>';
    }
    
    const arrPixels = document.querySelectorAll('.pixel');
    
    let clickCount = [], //флаг для отслеживания - будет ли ли кисть рисовать в режиме long step или нет
        stepChoice = true, //переменная для хранения статуса oneStep
        erase = false, //переменная для хранения режима стерательной резинки
        activeErase = false, //переменная для хранения статуса стирания - включен или нет
        backgroundColor = 'rgb(239, 248, 247)',

        //создаем функцию добавления пикселя для обработчика события mouseover, когда в режиме long step пиксели закрашиваются при движении мышкой (вывел в отдельную функцию, чтоб можно было удалить обработчик событий)
        setPixel = function(e) {
            if (e.target.classList.contains('pixel')) {
                !erase ? e.target.style.backgroundColor = getColor.style.backgroundColor : e.target.style.backgroundColor = backgroundColor; //проверяет режим, если режим стирания - до очищает пиксель, иначе закрашивает
                clickCount[0] = 1;
            }
        },
        //создаем функцию для отслеживания мыши внутри поля при режиме longstep и в случае покидания поля рисования - ставим режим longstep в деативироанный режим
        cursorСheck = function(e) {
            if (e.relatedTarget.classList.contains('pixel') || e.relatedTarget.classList.contains('paintbox')) {
            
            } else {
                paintBox.removeEventListener('mouseover', setPixel);
                paintBox.classList.remove('paintbox__longstep'); //деактивируем бордер у поля игры, чтоб видеть, что longstep режим неактивен и мы можем передвигаться по полю не закрашивая клетки
                clickCount = [];
            }
        };

    //Отслеживаем нажатия кнопок    
    btn.addEventListener('click', e => {
        switch (e.target.dataset.func) {
            case 'step':        
                e.target.classList.remove('btn__deactivated');
                btnLongStep.classList.add('btn__deactivated');
                stepChoice = true; 
                break;
            case 'long-step':   
                e.target.classList.remove('btn__deactivated');
                btnOneStep.classList.add('btn__deactivated');
                stepChoice = false;
                break;
            case 'erase':       
                e.target.classList.toggle('btn__deactivated');
                if (!activeErase) {
                    erase = true;
                    activeErase = true;
                } else {
                    erase = false;
                    activeErase = false;
                } 
                break;
            case 'borders':       
                e.target.classList.toggle('btn__deactivated');
                arrPixels.forEach((item) => {
                    item.classList.toggle('pixel_border-none');
                });
                break;
            case 'clear': location.reload(); break;
        }
    })

    //Старт рисования, при этом учитывается режим one step или long step
    paintBox.addEventListener('click', (event) => {
        if (event.target.classList.contains('pixel')) {
            if (!stepChoice) {
                if (clickCount[0]) {
                    paintBox.removeEventListener('mouseover', setPixel);
                    paintBox.removeEventListener('mouseout', cursorСheck);
                    paintBox.classList.toggle('paintbox__longstep'); //деактивируем бордер у поля игры, чтоб видеть, что longstep режим неактивен и мы можем передвигаться по полю не закрашивая клетки
                    clickCount = [];
                } else {
                    !erase ? event.target.style.backgroundColor = getColor.style.backgroundColor : event.target.style.backgroundColor = backgroundColor; //проверяет режим, если режим стирания - то очищает пиксель, иначе закрашивает
                    paintBox.addEventListener('mouseover', setPixel);
                    paintBox.classList.toggle('paintbox__longstep'); //активируем бордер у поля игры, чтоб видеть, что longstep режим активен и движение закрашивает клетки
                    paintBox.addEventListener('mouseout', cursorСheck);
                } 
            } else {
                !erase ? event.target.style.backgroundColor = getColor.style.backgroundColor : event.target.style.backgroundColor = backgroundColor; //проверяет режим, если режим стирания - до очищает пиксель, иначе закрашивает
            }
        }
    });
    
});