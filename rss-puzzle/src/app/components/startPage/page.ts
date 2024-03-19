import background1 from '../../assets/backgroundStart1.jpg';
import background2 from '../../assets/backgroundStart2.png';
import { BaseComponent } from '../../base-component';
import { LocalStorageObj } from '../../types/interfaces';

export const startPage: HTMLElement = new BaseComponent('div', 'startPage').addElement();
const backgroundImage1: HTMLImageElement = new BaseComponent('img', 'startPage__image1').addElement() as HTMLImageElement;
const backgroundImage2: HTMLImageElement = new BaseComponent('img', 'startPage__image2').addElement() as HTMLImageElement;
const titleStartPage: HTMLElement = new BaseComponent('h1', 'startPage__title').addElement('ENGLISH PUZZLE');
const descriptionStartPage: HTMLElement = new BaseComponent('p', 'startPage__description').addElement(
  "Click on words. Collect phrases. <br>Tear off the artists' paintings.<br>Got a problem? Use the hints!",
);
export const startButton: HTMLElement = new BaseComponent('button', 'startPage__button').addElement('START &#10148;');

startButton.setAttribute('type', 'button');

backgroundImage1.src = background1;
backgroundImage2.src = background2;

const dateUser: LocalStorageObj | null = JSON.parse(localStorage.getItem('IF-Puzzle') as string);

if (dateUser) {
  const greetingUser: HTMLElement = new BaseComponent('p', 'startPage__greeting').addElement(
    `Hello!<br> ${dateUser.name} ${dateUser.lastName}`,
  );
  setTimeout((): void => {
    greetingUser.style.opacity = '1';
  }, 300);
  startPage.append(backgroundImage1, backgroundImage2, titleStartPage, descriptionStartPage, greetingUser, startButton);
} else {
  startPage.append(backgroundImage1, backgroundImage2, titleStartPage, descriptionStartPage);
}
