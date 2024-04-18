import { HindInput } from '../components/forms/componentsForm';
import { TextForElement } from '../types/elementTypes';
import { DataRequest, DataResponse, User, RequestType, Message } from '../types/serverTypes';

export class ServerResponses {
  data: DataResponse;

  unreadMessages: number;

  constructor(data: DataResponse) {
    this.data = data;
    this.unreadMessages = 0;
    this.loginUser();
    this.getAllUser();
    this.CheckUserExternalLogin();
    this.CheckUserExternalLogout();
  }

  private loginUser(): void {
    const dataStorage: string | null = sessionStorage.getItem('IF-chat');
    if (dataStorage && this.data) {
      const storedData: DataRequest = JSON.parse(dataStorage);
      if (this.data.id === storedData.id && this.data.type === storedData.type) {
        const person: User | undefined = this.data.payload.user;
        if (person && person.isLogined === true) {
          window.location.hash = '#main';
          const titleHeader: Element | null = document.querySelector('.header-title');
          if (titleHeader) titleHeader.textContent = `${TextForElement.HeaderTitle}: ${person.login}`;
        }
      }
      if (this.data.id === storedData.id && this.data.type === RequestType.Error) {
        const messageError = new HindInput('message-error').item;
        if (this.data.payload.error) {
          messageError.textContent = this.data.payload.error;
          document.body.appendChild(messageError);
          setTimeout(() => document.body.removeChild(messageError), 7000);
        }
      }
    }
  }

  private getActiveUser(parent: Element): void {
    const dataStorage: string | null = localStorage.getItem('IF-USER_ACTIVE');
    const userStorage: string | null = sessionStorage.getItem('IF-chat');
    if (dataStorage && userStorage) {
      const request: DataRequest = JSON.parse(dataStorage);
      const user: DataRequest = JSON.parse(userStorage);
      if (request.id === this.data.id) {
        const userLogin = user.payload;
        const usersAll: User[] | undefined = this.data.payload.users;
        if (usersAll && this.data.type === RequestType.UserActive && userLogin) {
          const login = userLogin.user;
          for (let i = 0; i < usersAll.length; i += 1) {
            if (login && usersAll[i].login !== login.login) {
              const li: HTMLLIElement = document.createElement('li');
              li.className = 'item-list';
              li.style.color = 'green';
              li.id = 'on';
              const span: HTMLSpanElement = document.createElement('span');
              span.className = 'item-list-name-user';
              span.textContent = usersAll[i].login;
              li.append(span);
              parent.append(li);
            }
          }
        }
      }
    }
  }

  private getAllUser(): void {
    const list: Element | null = document.querySelector('.list-users');
    const dataStorage: string | null = localStorage.getItem('IF-USER_INACTIVE');
    if (list && dataStorage) {
      const request: DataRequest = JSON.parse(dataStorage);
      this.getActiveUser(list);
      if (request.id === this.data.id) {
        const usersAll: User[] | undefined = this.data.payload.users;
        if (usersAll && this.data.type === RequestType.UserInactive) {
          for (let i = 0; i < usersAll.length; i += 1) {
            const li: HTMLLIElement = document.createElement('li');
            li.className = 'item-list';
            const span: HTMLSpanElement = document.createElement('span');
            span.className = 'item-list-name-user';
            span.textContent = usersAll[i].login;
            li.append(span);
            list.append(li);
          }
        }
      }
    }
  }

  private CheckUserExternalLogin(): void {
    if(this.data.id === null && this.data.type === RequestType.UserExternalLogin) {
      const usersName: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      const list: Element | null = document.querySelector('.list-users');
      const user: User | undefined = this.data.payload.user;
      let isUser = false;
      usersName.forEach((item: Element) => {
        if (user && item.textContent === user.login) {
          const parent: HTMLElement | null = item.parentElement;
          if (parent && user.isLogined === true) {
            parent.style.color = 'green';
            parent.id = 'on';
          }
          isUser = true
        }
      })
      if(list && !isUser && user) {
        const li: HTMLLIElement = document.createElement('li');
        li.className = 'item-list';
        li.style.color = 'green';
        li.id = 'on';
        const span: HTMLSpanElement = document.createElement('span');
        span.className = 'item-list-name-user';
        span.textContent = user.login;
        li.append(span);
        list.prepend(li);
      }
     }
  }

  private CheckUserExternalLogout(): void {
    if(this.data.id === null && this.data.type === RequestType.UserExternalLogout) {
      const users: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      const user: User | undefined = this.data.payload.user;
      users.forEach((item: Element) => {
        if (user && item.textContent === user.login) {
          const parent: HTMLElement | null = item.parentElement;
          if (parent && user.isLogined === false) {
            parent.style.color = 'red';
            parent.id = '';
          }
        }
      });
    }
  }
}
