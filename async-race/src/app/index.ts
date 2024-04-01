import { header } from '../components/header';
import { containerPageGarage } from '../pages/garage';
import { containerPageWinner } from '../pages/winners';
import { App } from './app';

export const newApp = new App([containerPageGarage, containerPageWinner], header);
