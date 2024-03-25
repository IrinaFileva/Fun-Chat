import { AllButtons } from '../../types/button';
import { Button } from './button';
import { LinkButton } from './linkButton';

const buttonGarage: HTMLButtonElement = new Button('button', 'button_page-garage button').setAttributeButton(
  {
    type: 'button',
  },
  'TO GARAGE',
);

const buttonWinners: HTMLButtonElement = new Button('button', 'button_page-winners button').setAttributeButton(
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

export const buttonPageGarage: HTMLLinkElement = new LinkButton(
  'a',
  'link_button-garage',
  '#garage',
  buttonGarage,
).setHrefAndButton();

export const buttonPageWinners: HTMLLinkElement = new LinkButton(
  'a',
  'link_button-winners',
  '#winners',
  buttonWinners,
).setHrefAndButton();

export const buttonsGarage: AllButtons = {
  buttonCreateCar,
  buttonGenerateCars,
  buttonRace,
  buttonReset,
  buttonUpdateCar,
};
