import { BaseComponent } from '../../shared/utils';

export class PageWinners extends BaseComponent {
  item: HTMLElement;

  id: string;

  constructor(elem: string, className: string, id: string) {
    super(elem, className);
    this.item = this.addItem();
    this.id = id;
  }

  public start(): void {
    this.item.id = this.id;
    document.body.append(this.item);
  }
}
