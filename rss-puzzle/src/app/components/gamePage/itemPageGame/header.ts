import { BaseComponent } from '../../../base-component';

export const header = new BaseComponent('header', 'header').addElement();
export const titleTranslate = new BaseComponent('p', 'header__title').addElement();
export const buttonTranslate = new BaseComponent('button', 'header__button-translate').addElement('Show translation');
const containerButtonsHeader = new BaseComponent('div', 'header__container-buttons').addElement();
const buttonExit = new BaseComponent('button', 'header__button-exit').addElement('Logout');
const modalExit = new BaseComponent('div', 'modalExit').addElement("You're sure you want to log out?");
const modalExitButtonNo = new BaseComponent('button', 'modalExit__button no').addElement('No');
export const modalExitButtonYes = new BaseComponent('button', 'modalExit__button yes').addElement('Yes');
const buttonAudio: HTMLElement = new BaseComponent('button', 'header__button-audio').addElement();
export const audioHint: HTMLAudioElement = new BaseComponent('audio', '').addElement() as HTMLMediaElement;

modalExit.setAttribute('id', 'modalExit');
modalExit.setAttribute('popover', '');
modalExit.append(modalExitButtonNo, modalExitButtonYes);
buttonExit.setAttribute('popovertarget', 'modalExit');

modalExitButtonNo.addEventListener('click', () => {
  modalExit.hidePopover();
});

buttonTranslate.addEventListener('click', (): void => {
  if (buttonTranslate.textContent === 'Show translation') {
    buttonTranslate.textContent = 'Hide translation';
    titleTranslate.style.opacity = '1';
    localStorage.setItem('IF-translate', 'show');
  } else {
    buttonTranslate.textContent = 'Show translation';
    titleTranslate.style.opacity = '0';
    localStorage.setItem('IF-translate', 'hide');
  }
});

buttonAudio.addEventListener('click', (): void => {
  audioHint.play();
});

containerButtonsHeader.append(buttonExit);
header.append(buttonAudio, audioHint, titleTranslate, buttonTranslate, containerButtonsHeader, modalExit);
