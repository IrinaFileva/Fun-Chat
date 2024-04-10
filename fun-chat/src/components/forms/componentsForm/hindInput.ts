export class HindInput {
  item: HTMLElement;

  constructor(nameClass: string) {
    this.item = document.createElement('div');
    this.item.className = nameClass;
  }
}
