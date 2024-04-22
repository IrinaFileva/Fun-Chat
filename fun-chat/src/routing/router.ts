import { InfoPage } from '../pages/infoPage';
import { MainPage } from '../pages/mainPage';
import { ProfilePage } from '../pages/profilePage';
import { RoutePage } from './rout';

export class Router {
  routes: RoutePage[];

  constructor() {
    this.routes = [
      new RoutePage('#info', new InfoPage().item),
      new RoutePage('#main', new MainPage().item),
      new RoutePage('', new ProfilePage().item),
    ];
    this.start();
  }

  private start(): void {
    window.addEventListener('load', () => this.loadRoute());
    window.addEventListener('popstate', () => this.loadRoute());
    document.body.addEventListener('click', (elem: MouseEvent) => {
      const target: HTMLLinkElement = elem.target as HTMLLinkElement;
      if (target && target.matches('[data-link]')) {
        elem.preventDefault();
        this.navigate(target.href);
      }
    });
  }

  private navigate(url: string): void {
    window.history.pushState(null, '', url);
    this.loadRoute();
  }

  private loadRoute(): void {
    let route: RoutePage | undefined =
      this.routes.find((rout) => rout.path === window.location.hash) || this.routes.find((rout) => rout.path === '');
    if (route && route.path === '#main' && sessionStorage.length === 0) {
      route = this.routes.find(() => this.routes.find((rout) => rout.path === ''));
      window.location.hash = '';
    }
    if (route && route.path === '' && sessionStorage.length !== 0) {
      route = this.routes.find(() => this.routes.find((rout) => rout.path === 'main'));
      window.location.hash = 'main';
    }
    if (route) {
      document.body.innerHTML = '';
      document.body.appendChild(route.page);
    }
  }
}
