import { BaseComponent } from '../../../shared/utils';
import { NewCar } from '../../cars/car';
import { Flag } from './flag/flag';
import { StartPoint } from './startPoint/startPoint';
import SvgFlag from '../../../assets/svg/flag.svg';

export class Road {
  item: HTMLElement;

  id: string;

  nameCar: string;

  color: string;

  constructor(id: string, nameCar: string, color: string) {
    this.item = new BaseComponent('div', 'road').addItem();
    this.id = id;
    this.nameCar = nameCar;
    this.color = color;
  }

  public addChildren(): HTMLElement {
    const flag: HTMLElement = new Flag('div', 'container__svg-flag', SvgFlag).addImage();
    const startPoint: HTMLElement = new StartPoint('div', 'startPoint', this.id, this.nameCar).addChildren();
    const car: HTMLElement = new NewCar(this.color).addChildren();
    car.id = this.id;
    this.item.id = this.id;
    this.item.append(flag, startPoint, car);
    return this.item;
  }
}
