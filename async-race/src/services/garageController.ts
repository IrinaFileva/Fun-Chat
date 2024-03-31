import { containerCars } from '../components/containerCars/containerRoads';
import { Road } from '../components/containerCars/road/road';
import { Api } from '../shared/api/api';
import { BRANDS, LIMIT_CARS_ON_PAGE, MODEL, NUMBER_CARS_CREATED, PAGINATION_START } from '../shared/const/const';
import { Car, PathFile, RequestParam } from '../shared/types/api';
import { buttonsGarage } from '../shared/ui/button';
import { inputColorCreate, inputColorUpdate, inputCreate, inputUpdate } from '../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../shared/ui/text';
import { getRandomColor, resetValueInput, setDisabled } from '../shared/utils';

export class GarageController {
  page: number;

  limit: number;

  path: string;

  api: Api;

  constructor() {
    this.page = PAGINATION_START;
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
    buttonsGarage.GenerateCars.addEventListener('click', (): void => {
      this.controlButtonGenerateCar();
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

  private async controlButtonGenerateCar() {
    setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    for (let i = 0; i < NUMBER_CARS_CREATED; i += 1) {
      const randomColor: string = getRandomColor();
      const brandCar: string = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const modelCar: string = MODEL[Math.floor(Math.random() * MODEL.length)];
      const randomName: string = `${brandCar} ${modelCar}`;
      this.api.postDate<Car>(randomName, randomColor);
    }
    this.getCarForOnePage();
    buttonsGarage.NextPage.removeAttribute('disabled');
  }
}

export const controllerGarage: GarageController = new GarageController();
