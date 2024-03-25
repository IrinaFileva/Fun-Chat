import { BaseComponent } from '../../shared/utils';

export class PageWinners extends BaseComponent {
  item: HTMLElement;

  id: string;

  children: HTMLElement[];

  constructor(elem: string, className: string, id: string, children: HTMLElement[]) {
    super(elem, className);
    this.item = this.addItem();
    this.id = id;
    this.children = children;
  }

  public start(): void {
    this.item.id = this.id;
    this.item.append(...this.children);
    document.body.append(this.item);
  }
}
