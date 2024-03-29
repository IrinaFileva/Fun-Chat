import { BaseComponent } from '../../../shared/utils';
import { NewCar } from '../../cars/car';
import { Flag } from './flag/flag';
import { StartPoint } from './startPoint/startPoint';
import SvgFlag from '../../../assets/svg/flag.svg';

export class Road extends BaseComponent {
  item: HTMLElement;

  id: string;

  nameCar: string;

  color: string;

  constructor(elem: string, className: string, id: string, nameCar: string, color: string) {
    super(elem, className);
    this.item = this.addItem();
    this.id = id;
    this.nameCar = nameCar;
    this.color = color;
  }

  public addChildren(): HTMLElement {
    const flag: HTMLElement = new Flag('div', 'container__svg-flag', SvgFlag).addImage();
    const startPoint: HTMLElement = new StartPoint('div', 'startPoint', this.id, this.nameCar).addChildren();
    const car: HTMLElement = new NewCar('div', 'container-car', this.color).addChildren();
    car.id = this.id;
    this.item.id = this.id;
    this.item.append(flag, startPoint, car);
    return this.item;
  }
}
