import { BaseComponent } from '../../shared/utils';

export class Header extends BaseComponent {
  item: HTMLElement;

  children: HTMLElement[];

  constructor(elem: string, className: string, children: HTMLElement[]) {
    super(elem, className);
    this.children = children;
    this.item = this.addItem();
  }

  private addContainer(kids: HTMLElement[]): HTMLElement {
    const container: HTMLElement = new BaseComponent('div', 'container__inputCreate').addItem();
    container.append(...kids);
    return container;
  }

  public addChildren(kids: HTMLElement[]): HTMLElement {
    this.item.append(...this.children, this.addContainer(kids));
    return this.item;
  }
}
