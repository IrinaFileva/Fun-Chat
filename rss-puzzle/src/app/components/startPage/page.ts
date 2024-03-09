import background1 from '../../assets/backgroundStart1.jpg';
import background2 from '../../assets/backgroundStart2.png';
import { BaseComponent } from "../../base-component";

export const startPage = new BaseComponent('div', 'startPage').addElement();
const backgroundImage1 = new BaseComponent('img', 'startPage__image1').addElement() as HTMLImageElement;
const backgroundImage2 = new BaseComponent('img', 'startPage__image2').addElement() as HTMLImageElement;
const titleStartPage = new BaseComponent('h1', 'startPage__title').addElement('ENGLISH PUZZLE');
const descriptionStartPage = new BaseComponent('p', 'startPage__description')
    .addElement("Click on words. Collect phrases. <br>Tear off the artists' paintings.<br>Got a problem? Use the hints!");

backgroundImage1.src = background1;
backgroundImage2.src = background2;
startPage.append(backgroundImage1, backgroundImage2, titleStartPage, descriptionStartPage);
