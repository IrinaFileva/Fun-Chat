import { containerCars } from '../components/containerCars/containerRoads';
import { Road } from '../components/containerCars/road/road';
import { Api } from '../shared/api/api';
import { BRANDS, LIMIT_CARS_ON_PAGE, MODEL, NUMBER_CARS_CREATED, PAGINATION_START } from '../shared/const/const';
import { Car, EngineStatus, PathFile, RequestParam, Speed } from '../shared/types/api';
import { buttonsGarage } from '../shared/ui/button';
import { inputColorCreate, inputColorUpdate, inputCreate, inputUpdate } from '../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../shared/ui/text';
import { getRandomColor, removeDisabled, resetValueInput, setDisabled } from '../shared/utils';

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
    this.getCarForOnePage();
    buttonsGarage.CreateCar.addEventListener('click', (): void => {
      this.controlButtonCreate();
    });
    buttonsGarage.GenerateCars.addEventListener('click', (): void => {
      this.controlButtonGenerateCar();
    });
    containerCars.addEventListener('click', (elem: MouseEvent): void => {
      setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
      const target: HTMLElement = elem.target as HTMLElement;
      this.controlButtonSelect(target);
      this.controlButtonRemove(target);
      this.controlStartCarButton(target);
    });
    buttonsGarage.UpdateCar.addEventListener('click', (): void => {
      this.controlButtonUpdate();
    });
    buttonsGarage.NextPage.addEventListener('click', (): void => {
      this.controlButtonNext();
    });
    buttonsGarage.PrevPage.addEventListener('click', (): void => {
      this.controlButtonPrev();
    });
  }

  private async getAllCars(): Promise<void> {
    const date: Car[] = await this.api.getDate<Car[]>(this.path);
    titlePageGarage.textContent = `Garage (${date.length})`;
    textPagingPageGarage.textContent = `Page #${this.page}`;
    if (date.length > this.limit) {
      buttonsGarage.NextPage.removeAttribute('disabled');
    }
    if (Math.ceil(date.length / this.limit) === this.page) {
      buttonsGarage.NextPage.setAttribute('disabled', 'disabled');
    }
  }

  private async getCarForOnePage(): Promise<void> {
    const url: string = `${this.path}?${RequestParam.Page}${this.page}&${RequestParam.Limit}${this.limit}`;
    const date: Car[] = await this.api.getDate<Car[]>(url);
    containerCars.innerHTML = '';
    for (let i = 0; i < date.length; i += 1) {
      const track: HTMLElement = new Road(`${date[i].id}`, date[i].name, date[i].color).addChildren();
      containerCars.append(track);
    }
    await this.getAllCars();
    if (date.length === 0) buttonsGarage.NextPage.setAttribute('disabled', 'disabled');
  }

  private async controlButtonCreate(): Promise<void> {
    setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    if (inputCreate.value === '') {
      inputCreate.style.border = '2px solid red';
    } else {
      await this.api.postDate(inputCreate.value, inputColorCreate.value);
      await this.getCarForOnePage();
    }
    resetValueInput(inputCreate, inputColorCreate);
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
    await this.getCarForOnePage();
  }

  private async controlButtonSelect(target: HTMLElement): Promise<void> {
    if (target && target.classList.contains('select')) {
      removeDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
      const parent: HTMLElement | null = target.parentElement;
      if (parent) {
        const id: string | null = parent.getAttribute('id');
        if (id) {
          const car: Car = await this.api.getDate<Car>(`${this.path}/${id}`);
          inputUpdate.value = car.name;
          inputColorUpdate.value = car.color;
          buttonsGarage.UpdateCar.id = id;
        }
      }
    }
  }

  private async controlButtonUpdate(): Promise<void> {
    const id: string | null = buttonsGarage.UpdateCar.getAttribute('id');
    const nameCar: string = inputUpdate.value;
    const colorCar: string = inputColorUpdate.value;
    if (id) {
      await this.api.putDate<Car>(id, nameCar, colorCar);
      await this.getCarForOnePage();
      setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    }
  }

  private async controlButtonRemove(target: HTMLElement): Promise<void> {
    if (target && target.classList.contains('remove')) {
      const parent: HTMLElement | null = target.parentElement;
      if (parent) {
        const id: string | null = parent.getAttribute('id');
        if (id) {
          await this.api.deleteDate(id);
          await this.getCarForOnePage();
        }
      }
    }
  }

  private async controlButtonNext(): Promise<void> {
    this.page += 1;
    await this.getCarForOnePage();
    buttonsGarage.PrevPage.removeAttribute('disabled');
  }

  private async controlButtonPrev(): Promise<void> {
    this.page -= 1;
    await this.getCarForOnePage();
    if (this.page === PAGINATION_START) {
      buttonsGarage.PrevPage.setAttribute('disabled', 'disabled');
    }
  }

  private async statusCar(id: string, car: HTMLElement): Promise<void> {
    const date: Response = await this.api.pathDareResponse(
      `${RequestParam.Id}${id}`,
      `${RequestParam.Status}${EngineStatus.Drive}`,
    );
    if (date.status === 500) {
      car.style.animationPlayState = 'paused';
    }
  }

  private async controlStartCarButton(target: HTMLElement): Promise<void> {
    if (target && target.classList.contains('start-car')) {
      const parent: HTMLElement | null = target.parentElement;
      target.setAttribute('disabled', 'disabled');
      const stopButton: HTMLButtonElement = target.nextSibling as HTMLButtonElement;
      stopButton.removeAttribute('disabled');
      if (parent) {
        const id: string | null = parent.getAttribute('id');
        if (id) {
          const json: Speed = await this.api.pathDateJson(
            `${RequestParam.Id}${id}`,
            `${RequestParam.Status}${EngineStatus.Started}`,
          );
          const car: HTMLElement = [...containerCars.querySelectorAll('.container-car')].filter(
            (x: Element) => x.id === id,
          )[0] as HTMLElement;
          const time: number = Math.floor(json.distance / json.velocity);
          car.classList.add('car-position');
          car.style.animationDuration = `${time}ms`;
          await this.statusCar(id, car);
        }
      }
    }
  }
}
export const controllerGarage: GarageController = new GarageController();
