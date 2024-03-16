import { BaseComponent } from '../base-component';

export function addAnEmptyItem(elem: HTMLElement, parent: HTMLElement, width: number): void {
  const swapCard: HTMLElement = new BaseComponent('div', 'gamePage__word').addElement();
  swapCard.style.width = `${width}% `;
  parent.insertBefore(swapCard, elem);
}

export function lookFirstEmptyElement(parent: NodeListOf<ChildNode> | ChildNode[]): ChildNode | undefined {
  const emptyItem: ChildNode | undefined = Array.from(parent).find((elem: ChildNode): ChildNode | undefined => {
    if (!elem.textContent) return elem;
    return undefined;
  });
  return emptyItem;
}

export function setMascPuzzle(elem: HTMLElement, order: string): void {
  if (elem.textContent === order.split(' ')[0]) {
    elem.classList.add('start');
  }
  if (elem.textContent === order.split(' ').at(-1)) {
    elem.classList.add('end');
  }
}
export function showTranslate(elem: HTMLElement, button: HTMLElement) {
  button.style.opacity = '1';
  const localDate = localStorage.getItem('IF-translate');
  if (localDate === 'hide') {
    elem.style.display = 'none';
    elem.style.opacity = '0';
    button.textContent = 'Show translation';
  } else {
    elem.style.display = 'block';
    elem.style.opacity = '1';
    button.textContent = 'Hide translation';
  }
}
export function compareResultStrings(
  parentWord: HTMLElement,
  order: string,
  buttonOpen: HTMLElement,
  buttonClosed: HTMLElement,
  titleTranslate: HTMLElement,
  buttonHind: HTMLElement,
): void {
  const resultString: string[] = [];
  parentWord.childNodes.forEach((elem: ChildNode) => {
    if (elem.textContent) resultString.push(elem.textContent);
    return resultString;
  });
  if (resultString.join('') === order.replaceAll(' ', '')) {
    document.querySelectorAll('.active').forEach((elem: Element): void => {
      elem.classList.remove('active');
    });
    buttonClosed.style.display = 'none';
    buttonOpen.style.display = 'block';
    buttonHind.style.opacity = '0';
    titleTranslate.style.opacity = '1';
    parentWord.style.pointerEvents = 'none';
  }
}

export function setCardStyles(card: HTMLElement): void {
  card.style.opacity = `0`;
  card.classList.add('active');
  setTimeout((): void => {
    card.style.opacity = `1`;
  });
}

export function checkLineWords(parent: HTMLElement, lengthOffer: string[], button: HTMLElement) {
  if (parent.getElementsByClassName('active').length === lengthOffer.length) {
    button.removeAttribute('disabled');
  }
}

function dragStar(elem: DragEvent, button: HTMLElement): void {
  const item: HTMLElement = elem.target as HTMLElement;
  item.classList.add('choose');
  document.querySelectorAll('.active').forEach((e: Element) => {
    e.classList.remove('no-error');
    e.classList.remove('error');
  });
  button.setAttribute('disabled', 'disabled');
}

function dragEnd(
  elem: DragEvent,
  parent: HTMLElement,
  lengthOffer: string[],
  button: HTMLElement,
  order: string,
  buttonOpen: HTMLElement,
  titleTranslate: HTMLElement,
  buttonTranslate: HTMLElement,
): void {
  const item: HTMLElement = elem.target as HTMLElement;
  item.classList.remove('choose');
  checkLineWords(parent, lengthOffer, button);
  compareResultStrings(parent, order, buttonOpen, button, titleTranslate, buttonTranslate);
}

function dragOver(elem: DragEvent): void {
  elem.preventDefault();
}

function dropResultField(elem: DragEvent, parent: HTMLElement, parent1: HTMLElement): void {
  elem.preventDefault();
  const item: HTMLElement | null = document.querySelector('.choose');
  const nextElem: Node = item?.nextSibling as HTMLElement;
  const target: HTMLElement = elem.target as HTMLElement;
  if (item) {
    item.classList.add('active');
    if (!parent.contains(item)) {
      parent.insertBefore(item, target);
      if (!target.textContent) {
        parent1.insertBefore(target, nextElem);
      } else {
        const emptyCard: ChildNode = document.querySelector('.no-drag') as ChildNode;
        parent1.insertBefore(emptyCard, nextElem);
      }
    } else {
      parent.insertBefore(item, target.nextSibling);
    }
  }
}

function dropLineWord(elem: DragEvent, parent: HTMLElement, parent1: HTMLElement): void {
  elem.preventDefault();
  const item: HTMLElement | null = document.querySelector('.choose');
  const nextElem: Node = item?.nextSibling as HTMLElement;
  const target: HTMLElement = elem.target as HTMLElement;
  if (!parent.contains(item) && item) {
    item.classList.remove('active');
    parent.insertBefore(item, target.nextSibling);
    if (!target.textContent) {
      parent1.insertBefore(target, nextElem);
    }
  }
}

export function dragAndDrop(
  listeners: HTMLElement[],
  lengthOffer: string[],
  button: HTMLElement,
  order: string,
  buttonOpen: HTMLElement,
  titleTranslate: HTMLElement,
  buttonTranslate: HTMLElement,
): void {
  listeners.forEach((parent: HTMLElement) => {
    parent.addEventListener('dragstart', (e: DragEvent): void => dragStar(e, button));
    parent.addEventListener('dragend', (e: DragEvent): void =>
      dragEnd(e, listeners[0], lengthOffer, button, order, buttonOpen, titleTranslate, buttonTranslate),
    );
    parent.addEventListener('dragover', (e: DragEvent): void => dragOver(e));
  });
  listeners[0].addEventListener('drop', (e: DragEvent): void => dropResultField(e, listeners[0], listeners[1]));
  listeners[1].addEventListener('drop', (e: DragEvent): void => dropLineWord(e, listeners[1], listeners[0]));
}
