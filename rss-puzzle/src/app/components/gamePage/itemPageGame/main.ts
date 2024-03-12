import wordLevel1 from '../../../assets/wordCollectionLevel1.json';
import { BaseComponent } from '../../../base-component';

export const mainPageGame: HTMLElement = new BaseComponent('main', 'pageGame__main').addElement();

const gameBoard: HTMLElement = new BaseComponent('div', 'gamePage__gameBoard').addElement();
const lineGameBoard: HTMLElement = new BaseComponent('div', 'gamePage__lineGameBoard').addElement();
const lineWord: HTMLElement = new BaseComponent('div', 'gamePage__lineWord').addElement();

const offerSort: string[] = wordLevel1.rounds[0].words[0].textExample.split(' ').sort(() => Math.random() - 0.5);
const lengthOffer: number = offerSort.join(' ').replaceAll(' ', '').length;
const percentages: number = 100;

for (let i = 0; i < offerSort.length; i += 1) {
  const word = new BaseComponent('div', 'gamePage__word').addElement(offerSort[i]);
  const widthCard = (offerSort[i].length * percentages) / lengthOffer;
  word.style.width = `${widthCard}%`;
  lineWord.append(word);
  word.addEventListener('click', (): void => {
    const swapCard: HTMLElement = new BaseComponent('div', 'gamePage__word').addElement();
    swapCard.style.width = `${widthCard}%`;
    swapCard.style.border = 'none';
    lineWord.insertBefore(swapCard, word);
    word.style.maxWidth = `${widthCard}%`;
    word.style.width = `100%`;
    word.style.borderBottom = '1px solid black';
    lineGameBoard.append(word);
  });
}

gameBoard.append(lineGameBoard);

mainPageGame.append(gameBoard, lineWord);
