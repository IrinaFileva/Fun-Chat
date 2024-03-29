import { BaseComponent } from '../../shared/utils';
import svgCar from '../../assets/svg/car.svg';

export class NewCar extends BaseComponent {
  item: HTMLElement;

  color: string;

  constructor(elem: string, className: string, color: string) {
    super(elem, className);
    this.item = this.addItem();
    this.color = color;
  }

  public addChildren(): HTMLElement {
    this.item.innerHTML = svgCar;
    const children: HTMLElement = this.item.firstChild as HTMLElement;
    children.style.fill = this.color;
    return this.item;
  }
}
