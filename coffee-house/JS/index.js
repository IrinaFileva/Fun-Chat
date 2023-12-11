


// slider //
const arronLeft = document.querySelector('.arron__left');
const arronRight = document.querySelector('.arron__right');
const slider = document.querySelector('.slider__wrapper');
const sliderWindow = document.querySelector('.slider__window');
const controlLeft = document.querySelector('.control-left');
const controlCenter = document.querySelector('.control-center');
const controlRight = document.querySelector('.control-right');
let pause = false;
let position = 0;
let widthProgressLeft = 0;
let widthProgressCenter = 0;
let widthProgressRight = 102;

function addRemoveClass(l, c, r){
    slider.classList.remove(l);
    slider.classList.remove(c);
    slider.classList.add(r);
};

function changeWidth(l, c, r, w){
    l.style.width = '0px';
    c.style.width = '0px';
    r.style.width = `${w}%`;
};

function deleteWidth() {
    widthProgressCenter = 0;
    widthProgressLeft = 0;
    widthProgressRight = 0;
};

function moveSlider(){
    if(position === 0){
        widthProgressLeft += 3;
        changeWidth(controlCenter, controlRight, controlLeft, widthProgressLeft);
        addRemoveClass('center', 'right', 'left');
        if(widthProgressLeft >= 102){
            position = 1;
            deleteWidth();
        };
    }
    else if(position === 1){
        widthProgressCenter += 3;
        changeWidth(controlRight, controlLeft, controlCenter, widthProgressCenter);
        addRemoveClass('right', 'left', 'center');
        if(widthProgressCenter >= 102){
            position = 2;
            deleteWidth();
        };
    }
    else if(position === 2){
        widthProgressRight += 3;
        changeWidth(controlCenter, controlLeft, controlRight, widthProgressRight);
        addRemoveClass('left', 'center','right');
        if(widthProgressRight >= 102){
            position = 3;
            deleteWidth();
        };
    }
    else if(position === 3){
        position = 0;
        deleteWidth();
    };   
};


arronLeft.addEventListener('click', () => {
    if(position === 0){
        position += 2;
        deleteWidth();
    }
    else{
        position --;
        deleteWidth();
    };
});

arronRight.addEventListener('click', () => {
    if(position >= 2){
        position = 0;
    }
    else{
        position ++;
    }
    deleteWidth();
});

setInterval(function(){ 
    if(!pause){
        moveSlider();
    }
}, 150);

sliderWindow.addEventListener('touchstart', () => position ++ );
sliderWindow.addEventListener('touchend', () => pause = false);
sliderWindow.addEventListener('mouseover', () => pause = true);
sliderWindow.addEventListener('mouseout', () => pause = false);
sliderWindow.addEventListener('mousedown', () => {
   sliderWindow.removeEventListener('mouseover', () => pause = true);
   pause = true;
});
sliderWindow.addEventListener('mouseup', () => pause = false);


   