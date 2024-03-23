import { BaseComponent } from '../../shared/utils';

export class PageGarage extends BaseComponent {
  item: HTMLElement;

  children: HTMLElement[];

  constructor(elem: string, className: string, children: HTMLElement[]) {
    super(elem, className);
    this.children = children;
    this.item = this.addItem();
  }

  public addChildren(): void {
    this.item.append(...this.children);
  }

  public start(): void {
    document.body.append(this.item);
  }
}
