import { ButtonForm } from './button';

export class LinkForm {
  item: HTMLElement;

  children: HTMLButtonElement;

  constructor(nameClass: string, href: string, classChild: string, type: string, text: string) {
    this.item = document.createElement('a');
    this.item.className = nameClass;
    this.item.setAttribute('href', href);
    this.children = new ButtonForm(classChild, type, text).item;
    this.addChildren();
  }

  private addChildren(): void {
    this.item.append(this.children);
  }
}
