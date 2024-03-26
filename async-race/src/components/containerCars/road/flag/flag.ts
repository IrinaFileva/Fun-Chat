import { BaseComponent } from '../../../../shared/utils';

export class Flag extends BaseComponent {
  path: string;

  item: HTMLElement;

  constructor(elem: string, className: string, path: string) {
    super(elem, className);
    this.item = this.addItem();
    this.path = path;
  }

  public addImage(): HTMLElement {
    this.item.innerHTML = this.path;
    return this.item;
  }
}
