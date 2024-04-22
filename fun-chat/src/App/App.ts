import { ServerRequests, serverRequests } from '../api/serverRequests';
import { Router } from '../routing/router';

export class App {
  router: Router;

  api: ServerRequests;

  constructor() {
    this.router = new Router();
    this.api = serverRequests;
  }
}
