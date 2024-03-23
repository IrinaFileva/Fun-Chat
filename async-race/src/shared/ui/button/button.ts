import { ValuesAttributes } from '../../types/button';
import { BaseComponent } from '../../utils';

export class Button extends BaseComponent {
  public setAttributeButton(values: ValuesAttributes, text: string): HTMLButtonElement {
    const button = this.addItem(text) as HTMLButtonElement;
    button.setAttribute('type', values.type);
    if (values.disabled) button.setAttribute('disabled', values.disabled);
    return button;
  }
}
