import wordLevel1 from '../../../assets/wordCollectionLevel1.json';
import { BaseComponent } from '../../../base-component';
import { DataLevel } from '../../../types/interfaces';
import {
  addAnEmptyItem,
  checkHintActivation,
  checkLineWords,
  compareResultStrings,
  dragAndDrop,
  lookFirstEmptyElement,
  setBackGroundPuzzle,
  setCardStyles,
  setReedsPuzzle,
} from '../../../utils';
import { audioHint, buttonAudio, buttonTranslate, buttonVolume, titleTranslate } from './header';

export const mainPageGame: HTMLElement = new BaseComponent('main', 'pageGame__main').addElement();
const gameBoard: HTMLElement = new BaseComponent('div', 'gamePage__gameBoard').addElement();
const lineWord: HTMLElement = new BaseComponent('div', 'gamePage__lineWord').addElement();
const containerButtons: HTMLElement = new BaseComponent('div', 'gamePage__container-buttons').addElement();
const buttonAutoComplete: HTMLElement = new BaseComponent('button', 'gamePage__bth-complete buttons').addElement('Auto-complete');
const buttonCheck: HTMLElement = new BaseComponent('button', 'gamePage__bth-check buttons').addElement('Check');
const buttonContinue: HTMLElement = new BaseComponent('button', 'gamePage__btn-continue buttons').addElement('Continue');
const pathAudio: string = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/';
const pathImage: string = 'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/images/';
const extraWidth: number = 20; // язычек от пазла.
const numberOffersBlock: number = 10;
const percentages: number = 100;
let positionTop: number = 0;
let proposal: number = 0;
let round: number = 0;

buttonCheck.setAttribute('disabled', '');

function startGame(tier: number, lap: number): void {
  let positionLeft: number = 0;
  checkHintActivation(buttonVolume, buttonAudio, buttonTranslate, titleTranslate);
  const lineGameBoard: HTMLElement = new BaseComponent('div', 'gamePage__lineGameBoard').addElement();
  const levelData: DataLevel = wordLevel1.rounds[lap].words[tier];
  const workingOrder: string = levelData.textExample;
  const offerSort: string[] = workingOrder.split(' ');
  const backgroundImage = `url(${pathImage}${wordLevel1.rounds[lap].levelData.imageSrc})`;
  audioHint.src = `${pathAudio}${levelData.audioExample}`;
  titleTranslate.textContent = levelData.textExampleTranslate;
  titleTranslate.style.opacity = '';
  for (let i = 0; i < offerSort.length; i += 1) {
    const word = new BaseComponent('div', 'gamePage__word drag reeds').addElement();
    const puzzle: HTMLElement = new BaseComponent('div', 'puzzle').addElement(offerSort[i]);
    const reed: HTMLElement = new BaseComponent('div', 'puzzle_reed').addElement();
    const emptyCard = new BaseComponent('div', 'gamePage__emptyCard no-drag').addElement();
    word.style.maxWidth = `calc(${percentages / offerSort.length}% + ${extraWidth}px)`;
    word.draggable = true;
    emptyCard.style.width = `${percentages / offerSort.length}%`;
    word.append(puzzle, reed);
    setReedsPuzzle(puzzle, word, workingOrder, reed);
    setBackGroundPuzzle(puzzle, reed, backgroundImage, positionLeft, positionTop, percentages / offerSort.length);
    positionLeft += percentages / offerSort.length;
    lineGameBoard.append(emptyCard);
    lineWord.append(word);
    word.addEventListener('click', (): void => {
      document.querySelectorAll('.active').forEach((elem: Element) => {
        elem.classList.remove('no-error');
        elem.classList.remove('error');
      });
      buttonCheck.setAttribute('disabled', 'disabled');
      if (!word.classList.contains('active')) {
        addAnEmptyItem(word, lineWord, percentages / offerSort.length);
        setCardStyles(word);
        const emptyItem: ChildNode | undefined = lookFirstEmptyElement(lineGameBoard.childNodes);
        if (emptyItem) {
          lineGameBoard.insertBefore(word, emptyItem);
          emptyItem.remove();
        }
      } else {
        addAnEmptyItem(word, lineGameBoard, percentages / offerSort.length);
        const emptyItem: ChildNode | undefined = lookFirstEmptyElement(lineWord.childNodes);
        if (emptyItem) {
          word.style.opacity = `0`;
          setTimeout((): void => {
            word.style.opacity = `1`;
          });
          lineWord.insertBefore(word, emptyItem);
          word.classList.remove('active');
          emptyItem.remove();
        }
      }
      checkLineWords(lineGameBoard, offerSort, buttonCheck);
      compareResultStrings(lineGameBoard, workingOrder, buttonContinue, buttonCheck, titleTranslate, buttonAudio);
    });
  }
  const puzzles = Array.from(lineWord.childNodes).sort(() => Math.random() - 0.5);
  lineWord.innerHTML = '';
  lineWord.append(...puzzles);
  dragAndDrop([lineGameBoard, lineWord], offerSort, buttonCheck, workingOrder, buttonContinue, titleTranslate, buttonAudio);
  gameBoard.append(lineGameBoard);
  positionTop += 52;
}

startGame(proposal, round);

buttonContinue.addEventListener('click', (): void => {
  proposal += 1;
  if (numberOffersBlock - 1 < proposal) {
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
    round += 1;
    proposal = 0;
    positionTop = 0;
  }
  while (lineWord.firstChild) {
    lineWord.removeChild(lineWord.firstChild);
  }
  startGame(proposal, round);
  buttonContinue.style.display = 'none';
  buttonCheck.style.display = 'block';
  buttonAutoComplete.removeAttribute('disabled');
  buttonCheck.setAttribute('disabled', 'disabled');
});

buttonCheck.addEventListener('click', (): void => {
  const wordResult: NodeListOf<HTMLElement> = document.querySelectorAll('.active');
  const workingOrder: string[] = wordLevel1.rounds[round].words[proposal].textExample.split(' ');
  wordResult.forEach((elem: HTMLElement, index: number) => {
    if (elem.textContent === workingOrder[index]) {
      elem.classList.add('no-error');
      elem.style.borderBottom = '';
    } else {
      elem.classList.add('error');
      elem.style.borderBottom = '';
    }
  });
});

buttonAutoComplete.addEventListener('click', (): void => {
  const workingOrder: string[] = wordLevel1.rounds[round].words[proposal].textExample.split(' ');
  const puzzles: NodeListOf<HTMLElement> = document.querySelectorAll('.drag');
  const lineGame: Element = gameBoard.children[proposal] as HTMLElement;
  lineWord.innerHTML = '';
  lineGame.innerHTML = '';

  for (let i = 0; i < workingOrder.length; i += 1) {
    for (let j = 0; j < puzzles.length; j += 1) {
      if (workingOrder[i] === puzzles[j].textContent) {
        puzzles[j].classList.remove('drag');
        puzzles[j].style.pointerEvents = 'none';
        lineGame.append(puzzles[j]);
      }
    }
  }

  buttonCheck.style.display = 'none';
  buttonContinue.style.display = 'block';
  buttonAutoComplete.setAttribute('disabled', 'disabled');
  titleTranslate.classList.remove('hind_no-active');
  buttonAudio.classList.remove('hind_no-active');
});

containerButtons.append(buttonAutoComplete, buttonCheck, buttonContinue);
mainPageGame.append(gameBoard, lineWord, containerButtons);
