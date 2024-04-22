import { TextForElement } from '../../types/elementTypes';

export class ModalError {
  item: HTMLDivElement;

  constructor() {
    this.item = document.createElement('div');
    this.item.className = 'error-server-message';
    this.item.innerHTML = TextForElement.ErrorConnectMessage;
  }

  public add(): void {
    document.body.append(this.item);
    document.body.style.pointerEvents = 'none';
  }

  public remove(): void {
    this.item.remove();
    document.body.removeAttribute('style');
  }
}
