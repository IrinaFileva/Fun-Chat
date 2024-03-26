import { Button } from '../../../../shared/ui/button/button';
import { TextOnPage } from '../../../../shared/ui/text/text';
import { BaseComponent } from '../../../../shared/utils';
import { NewCar } from '../../../cars/car';

export class StartPoint extends BaseComponent {
  item: HTMLElement;

  constructor(elem: string, className: string) {
    super(elem, className);
    this.item = this.addItem();
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
    const startCar: HTMLButtonElement = new Button('button', 'start-car button').setAttributeButton(
      { type: 'button' },
      'A',
    );
    const stopCar: HTMLButtonElement = new Button('button', 'stop-car button').setAttributeButton(
      { type: 'button', disabled: 'disabled' },
      'B',
    );
    const car: HTMLElement = new NewCar('div', 'container-car').addChildren();
    this.item.append(select, remove, nameCar, startCar, stopCar, car);
    return this.item;
  }
}
