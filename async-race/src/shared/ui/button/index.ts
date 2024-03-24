import { Button } from './button';

export const buttonPageGarage: HTMLButtonElement = new Button('button', 'button_page-garage button').setAttributeButton(
  {
    type: 'button',
  },
  'TO GARAGE',
);

export const buttonPageWinners: HTMLButtonElement = new Button(
  'button',
  'button_page-winners button',
).setAttributeButton(
  {
    type: 'button',
  },
  'TO WINNERS',
);

export const buttonCreateCar: HTMLButtonElement = new Button('button', 'button_create-car button').setAttributeButton(
  {
    type: 'button',
  },
  'CREATE',
);

export const buttonUpdateCar: HTMLButtonElement = new Button('button', 'button_update-car button').setAttributeButton(
  {
    type: 'button',
  },
  'UPDATE',
);
