import { PageGarage } from '../../pages/garage/garage';
import { PageWinners } from '../../pages/winners/winners';

export interface Router {
  path: string;
  component: PageGarage | PageWinners;
}

export interface RouterUrl {
  getUrl: () => string;
}
