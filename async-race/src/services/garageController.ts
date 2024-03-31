import { containerCars } from '../components/containerCars/containerRoads';
import { Road } from '../components/containerCars/road/road';
import { Api } from '../shared/api/api';
import { LIMIT_CARS_ON_PAGE, PAGINATION_START_NUMBER } from '../shared/const/const';
import { Car, PathFile, RequestParam } from '../shared/types/api';
import { buttonsGarage } from '../shared/ui/button';
import { inputColorCreate, inputColorUpdate, inputCreate, inputUpdate } from '../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../shared/ui/text';
import { resetValueInput, setDisabled } from '../shared/utils';

export class GarageController {
  page: number;

  limit: number;

  path: string;

  api: Api;

  constructor() {
    this.page = PAGINATION_START_NUMBER;
    this.limit = LIMIT_CARS_ON_PAGE;
    this.path = PathFile.Garage;
    this.api = new Api();
  }

  public start(): void {
    this.getAllCars();
    this.getCarForOnePage();
    buttonsGarage.CreateCar.addEventListener('click', (): void => {
      this.controlButtonCreate();
    });
  }

  public async getAllCars(): Promise<number> {
    const date: Car[] = await this.api.getDate<Car[]>(this.path);
    titlePageGarage.textContent = `Garage (${date.length})`;
    textPagingPageGarage.textContent = `Page #${this.page}`;
    return date.length;
  }

  public async getCarForOnePage(): Promise<void> {
    const date: Car[] = await this.api.getDate<Car[]>(this.path);
    containerCars.innerHTML = '';
    let numberCar: number = date.length;
    if (date.length > this.limit) {
      numberCar = this.limit;
      buttonsGarage.NextPage.removeAttribute('disabled');
    }
    for (let i = 0; i < numberCar; i += 1) {
      const track: HTMLElement = new Road(`${date[i].id}`, date[i].name, date[i].color).addChildren();
      containerCars.append(track);
    }
    titlePageGarage.textContent = `Garage (${date.length})`;
  }

  private async controlButtonCreate(): Promise<void> {
    setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    if (inputCreate.value === '') {
      inputCreate.style.border = '2px solid red';
    } else {
      await this.api.postDate(inputCreate.value, inputColorCreate.value);
      const url: string = `${this.path}?${RequestParam.Page}${this.page}&${RequestParam.Limit}${this.limit}`;
      const date: Car[] = await this.api.getDate<Car[]>(url);
      containerCars.innerHTML = '';
      for (let i = 0; i < date.length; i += 1) {
        const track: HTMLElement = new Road(`${date[i].id}`, date[i].name, date[i].color).addChildren();
        containerCars.append(track);
      }
      const allCars: number = await this.getAllCars();
      if (Math.ceil(allCars / this.limit) === this.page) {
        buttonsGarage.NextPage.setAttribute('disabled', 'disabled');
      } else {
        buttonsGarage.NextPage.removeAttribute('disabled');
      }
    }
    resetValueInput(inputCreate, inputColorCreate);
    textPagingPageGarage.textContent = `Page #${this.page}`;
  }
}

export const controllerGarage: GarageController = new GarageController();
