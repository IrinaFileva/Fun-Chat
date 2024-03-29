import { Button } from '../../../../shared/ui/button/button';
import { TextOnPage } from '../../../../shared/ui/text/text';
import { BaseComponent } from '../../../../shared/utils';

export class StartPoint extends BaseComponent {
  item: HTMLElement;

  id: string;

  brandCar: string;

  constructor(elem: string, className: string, id: string, nameCar: string) {
    super(elem, className);
    this.item = this.addItem();
    this.id = id;
    this.brandCar = nameCar;
  }

  public addChildren(): HTMLElement {
    const select: HTMLButtonElement = new Button('button', 'select button').setAttributeButton(
      { type: 'button' },
      'SELECT',
    );
    const remove: HTMLButtonElement = new Button('button', 'remove button').setAttributeButton(
      { type: 'button' },
      'REMOVE',
    );
    const nameCar: HTMLElement = new TextOnPage('p', 'title_car-name', 'Audi').item;
    nameCar.textContent = this.brandCar;
    const startCar: HTMLButtonElement = new Button('button', 'start-car button').setAttributeButton(
      { type: 'button' },
      'A',
    );
    const stopCar: HTMLButtonElement = new Button('button', 'stop-car button').setAttributeButton(
      { type: 'button', disabled: 'disabled' },
      'B',
    );
    this.item.append(select, remove, nameCar, startCar, stopCar);
    this.item.id = this.id;
    return this.item;
  }
}
