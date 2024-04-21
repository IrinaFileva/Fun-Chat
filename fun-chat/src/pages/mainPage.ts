import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { Main } from '../components/main/main';

export class MainPage {
  item: HTMLElement;

  children: HTMLElement;

  constructor() {
    this.item = document.createElement('div');
    this.item.className = 'main-page';
    this.children = document.createElement('div');
    this.children.className = 'main-page-wrapper';
    this.start();
  }

  private start() {
    const header: HTMLElement = new Header().item;
    const main: HTMLElement = new Main().item;
    const footer: HTMLElement = new Footer().item;
    this.children.append(header, main, footer);
    this.item.appendChild(this.children);
  }
}
