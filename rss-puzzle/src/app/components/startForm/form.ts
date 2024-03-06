import { BaseComponent } from "../../base-component";
import { labelFirstName, labelLastName } from "./formComponents/label";
import { buttonLogin } from "./formComponents/button";

export const startForm = new BaseComponent('form', 'startForm').addElement('Hello!<br> Please enter your first and last name');
startForm.append(labelFirstName, labelLastName, buttonLogin);