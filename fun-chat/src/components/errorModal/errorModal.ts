import './errorModalStyle.css';

export class ModalError {
  item: HTMLDivElement;

  constructor() {
    this.item = document.createElement('div');
    this.item.className = 'error-server-message';
    this.item.innerHTML =
      "Sorry, the connection to the server has been lost...<br> We're trying to reconnect...<br> Please wait...";
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
