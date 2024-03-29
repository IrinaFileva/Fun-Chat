import { getCarForOnePage } from '../../shared/api/api';
import { LIMIT_CARS_ON_PAGE, PATH_GARAGE } from '../../shared/const/const';
import { buttonsGarage } from '../../shared/ui/button';
import { titlePageGarage } from '../../shared/ui/text';
import { BaseComponent } from '../../shared/utils';

export const containerCars: HTMLElement = new BaseComponent('div', 'container-cars').addItem();
