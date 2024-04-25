export class Button {
  item: HTMLButtonElement;

  constructor(nameClass: string, type: string, text: string) {
    this.item = document.createElement('button');
    this.item.className = nameClass;
    this.item.setAttribute('type', type);
    this.item.textContent = text;
  }
}
