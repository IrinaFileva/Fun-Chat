import { BaseComponent } from '../../utils';

export class TextOnPage extends BaseComponent {
  text: string;

  item: HTMLElement;

  constructor(elem: string, className: string, text: string) {
    super(elem, className);
    this.text = text;
    this.item = this.addItem(this.text);
  }
}
