import { COLOR_INPUT_VALUE } from '../const/const';

export function setDisabled(input: HTMLInputElement, input1: HTMLInputElement, button: HTMLButtonElement): void {
  input.disabled = true;
  input.value = '';
  input1.disabled = true;
  input1.value = COLOR_INPUT_VALUE;
  button.disabled = true;
}

export function resetValueInput(input: HTMLInputElement, inputColor: HTMLInputElement): void {
  input.style.border = '2px solid grey';
  input.value = '';
  inputColor.value = COLOR_INPUT_VALUE;
}

export function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function removeDisabled(input: HTMLInputElement, input1: HTMLInputElement, button: HTMLButtonElement): void {
  input.disabled = false;
  input1.disabled = false;
  button.disabled = false;
}
