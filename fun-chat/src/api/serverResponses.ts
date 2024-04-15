import { HindInput } from '../components/forms/componentsForm';
import { TextForElement } from '../types/elementTypes';
import { DataRequest, DataResponse, User, RequestType } from '../types/serverTypes';

export class ServerResponses {
  data: DataResponse;

  constructor(data: DataResponse) {
    this.data = data;
    this.loginUser();
    this.getAllUser();
    this.CheckUser();
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

  private getActiveUser(parent: HTMLUListElement): void {
    const dataStorage: string | null = localStorage.getItem('IF-USER_ACTIVE');
    if (dataStorage) {
      const request: DataRequest = JSON.parse(dataStorage);
      if(request.id === this.data.id) {
        const usersAll: User[] | undefined = this.data.payload.users;
        if (usersAll && this.data.type === RequestType.UserActive) {
          for (let i = 0; i < usersAll.length; i += 1) {
            const li = document.createElement('li');
            li.className = 'item-list';
            li.style.color = 'green';
            const span = document.createElement('span');
            span.className = 'item-list-name-user';
            span.textContent = usersAll[i].login;
            li.append(span);
            parent.append(li);
          }
        }
      }
    }
  }

  private getAllUser(): void {
    const list: HTMLUListElement | null = document.querySelector('.list-users');
    if (list) {
      this.getActiveUser(list);
      const dataStorage: string | null = localStorage.getItem('IF-USER_INACTIVE');
      if (dataStorage) {
        const request: DataRequest = JSON.parse(dataStorage);
        if (request.id === this.data.id) {
          const usersAll: User[] | undefined = this.data.payload.users;
          if (usersAll && this.data.type === RequestType.UserInactive) {
            for (let i = 0; i < usersAll.length; i += 1) {
              const li = document.createElement('li');
              li.className = 'item-list';
              const span = document.createElement('span');
              span.className = 'item-list-name-user';
              span.textContent = usersAll[i].login;
              li.append(span);
              list.append(li);
            }
          }
        }
      }
    }
  }

  private CheckUser(): void {
    const users: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
    users.forEach((item) => {
      const userLogin = this.data.payload.user;
      if (userLogin && item.textContent === userLogin.login) {
        const parent: HTMLElement | null = item.parentElement;
        if (parent) {
          if (this.data.type === RequestType.UserExternalLogin && userLogin.isLogined === true) {
            parent.style.color = 'green';
          }
          if (this.data.type === RequestType.UserExternalLogout && userLogin.isLogined === false) {
            parent.style.color = 'red';
          }
        }
      }
    });
  }
}
