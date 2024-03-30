import { containerPageGarage } from '../../pages/garage';
import { containerPageWinner } from '../../pages/winners';
import { Router } from '../types/types';

export class RouterPage {
  public appRoutes(): Router[] {
    return [
      { path: 'garage', component: containerPageGarage },
      { path: 'winners', component: containerPageWinner },
    ];
  }

  public getUrl(): string {
    return window.location.hash.slice(1);
  }
}
