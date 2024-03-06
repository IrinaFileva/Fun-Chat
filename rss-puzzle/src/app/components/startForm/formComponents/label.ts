import { BaseComponent } from "../../../base-component";
import { inputName, inputLastName } from "./input";

export const labelFirstName = new BaseComponent('label', 'label').addElement('First Name:');
export const labelLastName = new BaseComponent('label', 'label').addElement('Last Name:');

labelFirstName.append(inputName);
labelLastName.append(inputLastName);