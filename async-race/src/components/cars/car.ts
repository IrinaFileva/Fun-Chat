import { BaseComponent } from '../../shared/utils';
import svgCar from '../../assets/svg/car.svg';

export class NewCar extends BaseComponent {
  item: HTMLElement;

  constructor(elem: string, className: string) {
    super(elem, className);
    this.item = this.addItem();
  }

  public addChildren(): HTMLElement {
    this.item.innerHTML = svgCar;
    return this.item;
  }
}
