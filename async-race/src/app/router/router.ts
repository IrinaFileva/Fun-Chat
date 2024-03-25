import { containerPageGarage } from '../../pages/garage';
import { containerPageWinner } from '../../pages/winners';
import { Router, RouterUrl } from '../types/types';

export const appRoutes: Router[] = [
  { path: 'garage', component: containerPageGarage },
  { path: 'winners', component: containerPageWinner },
];

export const routerUrl: RouterUrl = {
  getUrl(): string {
    return window.location.hash.slice(1);
  },
};
