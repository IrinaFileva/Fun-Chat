import { Header } from '../components/header/header';
import { PageGarage } from '../pages/garage/garage';
import { PageWinners } from '../pages/winners/winners';
import { GarageController } from '../services/garageController';
import { Routing } from '../services/routing';

export class App {
  header: Header;

  page: [PageGarage, PageWinners, GarageController];

  routs: Routing;

  constructor(page: [PageGarage, PageWinners, GarageController], header: Header) {
    this.routs = new Routing();
    this.page = page;
    this.header = header;
  }

  public start(): void {
    this.header.start();
    this.page.forEach((elem) => elem.start());
    this.stopRestart();
    this.routs.start();
  }

  private stopRestart(): void {
    window.addEventListener('keypress', (e: KeyboardEvent): void => {
      if (e.code === '13') {
        e.preventDefault();
      }
    });
  }
}
