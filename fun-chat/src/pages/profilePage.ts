import { FormUser } from '../components/forms/formUser/formUser';

export class ProfilePage {
  item: HTMLElement;

  children: HTMLFormElement;

  constructor() {
    this.item = document.createElement('div');
    this.item.className = 'profile-page';
    this.children = new FormUser().item;
    this.start();
  }

  private start() {
    this.item.append(this.children);
  }
}
