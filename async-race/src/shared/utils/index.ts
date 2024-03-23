export class BaseComponent {
  elem: string;

  className: string;

  constructor(elem: string, className: string) {
    this.elem = elem;
    this.className = className;
  }

  public addItem(text?: string): HTMLElement {
    const item: HTMLElement = document.createElement(this.elem);
    item.className = this.className;
    if (text) item.innerHTML = text;
    return item;
  }
}
