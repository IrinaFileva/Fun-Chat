import { gameTime } from "./constants.js";
import { titleTimeGame } from "./create-html.js";

export function playGame(parent, grids, matrix, field){

  const nonogramLine = document.querySelectorAll('.coded-image__line');
  const gameMatrix = createMatrixGame(nonogramLine);
  titleTimeGame.textContent = 'Game time: 00:00';
  let workingNonogram;
  let arraySaveLS;

  workingNonogram = matrix;

  grids.forEach((elem, index)=> {
    elem.addEventListener('click', () => {
      gameTime.cont = gameTime.cont + 1;
      elem.classList.remove('cross-black');
      elem.classList.toggle('background-black');
      elem.classList.contains('background-black')?gameMatrix.splice(index, 1, '1'):gameMatrix.splice(index, 1, '0');
      arraySaveLS = gameMatrix.join('');
      if(gameTime.cont === 1){
        gameTime.interval = setInterval(addSecondAndMinutes, 1000)
      }
      if(gameMatrix.join('') === workingNonogram.flat().join('')){
        parent.style.pointerEvents = 'none';
        clearInterval(gameTime.interval);
      }
    });
    elem.addEventListener('contextmenu', (event) => {
      gameTime.cont = gameTime.cont + 1;
      if(gameTime.cont === 1){
        setInterval(addSecondAndMinutes, 1000);
      }
      event.preventDefault();
      elem.classList.remove('background-black');
      gameMatrix.splice(index, 1, '0');
      elem.classList.toggle('cross-black');
    });
  })
  addBorder(grids, field);
}

function addBorder(grids, field){
  const lineTooltipsLeft = document.querySelectorAll('.left-tooltips__line');
  lineTooltipsLeft.forEach((elem, index) => {
    if(index === 4 || index === 9) {
      elem.style.borderBottom = '4px solid black';
      if(field.classList.contains('medium')){
        elem.style.height = '30px';
      }
      if(field.classList.contains('hard')){
        elem.style.height = '25px';
      }
    }
  });

  const lineTooltipsTop = document.querySelectorAll('.top-tooltips__line');
  lineTooltipsTop.forEach((elem, index) => {
    if(index === 4 || index === 9) elem.style.borderRight = '3px solid black'});

  const lineCodedImage = document.querySelectorAll('.coded-image__line');
  lineCodedImage.forEach((elem, index) => {
    if(index === 4 || index === 9) elem.style.borderBottom = '2px solid black'});

  grids.forEach((elem, index) =>{
    if((index + 1) % 5 === 0) elem.style.borderRight = '3px solid black'});
}

export function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
  return item;
}

export function createAndFillButton(button, kind ,text){
  button.type = kind;
  button.textContent = text;
}

function rotateMatrix(matrix) {
  const rotateArr = matrix;
  const len = rotateArr.length;

  for (let i = 0; i < len / 2; i += 1) {
    for (let j = i; j < len - i - 1; j += 1) {
      const item = rotateArr[i][j];
      const lenJ = len - j - 1;
      const lenI = len - i - 1;

      rotateArr[i][j] = rotateArr[lenJ][i];
      rotateArr[lenJ][i] = rotateArr[lenI][lenJ];
      rotateArr[lenI][lenJ] = rotateArr[j][lenI];
      rotateArr[j][lenI] = item;
    }
  }
  return rotateArr;
}

export function createTooltips(matrix){
  let arr = [];
  matrix.forEach((element) => {
    let line = [];
    let index = 0;
    for(let i = 0; i < element.length; i++){
      if (element[i] === 1){
        index ++;
      }
      if(element[i] === 0 || i === element.length -1){
        line.push(index);
        index = 0;
      }
    }
    arr.push(line.filter(x => x !== 0));
  })
  return arr;
}

export function addTooltips(arr, parent, container, line, grid){
  const containerLeftTooltips = addElement('div', container, parent);
  for(let j = 0; j < arr.length; j++){
    const nonogramLine = addElement('div',line, containerLeftTooltips);
    for(let i = 0; i < arr[j].length; i++){
      let tooltipsGrid = addElement('div', grid, nonogramLine);
      tooltipsGrid.textContent = arr[j][i];
    }
  }
}

export function addNonogram(nonogram, parent){
  addTooltips(createTooltips(nonogram), parent, 'playing-field__container-left-tooltips', 'left-tooltips__line', `left-tooltips__grid`);
  addTooltips(createTooltips(rotateMatrix(nonogram)), parent, 'playing-field__container-top-tooltips', 'top-tooltips__line', `top-tooltips__grid`);
  rotateMatrix(rotateMatrix(rotateMatrix(nonogram)));
  const containerCodedImage = addElement('div', 'nonogram__container-coded-image', parent);
  for(let j = 0; j < nonogram.length; j++){
    const nonogramLine = addElement('div','coded-image__line', containerCodedImage);
    for(let i = 0; i < nonogram[j].length; i++){
      addElement('div',`coded-image__grid`, nonogramLine);
    }
  }
}

export function createMatrixGame(line){
  let arr =[]
  for(let j = 0; j < line.length; j ++){
    arr.push(Array(line.length).fill(0));
  }
  return arr.flat();
}

export function createRandomNonogram(obj){
  const indexRandom = Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
  return obj[indexRandom];
}

export function createListDropDown(matrix, nameClass, parent){
  Object.keys(matrix).forEach((elem) => {
    let item = addElement('p', nameClass, parent);
    item.textContent = elem;
  })
}

export function deleteClass(elem1, elem2, class1, class2){
  elem1.classList.remove(class1);
  elem2.classList.remove(class2);
}

export function changeZIndexButtons(btn1, btn2, btn3){
  btn1.style.zIndex = '5';
  btn2.style.zIndex = '0';
  btn3.style.zIndex = '0';
}

export function createMatrixRandomForButton(levelNonogram){
  const randomLevel = createRandomNonogram(levelNonogram);
  const randomMatrix = createRandomNonogram(randomLevel);
  return randomMatrix;
}

export function createRandomLevel(obj1, obj2, obj3, item){
  if(Object.values(obj1).includes(item)) return 'easy';
  if(Object.values(obj2).includes(item)) return 'medium';
  if(Object.values(obj3).includes(item)) return 'hard';
}

export function addSecondAndMinutes(){
  gameTime.seconds = gameTime.seconds + 1;
  if(gameTime.seconds === 60){
    gameTime.minutes = gameTime.minutes + 1;
    gameTime.seconds = 0;
  }
  titleTimeGame.textContent = `Game time: ${String(gameTime.minutes).padStart(2, '0')}:${String(gameTime.seconds).padStart(2, '0')}`;
 }

export function stopTime(){
  clearInterval(gameTime.interval);
  gameTime.cont = 0;
  gameTime.interval = 0;
  gameTime.seconds = 0;
  gameTime.minutes = 0;
}