import { NewCar } from '../components/cars/car';
import { Api } from '../shared/api/api';
import { INDEX_CAR, INDEX_NUMBER, LIMIT_DATE_ON_PAGE, PAGINATION_START } from '../shared/const/const';
import { Car, ParamWinner, PathFile, Winner } from '../shared/types/api';
import { textPagingPageWinners, titlePageWinners } from '../shared/ui/text';
import { BaseComponent } from '../shared/utils';

export class ControllerWinners {
  api: Api;

  page: number;

  path: string;

  limit: number;

  constructor() {
    this.api = new Api();
    this.page = PAGINATION_START;
    this.path = PathFile.Winners;
    this.limit = LIMIT_DATE_ON_PAGE;
  }

  public start(): void {
    this.addWinnerOnPage();
    this.addTitle();
  }

  private async addTitle(): Promise<void> {
    const date: Winner[] = await this.api.getDate<Winner[]>(this.path);
    titlePageWinners.textContent = `Winners (${date.length})`;
    const pages = Math.ceil(date.length / this.limit);
    textPagingPageWinners.textContent = `Page #${pages}`;
  }

  private async addWinnerOnPage(): Promise<void> {
    const parent = document.querySelector('.winners-table');
    const urlWinner: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}`;
    const dateWinner: Winner[] = await this.api.getDate<Winner[]>(urlWinner);
    if (parent) {
      let num = INDEX_NUMBER;
      dateWinner.forEach(async (elem: Winner) => {
        const newWinner: HTMLElement = await this.addNewWinner(elem, (num += 1));
        parent.append(newWinner);
      });
    }
  }

  private async addNewWinner(winner: Winner, num: number): Promise<HTMLElement> {
    const carDate: Car = await this.api.getDate<Car>(`${PathFile.Garage}/${winner.id}`);
    const carSvg: HTMLElement = new NewCar(carDate.color).addChildren();
    carSvg.classList.add('winner-car');
    const date: (string | number | HTMLElement)[] = [num, carSvg, carDate.name, winner.wins, winner.time];
    const newWinner = new BaseComponent('div', 'line-winner body-table').addItem();
    for (let j = 0; j < date.length; j += 1) {
      if (typeof date[j] === 'number' || typeof date[j] === 'string') {
        const grid: HTMLElement = new BaseComponent('div', 'grid-table-winners').addItem(String(date[j]));
        if (j === INDEX_NUMBER) grid.style.width = '4rem';
        if (j === INDEX_CAR) grid.style.width = '10rem';
        newWinner.append(grid);
      }
      if (date[j] instanceof HTMLElement) {
        const svg: HTMLElement = date[j] as HTMLElement;
        const grid: HTMLElement = new BaseComponent('div', 'grid-table-winners').addItem();
        grid.append(svg);
        newWinner.append(grid);
      }
    }
    return newWinner;
  }
}

export const winnersController: ControllerWinners = new ControllerWinners();
