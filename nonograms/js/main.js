import { body, wrapperBody, randomNonogram } from "./create-html.js";
import { createMatrixGame } from "./functions.js";

body.append(wrapperBody);

const nonogramGrids = document.querySelectorAll('.coded-image__grid');
const nonogramLine = document.querySelectorAll('.coded-image__line');
const gameMatrix = createMatrixGame(nonogramLine);

let workingNonogram;
let arraySaveLS;

workingNonogram = randomNonogram;

nonogramGrids.forEach((elem, index)=> {
  elem.addEventListener('click', () =>{
    elem.classList.remove('cross-black');
    elem.classList.toggle('background-black');
    elem.classList.contains('background-black')? gameMatrix.splice(index, 1, '1'):gameMatrix.splice(index, 1, '0');
    arraySaveLS = gameMatrix.join('');
    if(gameMatrix.join('') === workingNonogram.flat().join('')){
      wrapperBody.style.pointerEvents = 'none';
    }  
  });
  elem.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    elem.classList.remove('background-black');
    gameMatrix.splice(index, 1, '0');
    elem.classList.toggle('cross-black');
  });
})
