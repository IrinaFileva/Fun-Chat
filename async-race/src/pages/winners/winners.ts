import { Button } from '../../shared/ui/button/button';
import { BaseComponent } from '../../shared/utils';

export class PageWinners {
  item: HTMLElement;

  id: string;

  children: HTMLElement[];

  constructor(id: string, children: HTMLElement[]) {
    this.id = id;
    this.children = children;
    this.item = new BaseComponent('div', 'container__page winners no-active').addItem();
  }

  public start(): void {
    this.addChildren();
    this.item.id = this.id;
    document.body.append(this.item);
  }

  private addChildren(): void {
    const buttonPrevPage: HTMLButtonElement = new Button('button', 'prev-page button').setAttrib(
      {
        type: 'button',
      },
      'PREV',
    );
    const buttonNextPage: HTMLButtonElement = new Button('button', 'next-page button').setAttrib(
      {
        type: 'button',
        disabled: 'disabled',
      },
      'NEXT',
    );
    this.item.append(buttonPrevPage, buttonNextPage);
    this.item.append(...this.children);
  }
}
