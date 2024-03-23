import { header } from '../../components/header';
import { PageGarage } from './garage';

export const containerPageGarage = new PageGarage('div', 'container__page', [header]);

containerPageGarage.addChildren();
