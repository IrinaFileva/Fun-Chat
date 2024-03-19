import { BaseComponent } from '../../../base-component';

export const buttonLogin: HTMLElement = new BaseComponent('button', 'buttonLogin').addElement('Login');
buttonLogin.setAttribute('disabled', '');
buttonLogin.setAttribute('type', 'submit');
