import { serverRequests } from '../../api/serverRequests ';
import { InputForm } from '../forms/componentsForm';
import './styleMain.css';

export class Main {
  item: HTMLElement;

  wrapperList: HTMLElement;

  wrapperMessage: HTMLElement;

  constructor() {
    this.item = document.createElement('main');
    this.item.className = 'main-page-main';
    this.wrapperList = document.createElement('div');
    this.wrapperList.className = 'wrapper-user-list';
    this.wrapperMessage = document.createElement('div');
    this.wrapperMessage.className = 'wrapper-message-input';
    this.FillWrapperList();
    this.item.append(this.wrapperList, this.wrapperMessage);
  }

  private FillWrapperList() {
    const list: HTMLUListElement = document.createElement('ul');
    list.className = 'list-users';
    list.addEventListener('click', (event: MouseEvent): void => {
      const target: HTMLElement = event.target as HTMLElement;
      if (target.classList.contains('item-list')) {
        const child: Element | null = target.querySelector('.item-list-name-user');
        if (child) {
          const userName: string | null = child.textContent;
          if (userName) serverRequests.getMessageHistory(userName);
        }
      }
      if (target.classList.contains('item-list-name-user')) {
        const userName: string | null = target.textContent;
        if (userName) serverRequests.getMessageHistory(userName);
      }
    });
    const input: HTMLInputElement = this.addInputSearch();
    this.wrapperList.append(input, list);
  }

  private addInputSearch(): HTMLInputElement {
    const input: HTMLInputElement = new InputForm('input-search', 'search').item;
    input.addEventListener('input', () => {
      const allUser: NodeListOf<HTMLElement> = document.querySelectorAll('.item-list-name-user');
      allUser.forEach((elem: HTMLElement) => {
        const userName: string | null = elem.textContent;
        const parent: HTMLElement | null = elem.parentElement;
        if (parent) {
          if (userName && !userName.includes(input.value)) {
            parent.style.display = 'none';
          } else {
            parent.style.display = 'list-item';
          }
        }
      });
    });
    return input;
  }
}
