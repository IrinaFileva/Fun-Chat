export class Input {
  item: HTMLInputElement;

  constructor(nameClass: string, type: string) {
    this.item = document.createElement('input');
    this.item.className = nameClass;
    this.item.type = type;
  }
}
