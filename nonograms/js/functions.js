import { gameTime, nonogramsEasy, nonogramsMedium, nonogramsHard } from "./constants.js";
import { titleTimeGame, containerLinkScores, buttonResetGame,
         buttonSolution, buttonSaveGame } from "./create-html.js";

export function playGame(parent, grids, matrix, field){

  const nonogramLine = document.querySelectorAll('.coded-image__line');
  const gameMatrix = createMatrixGame(nonogramLine);
  addSecondAndMinutes()
  let workingNonogram;
  let arraySaveLS;

  workingNonogram = matrix;

  grids.forEach((elem, index)=> {
    if(elem.classList.contains('background-black')){
      gameMatrix.splice(index, 1, '1')
    }
    elem.addEventListener('click', () => {
      gameTime.cont = gameTime.cont + 1;
      elem.classList.remove('cross-black');
      elem.classList.toggle('background-black');
      elem.classList.contains('background-black')?gameMatrix.splice(index, 1, '1'):gameMatrix.splice(index, 1, 0);
      if(gameTime.cont === 1){
        gameTime.interval = setInterval(addSecondAndMinutes, 1000)
      }
      if(gameMatrix.join('') === workingNonogram.flat().join('')){
        grids.forEach(x => {
          x.classList.remove('cross-black');
          x.style.borderColor = 'black';
        })
        parent.style.pointerEvents = 'none';
        clearInterval(gameTime.interval);
        saveLocalStorage(matrix);
      }
      arraySaveLS = gameMatrix;
    });
    elem.addEventListener('contextmenu', (event) => {
      gameTime.cont = gameTime.cont + 1;
      if(gameTime.cont === 1){
        setInterval(addSecondAndMinutes, 1000);
      }
      event.preventDefault();
      elem.classList.remove('background-black');
      elem.classList.toggle('cross-black');
      elem.classList.contains('cross-black')?gameMatrix.splice(index, 1, '0'):gameMatrix.splice(index, 1, 0);
    }); 
  })
  buttonResetGame.addEventListener('click', () => {
    grids.forEach((elem) => {
      elem.style.pointerEvents = 'auto';
      deleteClass(elem, elem, 'background-black', 'cross-black');
    })
    gameMatrix.fill(0);
  })
  buttonSolution.addEventListener('click', () => {
    grids.forEach((elem, index) =>{
      deleteClass(elem, elem, 'background-black', 'cross-black');
      if(matrix.flat()[index] === 1) {
        elem.classList.add('background-black');
      }
      elem.style.pointerEvents = 'none';
      gameMatrix.fill(0);
      stopTime();
    })
  })
  buttonSaveGame.addEventListener('click', () =>{
    let objSave = JSON.parse(localStorage.getItem('IF-save')) || {};
    objSave.time = titleTimeGame.textContent;
    objSave.non = arraySaveLS;
    objSave.matrix = matrix;
    objSave.class = field.className
    localStorage.setItem('IF-save', JSON.stringify(objSave));
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

function addTooltips(arr, parent, container, line, grid){
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

export function createNameNonogram(obj, nonogram){
  const arrKey = Object.keys(obj);
  for( let key of arrKey){

    if(obj[key] === nonogram) return key;
  }
}

export function addSecondAndMinutes(){
  titleTimeGame.textContent = `Game time: ${String(gameTime.minutes).padStart(2, '0')}:${String(gameTime.seconds).padStart(2, '0')}`;
  gameTime.seconds = gameTime.seconds + 1;
  if(gameTime.seconds === 60){
    gameTime.minutes = gameTime.minutes + 1;
    gameTime.seconds = 0;
  }
 }

export function stopTime(){
  clearInterval(gameTime.interval);
  gameTime.cont = 0;
  gameTime.interval = 0;
  gameTime.seconds = 0;
  gameTime.minutes = 0;
}

export function saveLocalStorage(nonogram){
  let objName;
  if(Object.values(nonogramsEasy).includes(nonogram)) objName = nonogramsEasy;
  if(Object.values(nonogramsMedium).includes(nonogram)) objName = nonogramsMedium;
  if(Object.values(nonogramsHard).includes(nonogram)) objName = nonogramsHard;
   const getTime = JSON.parse(localStorage.getItem('IF-result')) || [];
   if(getTime.length === 5) getTime.shift()
   let obj = {};
   obj.level = createRandomLevel(nonogramsEasy, nonogramsMedium, nonogramsHard, nonogram);
   obj.nameNonogram = createNameNonogram(objName, nonogram);
   obj.time = titleTimeGame.textContent;
   getTime.push(obj);
   localStorage.setItem('IF-result', JSON.stringify(getTime));
}

export function fillResultTable () {
  let numResult = 0;
  let results = JSON.parse(localStorage.getItem('IF-result')) || [];
  results.sort((a,b) => +a.time.slice(-5).replace(':', '') - +b.time.slice(-5).replace(':', ''));
  for(let key of results){
    numResult +=1;
    let p = addElement('p', 'item__top-score',containerLinkScores);
    p.textContent = `${numResult}. ${key.level}: ${key.nameNonogram}\n${key.time}`;
  }
}
