import { ButtonForm, InputForm } from '../componentsForm';
import './styleFormMes.css';

export class FormMessage {
  item: HTMLFormElement;

  constructor() {
    this.item = document.createElement('form');
    this.item.className = 'form-message';
    this.addChildren();
  }

  private addChildren(): void {
    const inputText: HTMLInputElement = new InputForm('input-form-message', 'text').item;
    const buttonSubmit: HTMLButtonElement = new ButtonForm('btn-form-message', 'submit', 'Send').item;
    inputText.placeholder = 'Message...';
    buttonSubmit.disabled = true;
    inputText.disabled = true;
    this.item.append(inputText, buttonSubmit);
  }
}
