import { serverRequests } from '../../api/serverRequests ';
import { TextForElement } from '../../types/elementTypes';
import { DataRequest } from '../../types/serverTypes';
import { LinkForm } from '../forms/componentsForm';
import './styleHeader.css';

export class Header {
  item: HTMLElement;

  constructor() {
    this.item = document.createElement('header');
    this.item.className = 'header-main-page';
    this.addUserName();
    this.addAppName();
    this.addButton();
  }

  private addUserName(): void {
    const h1: HTMLHeadingElement = document.createElement('h1');
    h1.className = 'header-title';
    const data: string | null = sessionStorage.getItem('IF-chat');
    if (data) {
      const text: DataRequest = JSON.parse(data);
      if (text.payload && text.payload.user) {
        h1.textContent = `${TextForElement.HeaderTitle}: ${text.payload.user.login}`;
      }
    }
    this.item.append(h1);
  }

  private addAppName() {
    const appName: HTMLParagraphElement = document.createElement('p');
    appName.className = 'header-name-app';
    appName.innerHTML = TextForElement.HeaderAppName;
    this.item.append(appName);
  }

  private addButton(): void {
    const btnExit: HTMLElement = new LinkForm('header-link-exit', '#login', 'header-btn-exit', 'button', 'Logout').item;
    btnExit.addEventListener('click', () => serverRequests.UserLogout());
    this.item.append(btnExit);
  }
}
