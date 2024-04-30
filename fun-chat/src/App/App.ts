import { ServerRequests, serverRequests } from '../server/serverRequests';
import { Router } from '../routing/router';

export class App {
  private router: Router;

  private api: ServerRequests;

  constructor() {
    this.router = new Router();
    this.api = serverRequests;
  }
}
