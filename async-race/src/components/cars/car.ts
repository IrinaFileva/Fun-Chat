import svgCar from '../../assets/svg/car.svg';
import { BaseComponent } from '../../shared/ui/baseComponent/baseComponent';

export class NewCar {
  item: HTMLElement;

  color: string;

  constructor(color: string) {
    this.item = new BaseComponent('div', 'container-car').addItem();
    this.color = color;
  }

  public addChildren(): HTMLElement {
    this.item.innerHTML = svgCar;
    const children: HTMLElement = this.item.firstChild as HTMLElement;
    children.style.fill = this.color;
    return this.item;
  }
}
