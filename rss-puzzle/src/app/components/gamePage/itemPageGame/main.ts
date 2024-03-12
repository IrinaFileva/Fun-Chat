import wordLevel1 from '../../../assets/wordCollectionLevel1.json';
import { BaseComponent } from '../../../base-component';
import { addAnEmptyItem, compareResultStrings, lookFirstEmptyElement, setCardStyles } from '../../../utils';

export const mainPageGame: HTMLElement = new BaseComponent('main', 'pageGame__main').addElement();
const gameBoard: HTMLElement = new BaseComponent('div', 'gamePage__gameBoard').addElement();
const lineWord: HTMLElement = new BaseComponent('div', 'gamePage__lineWord').addElement();
const containerButtons: HTMLElement = new BaseComponent('div', 'gamePage__container-buttons').addElement();
const buttonContinue: HTMLElement = new BaseComponent('button', 'gamePage__btn-continue').addElement('Continue');
const numberOffersBlock: number = 10;
let proposal: number = 0;
let round: number = 0;

function startGame(tier: number, lap: number): void {
  const lineGameBoard: HTMLElement = new BaseComponent('div', 'gamePage__lineGameBoard').addElement();
  const workingOrder: string = wordLevel1.rounds[lap].words[tier].textExample;
  const offerSort: string[] = workingOrder.split(' ').sort(() => Math.random() - 0.5);
  const lengthOffer: number = offerSort.join(' ').replaceAll(' ', '').length;
  const percentages: number = 100;

  for (let i = 0; i < offerSort.length; i += 1) {
    const word = new BaseComponent('div', 'gamePage__word').addElement(offerSort[i]);
    const widthCard = (offerSort[i].length * percentages) / lengthOffer;
    word.style.width = `${widthCard}%`;
    lineWord.append(word);
    word.addEventListener('click', (): void => {
      if (!word.classList.contains('active')) {
        addAnEmptyItem(word, lineWord, widthCard);
        setCardStyles(word, widthCard);
        const emptyItem: ChildNode | undefined = lookFirstEmptyElement(lineGameBoard);
        if (emptyItem) {
          lineGameBoard.insertBefore(word, emptyItem);
          emptyItem.remove();
        } else {
          lineGameBoard.append(word);
        }
      } else {
        addAnEmptyItem(word, lineGameBoard, widthCard);
        const emptyItem: ChildNode | undefined = lookFirstEmptyElement(lineWord);
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
      compareResultStrings(lineGameBoard, workingOrder, buttonContinue);
    });
  }
  gameBoard.append(lineGameBoard);
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
  }
  while (lineWord.firstChild) {
    lineWord.removeChild(lineWord.firstChild);
  }
  startGame(proposal, round);
  buttonContinue.style.display = 'none';
});

containerButtons.append(buttonContinue);
mainPageGame.append(gameBoard, lineWord, containerButtons);
