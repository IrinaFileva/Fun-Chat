import { FormUser } from '../components/forms/formUser/formUser';

export class ProfilePage {
  item: HTMLElement;

  children: HTMLFormElement;

  constructor(nameClass: string) {
    this.item = document.createElement('div');
    this.item.className = nameClass;
    this.children = new FormUser('form-user').item;
    this.start();
  }

  private start() {
    this.item.appendChild(this.children);
  }
}
