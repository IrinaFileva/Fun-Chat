import { PageGarage } from './garage';
import { buttonsGarage } from '../../shared/ui/button';
import { inputCreate, inputColorCreate, inputUpdate, inputColorUpdate } from '../../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../../shared/ui/text';
import { containerCars } from '../../components/containerCars/containerRoads';

export const containerPageGarage: PageGarage = new PageGarage('div', 'container__page garage', 'garage', [
  titlePageGarage,
  textPagingPageGarage,
  containerCars,
  buttonsGarage.buttonPrevPage,
  buttonsGarage.buttonNextPage,
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
