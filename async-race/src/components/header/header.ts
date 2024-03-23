import { BaseComponent } from '../../shared/utils';

export class Header extends BaseComponent {
  item: HTMLElement;

  children: HTMLElement[];

  constructor(elem: string, className: string, children: HTMLElement[]) {
    super(elem, className);
    this.children = children;
    this.item = this.addItem();
  }

  public addChildren(): HTMLElement {
    this.item.append(...this.children);
    return this.item;
  }
}
