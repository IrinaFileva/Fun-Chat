import { ControllerWinners } from '../../services/winnersController';
import { INDEX_CAR, INDEX_NUMBER, INDEX_TIME, INDEX_WINS, TABLE_COLUMNS_WINNERS } from '../../shared/const/const';
import { Button } from '../../shared/ui/button/button';
import { BaseComponent } from '../../shared/utils';

export class PageWinners {
  item: HTMLElement;

  id: string;

  children: HTMLElement[];

  controller: ControllerWinners;

  constructor(id: string, children: HTMLElement[]) {
    this.id = id;
    this.children = children;
    this.item = new BaseComponent('div', 'container__page winners no-active').addItem();
    this.controller = new ControllerWinners();
  }

  public start(): void {
    this.addChildren();
    this.item.id = this.id;
    document.body.append(this.item);
    this.controller.start();
  }

  public addChildren(): HTMLElement {
    const tableWinner: HTMLElement = new BaseComponent('div', 'winners-table').addItem();
    const lineWinnerHead: HTMLElement = this.addLineTableHead();
    tableWinner.append(lineWinnerHead);
    const buttonPrevPage: HTMLButtonElement = new Button('button', 'prev-page-winners button').setAttrib(
      {
        type: 'button',
        disabled: 'disabled',
      },
      'PREV',
    );
    const buttonNextPage: HTMLButtonElement = new Button('button', 'next-page-winners button').setAttrib(
      {
        type: 'button',
        disabled: 'disabled',
      },
      'NEXT',
    );
    this.item.append(...this.children, tableWinner, buttonPrevPage, buttonNextPage);
    return tableWinner;
  }

  private addLineTableHead(): HTMLElement {
    const lineWinner = new BaseComponent('div', 'line-winner').addItem();
    for (let i = 0; i < TABLE_COLUMNS_WINNERS.length; i += 1) {
      const grid: HTMLElement = new BaseComponent('div', 'grid-table-winners head').addItem(TABLE_COLUMNS_WINNERS[i]);
      if (i === INDEX_NUMBER) grid.style.width = '4rem';
      if (i === INDEX_CAR) grid.style.width = '10rem';
      if (i === INDEX_WINS) grid.classList.add('wins');
      if (i === INDEX_TIME) grid.classList.add('time');
      lineWinner.append(grid);
    }
    lineWinner.classList.add('head');
    return lineWinner;
  }
}
