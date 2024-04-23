import { serverRequests } from '../../../api/serverRequests';
import { START_NEW_MESSAGE } from '../../../const/const';
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
      if (nameUser && nameUser.textContent && this.input.id === '') {
        serverRequests.sendMessage(this.input.value, nameUser.textContent);
        this.input.value = '';
        this.button.disabled = true;
      }
      if (this.input.id && this.input.value) {
        const messages: NodeListOf<HTMLElement> = document.querySelectorAll('.message-user');
        messages.forEach((item: HTMLElement) => {
          if (item.id === this.input.id) {
            const textMessage: Element | null = item.querySelector('.message-text');
            const dataMessage: Element | null = item.querySelector('.message-data');
            if (textMessage && dataMessage) {
              const oldText = dataMessage.textContent;
              textMessage.textContent = this.input.value;
              if (oldText) dataMessage.textContent = `(edit)  ${oldText.replace('(edit)', '')}`;
              textMessage.removeAttribute('style');
              serverRequests.editMessage(this.input.id, this.input.value);
              this.input.id = '';
              this.input.value = '';
              this.button.disabled = true;
            }
          }
        });
      }
      this.removeNumberMessage();
    });
  }

  private removeNumberMessage() {
    const messageBlock: HTMLElement | null = document.querySelector('.wrapper-messages');
    if (messageBlock) {
      const children: NodeListOf<HTMLElement> = messageBlock.childNodes as NodeListOf<HTMLElement>;
      const arrayChildren: HTMLElement[] = [...children];
      arrayChildren.forEach((item, index) => {
        if (item.classList.contains('line-new-message')) {
          item.remove();
          const noReadMessage = arrayChildren.slice(index + 1);
          noReadMessage.map((x) => serverRequests.changeReadStatusOfMessage(x.id));
          const lineNewMessage: HTMLElement | null = document.querySelector('.line-new-message');
          if (lineNewMessage) {
            lineNewMessage.remove();
            const child: NodeListOf<HTMLElement> = document.querySelectorAll('.item-list-name-user');
            child.forEach((elem: HTMLElement) => {
              if (elem.classList.contains('open')) {
                const next = elem.nextElementSibling;
                if (next) {
                  next.removeAttribute('style');
                  next.textContent = START_NEW_MESSAGE;
                }
              }
            });
          }
        }
      });
    }
  }
}
