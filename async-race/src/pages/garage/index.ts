import { PageGarage } from './garage';
import { buttonsGarage } from '../../shared/ui/button';
import { inputCreate, inputColorCreate, inputUpdate, inputColorUpdate } from '../../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../../shared/ui/text';
import { containerCars } from '../../components/containerCars/containerRoads';

export const containerPageGarage: PageGarage = new PageGarage('div', 'container__page garage', 'garage', [
  titlePageGarage,
  textPagingPageGarage,
  containerCars,
  buttonsGarage.PrevPage,
  buttonsGarage.NextPage,
]);

containerPageGarage.addChildren([
  inputCreate,
  inputColorCreate,
  buttonsGarage.CreateCar,
  inputUpdate,
  inputColorUpdate,
  buttonsGarage.UpdateCar,
  buttonsGarage.Race,
  buttonsGarage.Reset,
  buttonsGarage.GenerateCars,
]);
