import { Header } from '../components/header/header';
import { PageGarage } from '../pages/garage/garage';
import { PageWinners } from '../pages/winners/winners';
import { routerUrl } from './router/router';
import { Router } from './types/types';

export class App {
  header: Header;

  page: [PageGarage, PageWinners];

  routs: Router[];

  constructor(page: [PageGarage, PageWinners], routs: Router[], header: Header) {
    this.routs = routs;
    this.page = page;
    this.header = header;
  }

  public start(): void {
    this.header.start();
    this.page.forEach((elem) => elem.start());
    this.stopRestart();
    window.history.pushState(null, '', window.location.href.split('#')[0]);
    if (this.routs) this.initRoutes();
  }

  private initRoutes(): void {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
  }

  private renderRoute(): void {
    const hash = routerUrl.getUrl();
    const route: Router | undefined = this.routs.find((elem) => {
      if (elem.path !== hash) {
        return elem;
      }
      return undefined;
    });
    const noRoute: Router | undefined = this.routs.find((elem) => {
      if (elem.path === hash) {
        return elem;
      }
      return undefined;
    });
    if (noRoute) noRoute.component.item.classList.remove('no-visible');
    if (route) route.component.item.classList.add('no-visible');
  }

  private stopRestart() {
    window.addEventListener('keypress', (e) => {
      if (e.code === '13') {
        e.preventDefault();
      }
    });
  }
}
