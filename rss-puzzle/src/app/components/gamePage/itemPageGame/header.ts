import { BaseComponent } from '../../../base-component';

export const header: HTMLElement = new BaseComponent('header', 'header').addElement();
export const titleTranslate: HTMLElement = new BaseComponent('p', 'header__title').addElement();
export const buttonTranslate: HTMLElement = new BaseComponent('button', 'header__button-translate').addElement();
export const modalExitButtonYes: HTMLElement = new BaseComponent('button', 'modalExit__button yes').addElement('Yes');
export const audioHint: HTMLAudioElement = new BaseComponent('audio', '').addElement() as HTMLMediaElement;
const buttonExit: HTMLElement = new BaseComponent('button', 'header__button-exit').addElement();
const modalExit: HTMLElement = new BaseComponent('div', 'modalExit').addElement("You're sure you want to log out?");
const modalExitButtonNo: HTMLElement = new BaseComponent('button', 'modalExit__button no').addElement('No');
const buttonAudio: HTMLElement = new BaseComponent('button', 'header__button-audio').addElement();

modalExit.setAttribute('id', 'modalExit');
modalExit.setAttribute('popover', '');
modalExit.append(modalExitButtonNo, modalExitButtonYes);
buttonExit.setAttribute('popovertarget', 'modalExit');

modalExitButtonNo.addEventListener('click', (): void => {
  modalExit.hidePopover();
});

buttonTranslate.addEventListener('click', (): void => {
  buttonTranslate.classList.toggle('button_no-active');
  titleTranslate.classList.toggle('translate_no-active');
});

buttonAudio.addEventListener('click', (): void => {
  audioHint.play();
});

audioHint.addEventListener('play', (): void => {
  buttonAudio.classList.add('button_audio');
});

audioHint.addEventListener('ended', (): void => {
  buttonAudio.classList.remove('button_audio');
});

header.append(buttonAudio, audioHint, titleTranslate, buttonTranslate, buttonExit, modalExit);
