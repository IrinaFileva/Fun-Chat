import { ServerRequests, serverRequests } from '../../../server/serverRequests';
import { MIN_LENGTH_INPUT_LOGIN, MIN_LENGTH_INPUT_PASSWORD, PATTERN_INPUT_FORM } from '../../../shared/const/const';
import { ColorElement, TextForElement } from '../../../shared/types';
import { Button, HindInput, Input, Link } from '../../../shared/ui';
import './styleForm.css';

export class FormUser {
  item: HTMLFormElement;

  inputLogin: HTMLInputElement;

  inputPassword: HTMLInputElement;

  hindInputLogin: HTMLElement;

  hindInputPassword: HTMLElement;

  btnSubmit: HTMLButtonElement;

  bthInfo: HTMLElement;

  requests: ServerRequests;

  constructor() {
    this.item = document.createElement('form');
    this.item.className = 'form-user';
    this.inputLogin = new Input('input-login', 'text').item;
    this.inputPassword = new Input('input-password', 'password').item;
    this.hindInputLogin = new HindInput('hind-input-login').item;
    this.hindInputPassword = new HindInput('hind-input-password').item;
    this.btnSubmit = new Button('button-submit', 'submit', TextForElement.BtnLogin).item;
    this.bthInfo = new Link('link-form', '#info', 'button-info', 'button', TextForElement.BtnInfo).item;
    this.requests = serverRequests;
    this.start();
  }

  private start(): void {
    this.item.innerText = TextForElement.Form;
    this.btnSubmit.disabled = true;
    this.item.append(
      this.inputLogin,
      this.hindInputLogin,
      this.inputPassword,
      this.hindInputPassword,
      this.btnSubmit,
      this.bthInfo,
    );
    this.handlerForm();
    this.handlerInputLogin();
    this.handlerInputPassword();
  }

  private handlerForm(): void {
    this.item.addEventListener('submit', (elem: SubmitEvent) => {
      elem.preventDefault();
      elem.stopPropagation();
      this.requests.UserLogin(this.inputLogin.value, this.inputPassword.value);
    });
  }

  private handlerInputLogin(): void {
    this.inputLogin.addEventListener('input', () => {
      if (this.inputLogin.value !== '' && this.inputLogin.value[0] !== this.inputLogin.value[0].toUpperCase()) {
        this.inputLogin.style.borderColor = ColorElement.Red;
        this.hindInputLogin.innerHTML = TextForElement.HindLogin;
      } else {
        this.inputLogin.style.borderColor = ColorElement.Black;
        this.hindInputLogin.innerHTML = '';
      }
      this.unlockBtnLogin();
      const hindError: Element | null = document.querySelector('.message-error');
      if (hindError) hindError.remove();
    });

    this.inputLogin.addEventListener('change', () => {
      if (this.inputLogin.value.length < MIN_LENGTH_INPUT_LOGIN) {
        this.inputLogin.style.borderColor = ColorElement.Red;
        this.hindInputLogin.innerHTML = TextForElement.HindLoginLength;
      }
    });
  }

  private handlerInputPassword(): void {
    this.inputPassword.addEventListener('input', () => {
      if (PATTERN_INPUT_FORM.test(this.inputPassword.value)) {
        this.inputPassword.style.borderColor = ColorElement.Red;
        this.hindInputPassword.innerHTML = TextForElement.HindPassword;
      } else {
        this.inputPassword.style.borderColor = ColorElement.Black;
        this.hindInputPassword.innerHTML = '';
      }
      this.unlockBtnLogin();
      const hindError: Element | null = document.querySelector('.message-error');
      if (hindError) hindError.remove();
    });

    this.inputPassword.addEventListener('change', () => {
      if (this.inputPassword.value.length < MIN_LENGTH_INPUT_PASSWORD) {
        this.inputPassword.style.borderColor = ColorElement.Red;
        this.hindInputPassword.innerHTML = TextForElement.HindPasswordLength;
      }
    });
  }

  private unlockBtnLogin(): void {
    if (
      this.inputPassword.value.length >= MIN_LENGTH_INPUT_PASSWORD &&
      this.inputLogin.value.length >= MIN_LENGTH_INPUT_LOGIN &&
      this.inputPassword.style.borderColor === ColorElement.Black &&
      this.inputLogin.style.borderColor === ColorElement.Black
    ) {
      this.btnSubmit.disabled = false;
    }
  }
}
