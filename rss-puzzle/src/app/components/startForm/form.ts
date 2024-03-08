import { BaseComponent } from "../../base-component";
import { labelFirstName, labelLastName } from "./formComponents/label";
import { buttonLogin } from "./formComponents/button";
import { inputName, inputLastName } from "./formComponents/input";
import { LocalStorageObj } from "../../types/interfaces";

export const startForm = new BaseComponent('form', 'startForm').addElement('Hello!<br> Please enter your first and last name');
startForm.append(labelFirstName, labelLastName, buttonLogin);

startForm.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();
    const getUser: object[] = JSON.parse(localStorage.getItem('IF-Puzzle') as string) || [];
    const obj: LocalStorageObj = {name: '', lastName: ''};
    obj.name = inputName.value;
    obj.lastName = inputLastName.value;
    if(Array.isArray(getUser)) getUser.push(obj);
    localStorage.setItem('IF-Puzzle', JSON.stringify(getUser));
    startForm.style.display = 'none';
})