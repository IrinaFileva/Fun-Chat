import { buttonsGarage } from '../../shared/ui/button';
import { inputColorCreate, inputColorUpdate, inputCreate, inputUpdate } from '../../shared/ui/input';
import { Header } from './header';

export const header: HTMLElement = new Header('header', 'header', [
  buttonsGarage.buttonPageGarage,
  buttonsGarage.buttonPageWinners,
]).addChildren([
  inputCreate,
  inputColorCreate,
  buttonsGarage.buttonCreateCar,
  inputUpdate,
  inputColorUpdate,
  buttonsGarage.buttonUpdateCar,
  buttonsGarage.buttonRace,
  buttonsGarage.buttonReset,
  buttonsGarage.buttonGenerateCars,
]);
