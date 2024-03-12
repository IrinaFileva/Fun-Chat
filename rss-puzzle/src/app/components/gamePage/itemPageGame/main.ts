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
    if (!word.classList.contains('active')) {
      const swapCard: HTMLElement = new BaseComponent('div', 'gamePage__word').addElement();
      swapCard.style.width = `${widthCard}%`;
      swapCard.style.border = 'none';
      lineWord.insertBefore(swapCard, word);
      const emptyItem: ChildNode | undefined = Array.from(lineGameBoard.childNodes).find((elem: ChildNode): ChildNode | undefined => {
        if (!elem.textContent) return elem;
        return undefined;
      });
      word.style.maxWidth = `${widthCard}%`;
      word.style.width = `100%`;
      word.style.borderBottom = '1px solid black';
      word.style.opacity = `0`;
      word.classList.add('active');
      setTimeout((): void => {
        word.style.opacity = `1`;
      });
      if (emptyItem) {
        lineGameBoard.insertBefore(word, emptyItem);
        emptyItem.remove();
      } else {
        lineGameBoard.append(word);
      }
    } else {
      const swapCard: HTMLElement = new BaseComponent('div', 'gamePage__word').addElement();
      swapCard.style.width = `${widthCard}%`;
      swapCard.style.border = 'none';
      lineGameBoard.insertBefore(swapCard, word);
      const emptyItem: ChildNode | undefined = Array.from(lineWord.childNodes).find((elem: ChildNode): ChildNode | undefined => {
        if (!elem.textContent) return elem;
        return undefined;
      });
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
  });
}
gameBoard.append(lineGameBoard);

mainPageGame.append(gameBoard, lineWord);
