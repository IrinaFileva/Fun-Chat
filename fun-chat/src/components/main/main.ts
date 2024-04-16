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
    this.wrapperMessage.className = 'wrapper-message-and-input';
    this.fillWrapperMessage();
    this.fillWrapperList();
    this.item.append(this.wrapperList, this.wrapperMessage);
  }

  private fillWrapperList() {
    const list: HTMLUListElement = document.createElement('ul');
    list.className = 'list-users';
    list.addEventListener('click', (event: MouseEvent): void => {
      const target: HTMLElement = event.target as HTMLElement;
      const nameTitle: HTMLElement | null = document.querySelector('.titleName-header-wrapper');
      const statusTitle: HTMLElement | null = document.querySelector('.titleStatus-header-wrapper');
      if (nameTitle && statusTitle) {
        this.addTitleHeader(target, nameTitle, statusTitle);
        if (target.classList.contains('item-list')) {
          const child: Element | null = target.querySelector('.item-list-name-user');
          if (child) {
            const userName: string | null = child.textContent;
            nameTitle.textContent = userName;
            if (userName) {
              serverRequests.getMessageHistory(userName);
              if (target.id === 'on') {
                statusTitle.style.color = 'green';
                statusTitle.textContent = ' (online)';
              } else {
                statusTitle.textContent = ' (offline)';
                statusTitle.style.color = 'red';
              }
            }
          }
        }
      }
    });
    const input: HTMLInputElement = this.addInputSearch();
    this.wrapperList.append(input, list);
  }

  private addInputSearch(): HTMLInputElement {
    const input: HTMLInputElement = new InputForm('input-search', 'search').item;
    input.placeholder = 'Search';
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

  private fillWrapperMessage() {
    const headerWrapper = document.createElement('div');
    headerWrapper.className = 'header-wrapper-message';
    const titleName = document.createElement('p');
    titleName.className = 'titleName-header-wrapper';
    const titleStatus = document.createElement('div');
    titleStatus.className = 'titleStatus-header-wrapper';
    headerWrapper.append(titleName, titleStatus);
    this.wrapperMessage.append(headerWrapper);
  }

  private addTitleHeader(target: HTMLElement, nameTitle: HTMLElement, statusTitle: HTMLElement): void {
    if (target.classList.contains('item-list-name-user')) {
      const userName: string | null = target.textContent;
      const parent = target.parentElement;
      nameTitle.textContent = userName;
      if (userName) serverRequests.getMessageHistory(userName);
      if (parent) {
        if (parent.id === 'on') {
          statusTitle.style.color = 'green';
          statusTitle.textContent = ' (online)';
        } else {
          statusTitle.textContent = ' (offline)';
          statusTitle.style.color = 'red';
        }
      }
    }
  }
}
