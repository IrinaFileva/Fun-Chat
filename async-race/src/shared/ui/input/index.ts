import { Input } from './input';

export const inputCreate: HTMLInputElement = new Input('input', 'input-create input').setAttributeButton({
  type: 'text',
});

export const inputUpdate: HTMLInputElement = new Input('input', 'input-update input').setAttributeButton({
  type: 'text',
  disabled: 'disabled',
});

export const inputColorCreate: HTMLInputElement = new Input('input', 'input_create-color').setAttributeButton({
  type: 'color',
});

export const inputColorUpdate: HTMLInputElement = new Input('input', 'input_update-color').setAttributeButton({
  type: 'color',
  disabled: 'disabled',
});
