import { ServerRequests, serverRequests } from '../../../api/serverRequests ';
import { MIN_LENGTH_INPUT_LOGIN, MIN_LENGTH_INPUT_PASSWORD, PATTERN_INPUT_FORM } from '../../../const/const';
import { TextForElement } from '../../../types/elementTypes';
import { ButtonForm, HindInput, InputForm, LinkForm } from '../componentsForm';
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
    this.inputLogin = new InputForm('input-login', 'text').item;
    this.inputPassword = new InputForm('input-password', 'password').item;
    this.hindInputLogin = new HindInput('hind-input-login').item;
    this.hindInputPassword = new HindInput('hind-input-password').item;
    this.btnSubmit = new ButtonForm('button-submit', 'submit', 'Login').item;
    this.bthInfo = new LinkForm('link-form', '#info', 'button-info', 'button', 'Info').item;
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
    this.item.addEventListener('submit', (elem) => {
      elem.preventDefault();
      this.requests.UserLogin(this.inputLogin.value, this.inputPassword.value);
      this.requests.requestAllUsers();
    });
  }

  private handlerInputLogin() {
    this.inputLogin.addEventListener('input', () => {
      if (this.inputLogin.value !== '' && this.inputLogin.value[0] !== this.inputLogin.value[0].toUpperCase()) {
        this.inputLogin.style.borderColor = 'red';
        this.hindInputLogin.innerHTML = TextForElement.HindLogin;
      } else {
        this.inputLogin.style.borderColor = 'black';
        this.hindInputLogin.innerHTML = '';
      }
      this.unlockBtnLogin();
    });

    this.inputLogin.addEventListener('change', () => {
      if (this.inputLogin.value.length < MIN_LENGTH_INPUT_LOGIN) {
        this.inputLogin.style.borderColor = 'red';
        this.hindInputLogin.innerHTML = TextForElement.HindLoginLength;
      }
    });
  }

  private handlerInputPassword() {
    this.inputPassword.addEventListener('input', () => {
      if (PATTERN_INPUT_FORM.test(this.inputPassword.value)) {
        this.inputPassword.style.borderColor = 'red';
        this.hindInputPassword.innerHTML = TextForElement.HindPassword;
      } else {
        this.inputPassword.style.borderColor = 'black';
        this.hindInputPassword.innerHTML = '';
      }
      this.unlockBtnLogin();
    });

    this.inputPassword.addEventListener('change', () => {
      if (this.inputPassword.value.length < MIN_LENGTH_INPUT_PASSWORD) {
        this.inputPassword.style.borderColor = 'red';
        this.hindInputPassword.innerHTML = TextForElement.HindLoginLength;
      }
    });
  }

  private unlockBtnLogin() {
    if (
      this.inputPassword.value.length >= MIN_LENGTH_INPUT_PASSWORD &&
      this.inputLogin.value.length >= MIN_LENGTH_INPUT_LOGIN &&
      this.inputPassword.style.borderColor === 'black' &&
      this.inputLogin.style.borderColor === 'black'
    ) {
      this.btnSubmit.disabled = false;
    }
  }
}
