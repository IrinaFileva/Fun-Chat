import { BaseComponent } from '../../../base-component';

export const buttonLogin = new BaseComponent('button', 'buttonLogin').addElement('Login');
buttonLogin.setAttribute('disabled', '');
buttonLogin.setAttribute('type', 'submit');
