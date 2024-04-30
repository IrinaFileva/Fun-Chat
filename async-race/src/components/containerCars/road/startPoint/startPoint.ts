import { BaseComponent } from '../../../../shared/ui/baseComponent/baseComponent';
import { Button } from '../../../../shared/ui/button/button';
import { TextOnPage } from '../../../../shared/ui/text/text';

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
    const select: HTMLButtonElement = new Button('button', 'select button').setAttrib({ type: 'button' }, 'SELECT');
    const remove: HTMLButtonElement = new Button('button', 'remove button').setAttrib({ type: 'button' }, 'REMOVE');
    const nameCar: HTMLElement = new TextOnPage('p', 'title_car-name', 'Audi').item;
    nameCar.textContent = this.brandCar;
    const startCar: HTMLButtonElement = new Button('button', 'start-car button').setAttrib({ type: 'button' }, 'A');
    const stopCar: HTMLButtonElement = new Button('button', 'stop-car button').setAttrib(
      { type: 'button', disabled: 'disabled' },
      'B',
    );
    this.item.append(select, remove, nameCar, startCar, stopCar);
    this.item.id = this.id;
    return this.item;
  }
}
