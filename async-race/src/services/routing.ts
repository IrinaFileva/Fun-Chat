import { RouterPage } from '../app/router/router';
import { Router } from '../app/types/types';

export class Routing extends RouterPage {
  public start(): void {
    window.history.pushState(null, '', window.location.href.split('#')[0]);
    if (this.appRoutes()) this.initRoutes();
  }

  private initRoutes(): void {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
  }

  private renderRoute(): void {
    const hash: string = this.getUrl();
    const route: Router | undefined = this.appRoutes().find((elem) => {
      if (elem.path !== hash) {
        return elem;
      }
      return undefined;
    });
    const noRoute: Router | undefined = this.appRoutes().find((elem) => {
      if (elem.path === hash) {
        return elem;
      }
      return undefined;
    });
    if (noRoute) noRoute.component.item.classList.remove('no-active');
    if (route) route.component.item.classList.add('no-active');
  }
}
