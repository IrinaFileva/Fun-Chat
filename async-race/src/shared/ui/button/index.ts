import { AllButtons } from '../../types/button';
import { Button } from './button';

const buttonPageGarage: HTMLButtonElement = new Button('button', 'button_page-garage button').setAttributeButton(
  {
    type: 'button',
  },
  'TO GARAGE',
);

const buttonPageWinners: HTMLButtonElement = new Button('button', 'button_page-winners button').setAttributeButton(
  {
    type: 'button',
  },
  'TO WINNERS',
);

const buttonCreateCar: HTMLButtonElement = new Button('button', 'button_create-car button').setAttributeButton(
  {
    type: 'button',
  },
  'CREATE',
);

const buttonUpdateCar: HTMLButtonElement = new Button('button', 'button_update-car button').setAttributeButton(
  {
    type: 'button',
  },
  'UPDATE',
);

const buttonRace: HTMLButtonElement = new Button('button', 'button_race button').setAttributeButton(
  {
    type: 'button',
  },
  'RACE',
);

const buttonReset: HTMLButtonElement = new Button('button', 'button_reset button').setAttributeButton(
  {
    type: 'button',
  },
  'RESET',
);

const buttonGenerateCars: HTMLButtonElement = new Button('button', 'button__generate-cars button').setAttributeButton(
  {
    type: 'button',
  },
  'GENERATE CARS',
);

export const buttonsGarage: AllButtons = {
  buttonCreateCar,
  buttonGenerateCars,
  buttonPageGarage,
  buttonPageWinners,
  buttonRace,
  buttonReset,
  buttonUpdateCar,
};
