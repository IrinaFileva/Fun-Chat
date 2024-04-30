import { BaseComponent } from '../baseComponent/baseComponent';

export class LinkButton extends BaseComponent {
  href: string;

  item: HTMLLinkElement;

  button: HTMLButtonElement;

  constructor(elem: string, className: string, href: string, button: HTMLButtonElement) {
    super(elem, className);
    this.item = this.addItem() as HTMLLinkElement;
    this.href = href;
    this.button = button;
  }

  public setHrefAndButton(): HTMLLinkElement {
    this.item.href = this.href;
    this.item.append(this.button);
    return this.item;
  }
}
