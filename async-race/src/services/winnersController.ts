import { NewCar } from '../components/cars/car';
import { Api } from '../shared/api/api';
import { INDEX_CAR, INDEX_NUMBER, LIMIT_DATE_ON_WINNERS, PAGINATION_START } from '../shared/const/const';
import { Car, ParamWinner, PathFile, SortAndOrderPram, Winner } from '../shared/types/api';
import { BaseComponent } from '../shared/ui/baseComponent/baseComponent';
import { textPagingPageWinners, titlePageWinners } from '../shared/ui/text';

export class ControllerWinners {
  api: Api;

  page: number;

  path: string;

  limit: number;

  constructor() {
    this.api = new Api();
    this.page = PAGINATION_START;
    this.path = PathFile.Winners;
    this.limit = LIMIT_DATE_ON_WINNERS;
  }

  public start(): void {
    const url = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}`;
    this.addWinnerOnPage(url);
    this.addTitle();
    this.sortWins();
    this.sortTime();
    this.addWinner();
    this.clickNextButton();
    this.clickPrevButton();
  }

  private async addTitle(): Promise<void> {
    const date: Winner[] = await this.api.getDate<Winner[]>(this.path);
    titlePageWinners.textContent = `Winners (${date.length})`;
    textPagingPageWinners.textContent = `Page #${this.page}`;
    const nextButton: HTMLButtonElement | null = document.querySelector('.next-page-winners');
    if (nextButton) {
      if (date.length / this.limit > this.page) {
        nextButton.disabled = false;
      } else {
        nextButton.disabled = true;
      }
    }
    const prevButton: HTMLButtonElement | null = document.querySelector('.prev-page-winners');
    if (prevButton) {
      if (this.page > PAGINATION_START) {
        prevButton.disabled = false;
      } else {
        prevButton.disabled = true;
      }
    }
  }

  public async addWinnerOnPage(url: string): Promise<void> {
    const parent = document.querySelector('.winners-table');
    const urlWinner: string = url;
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

  async sortWins(): Promise<void> {
    const button: HTMLElement | null = document.querySelector('.wins');
    const buttonTime: HTMLElement | null = document.querySelector('.time');
    if (button && buttonTime) {
      button.addEventListener('click', () => {
        document.querySelectorAll('.body-table').forEach((e) => e.remove());
        buttonTime.textContent = 'Time(s)';
        if (!button.classList.contains('top')) {
          button.innerHTML = 'Wins &#8595';
          button.classList.add('top');
          const url: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}&${ParamWinner.Sort}${SortAndOrderPram.Wins}&${ParamWinner.Order}${SortAndOrderPram.ASC}`;
          document.querySelectorAll('.body-table').forEach((e) => e.remove());
          this.addWinnerOnPage(url);
        } else {
          button.innerHTML = 'Wins &#8593';
          button.classList.remove('top');
          const url: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}&${ParamWinner.Sort}${SortAndOrderPram.Wins}&${ParamWinner.Order}${SortAndOrderPram.DESC}`;
          this.addWinnerOnPage(url);
        }
      });
    }
  }

  async sortTime(): Promise<void> {
    const button: HTMLElement | null = document.querySelector('.time');
    const buttonWins: HTMLElement | null = document.querySelector('.wins');
    if (button && buttonWins) {
      button.addEventListener('click', () => {
        document.querySelectorAll('.body-table').forEach((e) => e.remove());
        buttonWins.textContent = 'Wins';
        if (!button.classList.contains('top')) {
          button.innerHTML = 'Time(s) &#8595';
          button.classList.add('top');
          const url: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}&${ParamWinner.Sort}${SortAndOrderPram.Time}&${ParamWinner.Order}${SortAndOrderPram.ASC}`;
          this.addWinnerOnPage(url);
        } else {
          button.innerHTML = 'Time(s) &#8593';
          button.classList.remove('top');
          const url: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}&${ParamWinner.Sort}${SortAndOrderPram.Time}&${ParamWinner.Order}${SortAndOrderPram.DESC}`;
          this.addWinnerOnPage(url);
        }
      });
    }
  }

  async addWinner(): Promise<void> {
    const buttonWins: HTMLElement | null = document.querySelector('.link_button-winners');
    if (buttonWins) {
      buttonWins.addEventListener('click', () => {
        document.querySelectorAll('.body-table').forEach((e) => e.remove());
        const url: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}`;
        this.addWinnerOnPage(url);
        this.addTitle();
      });
    }
  }

  private clickNextButton(): void {
    const buttonNext = document.querySelector('.next-page-winners');
    if (buttonNext) {
      buttonNext.addEventListener('click', async () => {
        this.page += 1;
        document.querySelectorAll('.body-table').forEach((e) => e.remove());
        const url: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}`;
        await this.addWinnerOnPage(url);
        await this.addTitle();
      });
    }
  }

  private clickPrevButton(): void {
    const buttonNext = document.querySelector('.prev-page-winners');
    if (buttonNext) {
      buttonNext.addEventListener('click', async () => {
        this.page -= 1;
        document.querySelectorAll('.body-table').forEach((e) => e.remove());
        const url: string = `${this.path}?${ParamWinner.Page}${this.page}&${ParamWinner.limit}${this.limit}`;
        await this.addWinnerOnPage(url);
        await this.addTitle();
      });
    }
  }
}
