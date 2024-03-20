import { BaseComponent } from '../../base-component';
import { labelFirstName, labelLastName } from './formComponents/label';
import { buttonLogin } from './formComponents/button';
import { inputName, inputLastName } from './formComponents/input';
import { User } from '../../types/interfaces';
import { startPage, startButton } from '../startPage/page';

export const startForm: HTMLElement = new BaseComponent('form', 'startForm').addElement('Hello!<br> Please enter your first and last name');
const DELAYED_SHOW = 300;

startForm.append(labelFirstName, labelLastName, buttonLogin);

startForm.addEventListener('submit', (e: SubmitEvent): void => {
  e.preventDefault();
  const obj: User = { name: '', lastName: '' };
  obj.name = inputName.value;
  obj.lastName = inputLastName.value;
  localStorage.setItem('IF-Puzzle', JSON.stringify(obj));
  startForm.remove();
  const greetingUser: HTMLElement = new BaseComponent('p', 'startPage__greeting').addElement(`Hello!<br> ${obj.name} ${obj.lastName}`);
  setTimeout((): void => {
    greetingUser.style.opacity = '1';
  }, DELAYED_SHOW);
  startPage.append(greetingUser, startButton);
  document.body.append(startPage);
});
