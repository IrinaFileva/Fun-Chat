import { GarageController } from '../../services/garageController';
import { BaseComponent } from '../../shared/utils';

export class PageGarage extends BaseComponent {
  item: HTMLElement;

  id: string;

  children: HTMLElement[];

  controller: GarageController;

  constructor(elem: string, className: string, id: string, children: HTMLElement[]) {
    super(elem, className);
    this.item = this.addItem();
    this.id = id;
    this.children = children;
    this.controller = new GarageController();
  }

  private addContainer(kids: HTMLElement[]): HTMLElement {
    const container: HTMLElement = new BaseComponent('div', 'container__inputs-buttons').addItem();
    container.append(...kids);
    return container;
  }

  public addChildren(kids: HTMLElement[]): void {
    this.item.append(this.addContainer(kids), ...this.children);
  }

  public start(): void {
    this.item.id = this.id;
    document.body.append(this.item);
    this.controller.start();
  }
}
