import { ValuesAttributes } from '../../types/button';
import { BaseComponent } from '../../utils';

export class Input extends BaseComponent {
  item: HTMLInputElement;

  constructor(elem: string, className: string) {
    super(elem, className);
    this.item = this.addItem() as HTMLInputElement;
  }

  public setAttributeButton(values: ValuesAttributes): HTMLInputElement {
    this.item.setAttribute('type', values.type);
    return this.item;
  }

  public clearInput(): void {
    this.item.value = '';
  }
}
