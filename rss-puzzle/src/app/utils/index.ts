import { BaseComponent } from '../base-component';

export function addAnEmptyItem(elem: HTMLElement, parent: HTMLElement, width: number): void {
  const swapCard: HTMLElement = new BaseComponent('div', 'gamePage__word').addElement();
  swapCard.style.width = `${width}%`;
  swapCard.style.border = 'none';
  parent.insertBefore(swapCard, elem);
}

export function lookFirstEmptyElement(parent: HTMLElement): ChildNode | undefined {
  const emptyItem: ChildNode | undefined = Array.from(parent.childNodes).find((elem: ChildNode): ChildNode | undefined => {
    if (!elem.textContent) return elem;
    return undefined;
  });
  return emptyItem;
}

export function compareResultStrings(parentWord: HTMLElement, order: string, button: HTMLElement): void {
  const resultString: string[] = [];
  parentWord.childNodes.forEach((elem: ChildNode) => {
    if (elem.textContent) resultString.push(elem.textContent);
    return resultString;
  });
  if (resultString.join('') === order.replaceAll(' ', '')) {
    button.style.display = 'block';
    parentWord.style.pointerEvents = 'none';
  }
}

export function setCardStyles(card: HTMLElement, width: number): void {
  card.style.maxWidth = `${width}%`;
  card.style.width = `100%`;
  card.style.borderBottom = '1px solid black';
  card.style.opacity = `0`;
  card.classList.add('active');
  setTimeout((): void => {
    card.style.opacity = `1`;
  });
}
