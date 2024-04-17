import { serverRequests } from '../../../api/serverRequests ';
import { TextForElement } from '../../../types/elementTypes';
import { ButtonForm, InputForm } from '../componentsForm';
import './styleFormMes.css';

export class FormMessage {
  item: HTMLFormElement;

  input: HTMLInputElement;

  button: HTMLButtonElement;

  constructor() {
    this.item = document.createElement('form');
    this.item.className = 'form-message';
    this.input = new InputForm('input-form-message', 'text').item;
    this.button = new ButtonForm('btn-form-message', 'submit', 'Send').item;
    this.addChildren();
    this.handlerForm();
  }

  private addChildren(): void {
    this.input.placeholder = TextForElement.inputMessage;
    this.button.disabled = true;
    this.input.disabled = true;
    this.item.append(this.input, this.button);
  }

  private handlerForm(): void {
    this.item.addEventListener('submit', (elem: SubmitEvent) => {
      elem.preventDefault();
      const nameUser: HTMLElement | null = document.querySelector('.titleName-header-wrapper');
      const messageBlock: HTMLElement | null = document.querySelector('.wrapper-messages');
      if (messageBlock && messageBlock.classList.contains('wrapper-message-start')) {
        messageBlock.classList.remove('wrapper-message-start');
        messageBlock.textContent = '';
      }
      if (nameUser && nameUser.textContent) {
        serverRequests.sendMessage(this.input.value, nameUser.textContent);
        this.input.value = '';
      }
    });
  }
}
