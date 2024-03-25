import { PageGarage } from './garage';
import { buttonsGarage } from '../../shared/ui/button';
import { inputCreate, inputColorCreate, inputUpdate, inputColorUpdate } from '../../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../../shared/ui/text';

export const containerPageGarage = new PageGarage('div', 'container__page garage', 'garage', [
  titlePageGarage,
  textPagingPageGarage,
]);

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
