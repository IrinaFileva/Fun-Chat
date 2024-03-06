export class BaseComponent{
  elem: string;

  className: string;

  constructor(elem:string, className:string){
    this.elem = elem;
    this.className = className
  }

  public addElement(text?: string): HTMLElement{
    const item: HTMLElement = document.createElement(this.elem);
    item.className = this.className;
    if(text)item.innerHTML = text;
    return item;
  }
 }

export function getElementAndType<T extends HTMLElement>(arg: Document, selector: string): T {
  const result: T | null = arg.querySelector<T>(selector);

  if (result === null) {
      throw Error('Element not found');
  }
  return result;
}

