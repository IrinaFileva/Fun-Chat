import { BaseComponent } from '../../../shared/utils';

export class Road extends BaseComponent {
  item: HTMLElement;

  children: HTMLElement[];

  constructor(elem: string, className: string, children: HTMLElement[]) {
    super(elem, className);
    this.item = this.addItem();
    this.children = children;
  }

  public addChildren(): HTMLElement {
    this.item.append(...this.children);
    return this.item;
  }
}
