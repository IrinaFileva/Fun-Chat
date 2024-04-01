import { containerCars } from '../components/containerCars/containerRoads';
import { Road } from '../components/containerCars/road/road';
import { Api } from '../shared/api/api';
import { BRANDS, LIMIT_DATE_ON_GARAGE, MODEL, NUMBER_CARS_CREATED, PAGINATION_START } from '../shared/const/const';
import { Car, EngineStatus, PathFile, RequestParam, Speed, Winner } from '../shared/types/api';
import { buttonsGarage } from '../shared/ui/button';
import { inputColorCreate, inputColorUpdate, inputCreate, inputUpdate } from '../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../shared/ui/text';
import { TextOnPage } from '../shared/ui/text/text';
import { BaseComponent, getRandomColor, removeDisabled, resetValueInput, setDisabled } from '../shared/utils';

export class GarageController {
  page: number;

  limit: number;

  path: string;

  api: Api;

  constructor() {
    this.page = PAGINATION_START;
    this.limit = LIMIT_DATE_ON_GARAGE;
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
      this.controlStartButton(target);
      this.controlStopButton(target);
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
    buttonsGarage.Race.addEventListener('click', (): void => {
      this.controlRaceButton();
    });
    buttonsGarage.Reset.addEventListener('click', (): void => {
      this.controlResetButton();
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
    if (this.page === PAGINATION_START) {
      buttonsGarage.PrevPage.setAttribute('disabled', 'disabled');
    }
    if (this.page > PAGINATION_START) {
      buttonsGarage.PrevPage.removeAttribute('disabled');
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
      const date: Car = { name: inputCreate.value, color: inputColorCreate.value };
      await this.api.postDate<Car>(date, this.path);
      await this.getCarForOnePage();
    }
    resetValueInput(inputCreate, inputColorCreate);
  }

  private async controlButtonGenerateCar(): Promise<void> {
    setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    for (let i = 0; i < NUMBER_CARS_CREATED; i += 1) {
      const randomColor: string = getRandomColor();
      const brandCar: string = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const modelCar: string = MODEL[Math.floor(Math.random() * MODEL.length)];
      const randomName: string = `${brandCar} ${modelCar}`;
      const date: Car = { name: randomName, color: randomColor };
      this.api.postDate<Car>(date, this.path);
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
    const idCar: string | null = buttonsGarage.UpdateCar.getAttribute('id');
    const nameCar: string = inputUpdate.value;
    const colorCar: string = inputColorUpdate.value;
    if (idCar) {
      const date: Car = { name: nameCar, color: colorCar, id: idCar };
      await this.api.putDate<Car>(date, idCar, this.path);
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
          await this.api.deleteDate(id, this.path);
          await this.api.deleteDate(id, PathFile.Winners);
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
      const newText = new TextOnPage('span', 'text-error', 'Oops!').item;
      car.classList.add('no');
      car.append(newText);
    }
  }

  private async startCar(id: string) {
    buttonsGarage.Race.setAttribute('disabled', 'disabled');
    buttonsGarage.GenerateCars.setAttribute('disabled', 'disabled');
    buttonsGarage.NextPage.disabled = true;
    buttonsGarage.PrevPage.disabled = true;
    containerCars.querySelectorAll<HTMLElement>('.start-car').forEach((elem: HTMLElement) => {
      elem.setAttribute('disabled', 'disabled');
    });
    containerCars.querySelectorAll<HTMLElement>('.stop-car').forEach((elem: HTMLElement) => {
      elem.removeAttribute('disabled');
    });
    const json: Speed = await this.api.pathDateJson(
      `${RequestParam.Id}${id}`,
      `${RequestParam.Status}${EngineStatus.Started}`,
    );
    const car: HTMLElement = [...containerCars.querySelectorAll('.container-car')].filter(
      (x: Element) => x.id === id,
    )[0] as HTMLElement;
    const time: number = Math.floor(json.distance / json.velocity);
    car.classList.add('car-position');
    car.classList.remove('no');
    car.style.animationDuration = `${time}ms`;
    await this.statusCar(id, car);
  }

  private async stopCar(id: string): Promise<void> {
    buttonsGarage.Reset.setAttribute('disabled', 'disabled');
    buttonsGarage.Race.removeAttribute('disabled');
    buttonsGarage.GenerateCars.removeAttribute('disabled');
    this.getAllCars();
    containerCars.querySelectorAll<HTMLElement>('.stop-car').forEach((elem: HTMLElement) => {
      elem.setAttribute('disabled', 'disabled');
    });
    containerCars.querySelectorAll<HTMLElement>('.start-car').forEach((elem: HTMLElement) => {
      elem.removeAttribute('disabled');
    });
    const car: HTMLElement = [...document.querySelectorAll('.container-car')].filter(
      (x: Element) => x.id === id,
    )[0] as HTMLElement;
    car.classList.remove('car-position');
    car.style.animationDuration = '';
    car.style.animationPlayState = '';
    await this.api.pathDateJson(`${RequestParam.Id}${id}`, `${RequestParam.Status}${EngineStatus.Stopped}`);
  }

  private async controlStartButton(target: HTMLElement): Promise<void> {
    if (target && target.classList.contains('start-car')) {
      const parent: HTMLElement | null = target.parentElement;
      target.setAttribute('disabled', 'disabled');
      const stopButton: HTMLButtonElement = target.nextSibling as HTMLButtonElement;
      stopButton.removeAttribute('disabled');
      if (parent) {
        const id: string | null = parent.getAttribute('id');
        if (id) {
          await this.startCar(id);
        }
      }
    }
  }

  private async controlStopButton(target: HTMLElement): Promise<void> {
    if (target && target.classList.contains('stop-car')) {
      const parent: HTMLElement | null = target.parentElement;
      target.setAttribute('disabled', 'disabled');
      const startButton: HTMLButtonElement = target.previousSibling as HTMLButtonElement;
      startButton.removeAttribute('disabled');
      if (parent) {
        const id: string | null = parent.getAttribute('id');
        if (id) {
          await this.stopCar(id);
        }
      }
    }
  }

  private controlRaceButton(): void {
    containerCars.querySelectorAll<HTMLElement>('.container-car').forEach(async (elem: HTMLElement) => {
      const id: string | null = elem.getAttribute('id');
      if (id) await this.startCar(id);
    });
    this.controlWinnerCar();
  }

  private controlResetButton(): void {
    containerCars.querySelectorAll('.text-error').forEach((elem: Element) => elem.remove());
    containerCars.querySelectorAll<HTMLElement>('.container-car').forEach(async (elem: HTMLElement) => {
      const id: string | null = elem.getAttribute('id');
      if (id) await this.stopCar(id);
    });
  }

  private controlWinnerCar(): void {
    let isWinner = false;
    containerCars.addEventListener('animationend', async (elem) => {
      const car: HTMLElement = elem.target as HTMLElement;
      if (!isWinner && !car.classList.contains('no')) {
        isWinner = true;
        buttonsGarage.Reset.removeAttribute('disabled');
        const id: string | null = car.getAttribute('id');
        const animationTime: string | null = car.getAttribute('style');
        if (id && animationTime) {
          const date: Car = await this.api.getDate(`${this.path}/${id}`);
          const modalWinner = new BaseComponent('div', 'modal-winner').addItem(`${date.name} wins this race!`);
          document.body.append(modalWinner);
          document.body.addEventListener('click', (e: MouseEvent) => {
            const target: HTMLElement = e.target as HTMLElement;
            if (!target.classList.contains('link_button-winners') || !target.classList.contains('link_button-garage')) {
              modalWinner.remove();
            }
          });
          const timeCar: number = +(
            +animationTime.replace('animation-duration:', '').replace('ms;', '') / 1000
          ).toFixed(2);
          await this.addWinner(+id, timeCar);
        }
      }
    });
  }

  private async addWinner(idWinner: number, timeCar: number): Promise<void> {
    const winners: Winner[] = await this.api.getDate<Winner[]>(PathFile.Winners);
    const winnerCheck: boolean = winners.some((elem) => elem.id === idWinner);
    if (!winnerCheck) {
      const date: Winner = { id: idWinner, wins: PAGINATION_START, time: timeCar };
      await this.api.postDate<Winner>(date, PathFile.Winners);
    } else {
      const winner: Winner = await this.api.getDate(`${PathFile.Winners}/${idWinner}`);
      const winsCar: number = winner.wins + 1;
      const newTime: number = winner.time > timeCar ? timeCar : winner.time;
      const newDate: Winner = { wins: winsCar, time: newTime };
      await this.api.putDate<Winner>(newDate, `${idWinner}`, PathFile.Winners);
    }
  }
}
