export class ButtonForm {
  item: HTMLButtonElement;

  constructor(nameClass: string, type: string, text: string) {
    this.item = document.createElement('button');
    this.item.className = nameClass;
    this.item.setAttribute('type', type);
    this.item.textContent = text;
  }

  public handlerButton(): void {
    this.item.addEventListener('click', () => {});
  }
}
