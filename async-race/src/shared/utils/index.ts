import { COLOR_INPUT_VALUE } from '../const/const';

export class BaseComponent {
  elem: string;

  className: string;

  constructor(elem: string, className: string) {
    this.elem = elem;
    this.className = className;
  }

  public addItem(text?: string): HTMLElement {
    const item: HTMLElement = document.createElement(this.elem);
    item.className = this.className;
    if (text) item.innerHTML = text;
    return item;
  }
}

export function setDisabled(input: HTMLInputElement, input1: HTMLInputElement, button: HTMLButtonElement): void {
  input.setAttribute('disabled', 'disabled');
  input.value = '';
  input1.setAttribute('disabled', 'disabled');
  input1.value = COLOR_INPUT_VALUE;
  button.setAttribute('disabled', 'disabled');
}

export function resetValueInput(input: HTMLInputElement, inputColor: HTMLInputElement): void {
  input.style.border = '2px solid grey';
  input.value = '';
  inputColor.value = COLOR_INPUT_VALUE;
}
