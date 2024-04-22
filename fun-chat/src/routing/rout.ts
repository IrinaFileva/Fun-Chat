export class RoutePage {
  path: string;

  page: HTMLElement;

  constructor(path: string, page: HTMLElement) {
    this.path = path;
    this.page = page;
  }
}
