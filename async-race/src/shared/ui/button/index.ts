import { AllButtons } from '../../types/button';
import { Button } from './button';
import { LinkButton } from './linkButton';

const buttonGarage: HTMLButtonElement = new Button('button', 'button_page-garage button').setAttrib(
  {
    type: 'button',
  },
  'TO GARAGE',
);

const buttonWinners: HTMLButtonElement = new Button('button', 'button_page-winners button').setAttrib(
  {
    type: 'button',
  },
  'TO WINNERS',
);

const CreateCar: HTMLButtonElement = new Button('button', 'button_create-car button').setAttrib(
  {
    type: 'button',
  },
  'CREATE',
);

const UpdateCar: HTMLButtonElement = new Button('button', 'button_update-car button').setAttrib(
  {
    type: 'button',
    disabled: 'disabled',
  },
  'UPDATE',
);

const Race: HTMLButtonElement = new Button('button', 'button_race button').setAttrib(
  {
    type: 'button',
  },
  'RACE',
);

const Reset: HTMLButtonElement = new Button('button', 'button_reset button').setAttrib(
  {
    type: 'button',
    disabled: 'disabled',
  },
  'RESET',
);

const GenerateCars: HTMLButtonElement = new Button('button', 'button__generate-cars button').setAttrib(
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

const PrevPage: HTMLButtonElement = new Button('button', 'button__prev-page button').setAttrib(
  {
    type: 'button',
    disabled: 'disabled',
  },
  'PREV',
);

const NextPage: HTMLButtonElement = new Button('button', 'button__next-page button').setAttrib(
  {
    type: 'button',
    disabled: 'disabled',
  },
  'NEXT',
);

export const buttonsGarage: AllButtons = {
  CreateCar,
  GenerateCars,
  Race,
  Reset,
  UpdateCar,
  PrevPage,
  NextPage,
};
