import { BaseComponent } from "../../../base-component";
import { inputName, inputLastName, spanHintName, spanHintLastName } from "./input";

export const labelFirstName = new BaseComponent('label', 'label').addElement('First Name:');
export const labelLastName = new BaseComponent('label', 'label').addElement('Last Name:');

labelFirstName.append(inputName, spanHintName);
labelLastName.append(inputLastName, spanHintLastName);