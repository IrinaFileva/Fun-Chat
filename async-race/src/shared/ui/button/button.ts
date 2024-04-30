import { ValuesAttributes } from '../../types/button';
import { BaseComponent } from '../baseComponent/baseComponent';

export class Button extends BaseComponent {
  public setAttrib(values: ValuesAttributes, text: string): HTMLButtonElement {
    const button = this.addItem(text) as HTMLButtonElement;
    button.setAttribute('type', values.type);
    if (values.disabled) button.setAttribute('disabled', values.disabled);
    return button;
  }
}
