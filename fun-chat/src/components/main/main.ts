import { serverRequests } from '../../api/serverRequests';
import { START_NEW_MESSAGE } from '../../const/const';
import { TextForElement } from '../../types/elementTypes';
import { InputForm } from '../forms/componentsForm';
import { FormMessage } from '../forms/formMessage/formMessage';
import './styleMain.css';

export class Main {
  item: HTMLElement;

  wrapperList: HTMLElement;

  wrapperMessage: HTMLElement;

  form: HTMLFormElement;

  constructor() {
    this.item = document.createElement('main');
    this.item.className = 'main-page-main';
    this.wrapperList = document.createElement('div');
    this.wrapperList.className = 'wrapper-user-list';
    this.wrapperMessage = document.createElement('div');
    this.wrapperMessage.className = 'wrapper-message-and-input';
    this.form = new FormMessage().item;
    this.fillWrapperMessage();
    this.fillWrapperList();
    this.item.append(this.wrapperList, this.wrapperMessage);
  }

  private fillWrapperList() {
    const list: HTMLUListElement = document.createElement('ul');
    list.className = 'list-users';
    list.addEventListener('click', (event: MouseEvent): void => {
      const target: HTMLElement = event.target as HTMLElement;
      const users = document.querySelectorAll('.item-list-name-user');
      users.forEach((elem) => {
        elem.classList.remove('open');
      });
      const nameTitle: HTMLElement | null = document.querySelector('.titleName-header-wrapper');
      const statusTitle: HTMLElement | null = document.querySelector('.titleStatus-header-wrapper');
      const parent: HTMLElement | null = document.querySelector('.wrapper-messages');
      if (parent && parent.classList.contains('wrapper-message-start')) {
        parent.classList.remove('wrapper-message-start');
        parent.innerHTML = '';
      }
      if (nameTitle && statusTitle) {
        this.addTitleHeader(target, nameTitle, statusTitle);
        this.unlockFormInputAndButton();
      }
    });
    const input: HTMLInputElement = this.addInputSearch();
    this.wrapperList.append(input, list);
  }

  private addInputSearch(): HTMLInputElement {
    const input: HTMLInputElement = new InputForm('input-search', 'search').item;
    input.placeholder = TextForElement.InputSearch;
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
    const wrapperMes = document.createElement('div');
    wrapperMes.className = 'wrapper-messages';
    wrapperMes.textContent = TextForElement.BlockMessageStart;
    wrapperMes.classList.add('wrapper-message-start');
    this.controlScroll(wrapperMes);
    this.handlerMessageBlock(wrapperMes);
    this.wrapperMessage.append(headerWrapper, wrapperMes, this.form);
  }

  private addTitleHeader(target: HTMLElement, nameTitle: HTMLElement, statusTitle: HTMLElement): void {
    if (target.classList.contains('item-list-name-user')) {
      target.classList.add('open');
      const userName: string | null = target.textContent;
      const parent = target.parentElement;
      nameTitle.textContent = userName;
      if (userName) serverRequests.getMessageHistory(userName);
      if (parent) {
        if (parent.id === 'on') {
          statusTitle.style.color = 'greenyellow';
          statusTitle.textContent = TextForElement.UserOnline;
        } else {
          statusTitle.textContent = TextForElement.UserOffline;
          statusTitle.style.color = 'red';
        }
      }
    }
    if (target.classList.contains('item-list')) {
      const child: Element | null = target.querySelector('.item-list-name-user');
      if (child) {
        child.classList.add('open');
        const userName: string | null = child.textContent;
        nameTitle.textContent = userName;
        if (userName) {
          serverRequests.getMessageHistory(userName);
          if (target.id === 'on') {
            statusTitle.style.color = 'green';
            statusTitle.textContent = TextForElement.UserOnline;
          } else {
            statusTitle.textContent = TextForElement.UserOffline;
            statusTitle.style.color = 'red';
          }
        }
      }
    }
  }

  private unlockFormInputAndButton(): void {
    const input: HTMLInputElement | null = document.querySelector('.input-form-message');
    const button: HTMLButtonElement | null = document.querySelector('.btn-form-message');
    if (input && button) {
      input.disabled = false;
      input.autofocus = true;
      input.addEventListener('input', () => {
        if (input.value.length !== 0) {
          button.disabled = false;
        } else {
          button.disabled = true;
        }
      });
    }
  }

  private controlScroll(elem: HTMLDivElement): void {
    elem.addEventListener('scroll', () => {
      const lineNewMessage: HTMLElement | null = elem.querySelector('.line-new-message');
      if (lineNewMessage) {
        const topLine = lineNewMessage.offsetTop;
        if (elem.scrollTop > topLine) {
          elem.scrollTo(0, topLine);
        }
      }
    });
  }

  private handlerMessageBlock(elem: HTMLDivElement): void {
    elem.addEventListener('click', (ev: MouseEvent) => {
      const target: HTMLElement = ev.target as HTMLElement;
      const children: NodeListOf<HTMLElement> = elem.childNodes as NodeListOf<HTMLElement>;
      const arrayChildren: HTMLElement[] = [...children];
      const lineNewMessage: HTMLElement | null = elem.querySelector('.line-new-message');
      if (lineNewMessage) {
        arrayChildren.forEach((item, index) => {
          if (item.classList.contains('line-new-message')) {
            item.remove();
            const noReadMessage = arrayChildren.slice(index + 1);
            noReadMessage.map((x) => serverRequests.changeReadStatusOfMessage(x.id));
            this.removeNumberMessage();
          }
        });
      }
      if (target && target.classList.contains('delete')) {
        const parent = target.parentElement;
        if (parent) {
          const oldParent = parent.parentElement;
          if (oldParent) {
            const superParent = oldParent.parentElement;
            if (superParent) {
              serverRequests.deleteMessage(superParent.id);
              superParent.remove();
            }
          }
        }
      }

      if (target && target.classList.contains('edit')) {
        const input: HTMLInputElement | null = document.querySelector('.input-form-message');
        const button: HTMLButtonElement | null = document.querySelector('.btn-form-message');
        const parent = target.parentElement;
        if (parent) {
          const oldParent = parent.parentElement;
          if (oldParent) {
            const superParent = oldParent.parentElement;
            if (superParent && input && button) {
              input.id = superParent.id;
              const textMessage: HTMLElement | null = superParent.querySelector('.message-text');
              if (textMessage && textMessage.textContent) {
                const height = textMessage.clientHeight;
                input.value = textMessage.textContent;
                textMessage.textContent = '';
                textMessage.style.height = `${height}px`;
                button.disabled = false;
              }
            }
          }
        }
      }
    });
    elem.addEventListener('wheel', () => {
      const children: NodeListOf<HTMLElement> = elem.childNodes as NodeListOf<HTMLElement>;
      const arrayChildren: HTMLElement[] = [...children];
      const lineNewMessage: HTMLElement | null = elem.querySelector('.line-new-message');
      if (lineNewMessage) {
        arrayChildren.forEach((item, index) => {
          if (item.classList.contains('line-new-message')) {
            item.remove();
            const noReadMessage = arrayChildren.slice(index + 1);
            noReadMessage.map((x) => serverRequests.changeReadStatusOfMessage(x.id));
            this.removeNumberMessage();
          }
        });
      }
    });
  }

  private removeNumberMessage(): void {
    const child: NodeListOf<HTMLElement> = document.querySelectorAll('.item-list-name-user');
    child.forEach((item: HTMLElement) => {
      if (item.classList.contains('open')) {
        const next = item.nextElementSibling;
        if (next) {
          next.removeAttribute('style');
          next.textContent = START_NEW_MESSAGE;
        }
      }
    });
  }
}
