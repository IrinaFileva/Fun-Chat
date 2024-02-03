import { nonogramsEasy, nonogramsHard, nonogramsMedium, nonogramsAll } from "./constants.js";
import { body, wrapperBody, buttonEasyLevel, listDropDownEasy,buttonMediumLevel, buttonSound, audioModal, buttonHardLevel,
         nonogramPlayingField, buttonSwitchTheme, buttonSaveGame, crossModalWindowVictory, modalWindowVictory,
         listDropDownMedium, buttonRandomGame, listDropDownHard, randomNonogram, audioBlackGrid, audioCross, audioEmptyCell,
         backgroundModalWindowVictory, buttonSolution, burgerMenuWrapper, lineBottomButtonMenuBurger, lineCenterButtonMenuBurger,
         lineTopButtonMenuBurger, buttonMenuBurger, containerLinkScores} from "./create-html.js";
import { addNonogram, deleteClass, createRandomLevel, changeZIndexButtons, 
         createMatrixRandomForButton, playGame, stopTime, fillResultTable, addBorder, openCloseModal} from "./functions.js";

body.append(wrapperBody);

let nonogramGrids = document.querySelectorAll('.coded-image__grid');
let itemListEasyGame = document.querySelectorAll('.item_drop-down-easy'); 
let itemListMediumGame = document.querySelectorAll('.item_drop-down-medium');
let itemListHardGame = document.querySelectorAll('.item_drop-down-hard');

playGame(nonogramGrids, randomNonogram, nonogramPlayingField);
fillResultTable();

buttonEasyLevel.addEventListener('click', (elem) => {
  elem.stopPropagation();
  listDropDownEasy.classList.toggle('list_drop-down-open');
  deleteClass(listDropDownMedium, listDropDownHard, 'list_drop-down-open', 'list_drop-down-open');
  changeZIndexButtons(buttonEasyLevel, buttonHardLevel, buttonMediumLevel);
});

itemListEasyGame.forEach((elem) => {
  elem.addEventListener('click', () => {
    stopTime();
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
    playGame(nonogramGrids, nonogramsEasy[key], nonogramPlayingField);
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
    stopTime()
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
    playGame(nonogramGrids, nonogramsMedium[key], nonogramPlayingField);
  })
])

buttonHardLevel.addEventListener('click', (elem) => {
  elem.stopPropagation();
  listDropDownHard.classList.toggle('list_drop-down-open');
  deleteClass(listDropDownEasy, listDropDownMedium, 'list_drop-down-open', 'list_drop-down-open');
  changeZIndexButtons(buttonHardLevel, buttonRandomGame, buttonMediumLevel);
  buttonSaveGame.style.zIndex = '0';
})

itemListHardGame.forEach((elem) => [
  elem.addEventListener('click', () => {
    stopTime();
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
    playGame(nonogramGrids, nonogramsHard[key], nonogramPlayingField);
  })
])

buttonRandomGame.addEventListener('click', () => {
  stopTime();
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
  playGame(nonogramGrids, randomNonogram, nonogramPlayingField);
})

buttonSwitchTheme.addEventListener('click', () => {
  body.classList.toggle('dark');
  nonogramGrids = document.querySelectorAll('.coded-image__grid');
  nonogramGrids.forEach((elem) => {
    body.classList.contains('dark')?elem.style.borderColor = 'beige': elem.style.borderColor = 'black';
  })
  addBorder(nonogramGrids, nonogramPlayingField);
})

buttonSound.addEventListener('click', () => {
  buttonSound.classList.toggle('game-board__button_sound-mute');
  if(buttonSound.classList.contains('game-board__button_sound-mute')){
    audioBlackGrid.muted = true;
    audioCross.muted = true;
    audioEmptyCell.muted = true;
    audioModal.muted = true;
  }
  else{
    audioBlackGrid.muted = false;
    audioCross.muted = false;
    audioEmptyCell.muted = false;
    audioModal.muted = false;
  }
})

backgroundModalWindowVictory.addEventListener('click', () => {
  deleteClass(backgroundModalWindowVictory, modalWindowVictory, 'open-window', 'open-window');
  openCloseModal('auto', '1');
  buttonSaveGame.setAttribute('disabled', 'disabled');
  buttonSolution.setAttribute('disabled', 'disabled');
})

crossModalWindowVictory.addEventListener('click', () => {
  deleteClass(backgroundModalWindowVictory, modalWindowVictory, 'open-window', 'open-window');
  openCloseModal('auto', '1');
  buttonSaveGame.setAttribute('disabled', 'disabled');
  buttonSolution.setAttribute('disabled', 'disabled');
})

modalWindowVictory.addEventListener('click', (event) => {
  event.stopPropagation();
})

buttonMenuBurger.addEventListener('click', () => {
   burgerMenuWrapper.classList.toggle('burger-open');
   lineBottomButtonMenuBurger.classList.toggle('rotate-bottom');
   lineCenterButtonMenuBurger.classList.toggle('line-none');
   lineTopButtonMenuBurger.classList.toggle('rotate-top');
   buttonSound.classList.toggle('open-button-sound');
   buttonSwitchTheme.classList.toggle('open-button-theme');
   containerLinkScores.classList.toggle('open-list');
})

containerLinkScores.addEventListener('click', () =>{
  containerLinkScores.classList.toggle('open-list-results');
  document.querySelectorAll('.item__top-score').forEach((elem) =>{
    elem.classList.toggle('open-list-results')
  })
})
body.addEventListener('click',() => {
  listDropDownHard.classList.remove('list_drop-down-open');
  deleteClass(listDropDownEasy, listDropDownMedium, 'list_drop-down-open', 'list_drop-down-open');
})
