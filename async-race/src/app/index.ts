import { header } from '../components/header';
import { containerPageGarage } from '../pages/garage';
import { containerPageWinner } from '../pages/winners';
import { controllerGarage } from '../services/garageController';
import { winnersController } from '../services/winnersController';
import { App } from './app';

export const newApp = new App([containerPageGarage, containerPageWinner, controllerGarage, winnersController], header);
