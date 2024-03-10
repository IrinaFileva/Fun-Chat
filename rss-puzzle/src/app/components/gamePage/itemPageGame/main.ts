import wordLevel1 from '../../../assets/wordCollectionLevel1.json';
import { BaseComponent } from '../../../base-component';


export const mainPageGame: HTMLElement = new BaseComponent('main', 'pageGame__main').addElement();

const gameBoard: HTMLElement = new BaseComponent('div', 'gamePage__gameBoard').addElement();
const lineGameBoard: HTMLElement = new BaseComponent('div', 'gamePage__lineGameBoard').addElement()
const lineWord: HTMLElement = new BaseComponent('div', 'gamePage__lineWord').addElement();

const offerSort: string[] = wordLevel1.rounds[0].words[0].textExample.split(' ').sort(() => Math.random() - 0.5);

for(let i = 0; i < offerSort.length; i+=1){
    const word: HTMLElement = new BaseComponent('div', 'gamePage__word').addElement(offerSort[i]);
    lineWord.append(word);
    word.addEventListener('click', ():void => {
        lineGameBoard.append(word);
    })
}

gameBoard.append(lineGameBoard)

mainPageGame.append(gameBoard, lineWord)