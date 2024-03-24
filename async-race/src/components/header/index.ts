import { buttonCreateCar, buttonPageGarage, buttonPageWinners, buttonUpdateCar } from '../../shared/ui/button';
import { inputColorCreate, inputColorUpdate, inputCreate, inputUpdate } from '../../shared/ui/input';
import { Header } from './header';

export const header = new Header('header', 'header', [buttonPageGarage, buttonPageWinners]).addChildren([
  inputCreate,
  inputColorCreate,
  buttonCreateCar,
  inputUpdate,
  inputColorUpdate,
  buttonUpdateCar,
]);
