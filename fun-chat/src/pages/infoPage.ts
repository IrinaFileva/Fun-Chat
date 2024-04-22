export class InfoPage {
  item: HTMLElement;

  children: HTMLElement;

  constructor() {
    this.item = document.createElement('div');
    this.item.className = 'info-page';
    this.children = document.createElement('div');
    this.start();
  }

  private start() {
    this.item.appendChild(this.children);
  }
}
