import { nonogramsEasy, nonogramsHard, nonogramsMedium, nonogramsAll } from "./constants.js";
import { body, wrapperBody, buttonEasyLevel, listDropDownEasy, 
         buttonMediumLevel, buttonHardLevel, nonogramPlayingField, 
         listDropDownMedium, buttonRandomGame, listDropDownHard, randomNonogram } from "./create-html.js";
import { addNonogram, deleteClass, createRandomLevel, changeZIndexButtons, 
         createMatrixRandomForButton, playGame} from "./functions.js";

body.append(wrapperBody);

let nonogramGrids = document.querySelectorAll('.coded-image__grid');
let itemListEasyGame = document.querySelectorAll('.item_drop-down-easy'); 
let itemListMediumGame = document.querySelectorAll('.item_drop-down-medium');
let itemListHardGame = document.querySelectorAll('.item_drop-down-hard');

playGame(wrapperBody, nonogramGrids, randomNonogram, nonogramPlayingField)

buttonEasyLevel.addEventListener('click', (elem) => {
  elem.stopPropagation();
  listDropDownEasy.classList.toggle('list_drop-down-open');
  deleteClass(listDropDownMedium, listDropDownHard, 'list_drop-down-open', 'list_drop-down-open');
  changeZIndexButtons(buttonEasyLevel, buttonHardLevel, buttonMediumLevel);
});

itemListEasyGame.forEach((elem) => {
  elem.addEventListener('click', () => {
    deleteClass(nonogramPlayingField, nonogramPlayingField, 'medium', 'hard');
    nonogramPlayingField.classList.add('easy');
    let key = elem.textContent;
    while(nonogramPlayingField.firstChild){
      nonogramPlayingField.removeChild(nonogramPlayingField.firstChild);
    }
    addNonogram(nonogramsEasy[key], nonogramPlayingField);
    nonogramGrids = document.querySelectorAll('.coded-image__grid');
    itemListEasyGame = document.querySelectorAll('.item_drop-down-easy'); 
    itemListMediumGame = document.querySelectorAll('.item_drop-down-medium');
    itemListHardGame = document.querySelectorAll('.item_drop-down-hard');
    playGame(wrapperBody, nonogramGrids, nonogramsEasy[key], nonogramPlayingField);
  })
})

buttonMediumLevel.addEventListener('click', (elem) => {
  elem.stopPropagation();
  listDropDownMedium.classList.toggle('list_drop-down-open');
  deleteClass(listDropDownEasy, listDropDownHard, 'list_drop-down-open', 'list_drop-down-open');
  changeZIndexButtons(buttonMediumLevel, buttonHardLevel, buttonRandomGame);
})

itemListMediumGame.forEach((elem) => [
  elem.addEventListener('click', () => {
    deleteClass(nonogramPlayingField, nonogramPlayingField, 'easy', 'hard');
    nonogramPlayingField.classList.add('medium');
    let key = elem.textContent;
    while(nonogramPlayingField.firstChild){
      nonogramPlayingField.removeChild(nonogramPlayingField.firstChild);
    } 
    addNonogram(nonogramsMedium[key], nonogramPlayingField);
    nonogramGrids = document.querySelectorAll('.coded-image__grid');
    itemListEasyGame = document.querySelectorAll('.item_drop-down-easy'); 
    itemListMediumGame = document.querySelectorAll('.item_drop-down-medium');
    itemListHardGame = document.querySelectorAll('.item_drop-down-hard');
    playGame(wrapperBody, nonogramGrids, nonogramsMedium[key], nonogramPlayingField);
  })
])

buttonHardLevel.addEventListener('click', (elem) => {
  elem.stopPropagation();
  listDropDownHard.classList.toggle('list_drop-down-open');
  deleteClass(listDropDownEasy, listDropDownMedium, 'list_drop-down-open', 'list_drop-down-open');
  changeZIndexButtons(buttonHardLevel, buttonRandomGame, buttonMediumLevel);
})

itemListHardGame.forEach((elem) => [
  elem.addEventListener('click', () => {
    deleteClass(nonogramPlayingField, nonogramPlayingField, 'easy', 'medium');
    nonogramPlayingField.classList.add('hard');
    let key = elem.textContent;
    while(nonogramPlayingField.firstChild){
      nonogramPlayingField.removeChild(nonogramPlayingField.firstChild);
    }
    addNonogram(nonogramsHard[key], nonogramPlayingField);
    nonogramGrids = document.querySelectorAll('.coded-image__grid');
    itemListEasyGame = document.querySelectorAll('.item_drop-down-easy'); 
    itemListMediumGame = document.querySelectorAll('.item_drop-down-medium');
    itemListHardGame = document.querySelectorAll('.item_drop-down-hard');
    playGame(wrapperBody, nonogramGrids, nonogramsHard[key], nonogramPlayingField);
  })
])

buttonRandomGame.addEventListener('click', () => {
  deleteClass(listDropDownEasy, listDropDownMedium, 'list_drop-down-open', 'list_drop-down-open');
  deleteClass(nonogramPlayingField, nonogramPlayingField, 'easy', 'hard');
  listDropDownHard.classList.remove('list_drop-down-open');
  nonogramPlayingField.classList.remove('medium');
  let randomNonogram = createMatrixRandomForButton(nonogramsAll);
  let randomLevel = createRandomLevel(nonogramsEasy, nonogramsMedium, nonogramsHard, randomNonogram);
  while(nonogramPlayingField.firstChild){
    nonogramPlayingField.removeChild(nonogramPlayingField.firstChild);
  }
  addNonogram(randomNonogram, nonogramPlayingField);
  nonogramPlayingField.classList.add(randomLevel);
  nonogramGrids = document.querySelectorAll('.coded-image__grid');
  itemListEasyGame = document.querySelectorAll('.item_drop-down-easy'); 
  itemListMediumGame = document.querySelectorAll('.item_drop-down-medium');
  itemListHardGame = document.querySelectorAll('.item_drop-down-hard');
  playGame(wrapperBody, nonogramGrids, randomNonogram, nonogramPlayingField);

})

body.addEventListener('click',() => {
  listDropDownHard.classList.remove('list_drop-down-open');
  deleteClass(listDropDownEasy, listDropDownMedium, 'list_drop-down-open', 'list_drop-down-open');
})
