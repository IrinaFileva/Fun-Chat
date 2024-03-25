import { PageGarage } from './garage';
import { buttonsGarage } from '../../shared/ui/button';
import { inputCreate, inputColorCreate, inputUpdate, inputColorUpdate } from '../../shared/ui/input';

export const containerPageGarage = new PageGarage('div', 'container__page garage', 'garage');

containerPageGarage.addChildren([
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
