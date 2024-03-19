import { BaseComponent } from '../../../base-component';
import { ValuesAttributes } from '../../../types/interfaces';
import { buttonLogin } from './button';

export class AddInput {
  item: BaseComponent;

  constructor(elem: string, className: string) {
    this.item = new BaseComponent(elem, className);
  }

  setAttributesAndValues(values: ValuesAttributes): HTMLInputElement {
    const element: HTMLInputElement = this.item.addElement() as HTMLInputElement;
    element.setAttribute('type', values.type);
    element.setAttribute('required', values.required);
    element.setAttribute('minlength', values.minlength);
    if (values.autofocus) element.setAttribute('autofocus', values.autofocus);
    return element;
  }
}

export const inputName: HTMLInputElement = new AddInput('input', 'startForm__input').setAttributesAndValues({
  type: 'text',
  required: '',
  minlength: '3',
  autofocus: 'autofocus',
});

export const inputLastName: HTMLInputElement = new AddInput('input', 'startForm__input').setAttributesAndValues({
  type: 'text',
  required: '',
  minlength: '4',
});

export const spanHintName: HTMLElement = new BaseComponent('p', 'startForm__input_hint').addElement('');
export const spanHintLastName: HTMLElement = new BaseComponent('p', 'startForm__input_hint').addElement('');
const pattern: RegExp = /[^A-z-]/;

inputName.addEventListener('input', (): void => {
  if (pattern.test(inputName.value)) {
    inputName.style.borderColor = 'red';
    spanHintName.textContent = 'Enter the name using the English';
  } else if (inputName.value !== '' && inputName.value[0] !== inputName.value[0].toUpperCase()) {
    inputName.style.borderColor = 'red';
    spanHintName.textContent = 'Enter the name with a capital letter';
  } else {
    inputName.style.borderColor = 'black';
    spanHintName.textContent = '';
  }
  if (
    inputName.value.length >= 3 &&
    inputLastName.value.length >= 4 &&
    inputLastName.style.borderColor === 'black' &&
    inputName.style.borderColor === 'black'
  ) {
    buttonLogin.removeAttribute('disabled');
  } else {
    buttonLogin.setAttribute('disabled', '');
  }
});

inputLastName.addEventListener('input', (): void => {
  if (pattern.test(inputLastName.value)) {
    inputLastName.style.borderColor = 'red';
    spanHintLastName.textContent = 'Enter the Last name using the English';
  } else if (inputLastName.value !== '' && inputLastName.value[0] !== inputLastName.value[0].toUpperCase()) {
    inputLastName.style.borderColor = 'red';
    spanHintLastName.textContent = 'Enter the Last name with a capital letter';
  } else {
    inputLastName.style.borderColor = 'black';
    spanHintLastName.textContent = '';
  }
  if (
    inputName.value.length >= 3 &&
    inputLastName.value.length >= 4 &&
    inputLastName.style.borderColor === 'black' &&
    inputName.style.borderColor === 'black'
  ) {
    buttonLogin.removeAttribute('disabled');
  } else {
    buttonLogin.setAttribute('disabled', '');
  }
});

inputName.addEventListener('change', (): void => {
  if (inputName.value.length < 3) {
    spanHintName.textContent = `Minimum quantity of letters 3, now ${inputName.value.length}`;
  }
});

inputLastName.addEventListener('change', (): void => {
  if (inputLastName.value.length < 4) {
    spanHintLastName.textContent = `Minimum number of letters 4, now ${inputLastName.value.length}`;
  }
});
