import { TextForElement } from '../shared/types/elementTypes';
import { DataRequest, RequestType } from '../shared/types/serverTypes';
import { Server } from './Server';

export class ServerRequests extends Server {
  public UserLogin(value: string, value1: string): void {
    const user: DataRequest = {
      id: crypto.randomUUID(),
      type: RequestType.UserLogin,
      payload: {
        user: {
          login: value,
          password: value1,
        },
      },
    };
    const request: string = JSON.stringify(user);
    sessionStorage.setItem('IF-chat', request);
    this.socket.send(request);
    this.requestAllUsers();
  }

  public UserLogout(): void {
    const data: string | null = sessionStorage.getItem('IF-chat');
    if (data) {
      const user: DataRequest = JSON.parse(data);
      user.type = RequestType.UserLogout;
      const request: string = JSON.stringify(user);
      this.socket.send(request);
      const users: Element | null = document.querySelector('.list-users');
      const nameTitle: HTMLElement | null = document.querySelector('.titleName-header-wrapper');
      const statusTitle: HTMLElement | null = document.querySelector('.titleStatus-header-wrapper');
      if (nameTitle) nameTitle.innerHTML = '';
      if (statusTitle) statusTitle.innerHTML = '';
      if (users) users.innerHTML = '';
      const wrapper: Element | null = document.querySelector('wrapper-messages');
      if (wrapper) {
        wrapper.innerHTML = '';
        wrapper.classList.add('wrapper-messages-start');
        wrapper.textContent = TextForElement.BlockMessageStart;
      }
    }
    sessionStorage.clear();
    localStorage.clear();
    window.location.hash = '';
  }

  public requestAllUsers(): void {
    const data: DataRequest = {
      id: crypto.randomUUID(),
      type: RequestType.UserActive,
      payload: null,
    };
    const request: string = JSON.stringify(data);
    localStorage.setItem('IF-USER_ACTIVE', request);
    this.socket.send(request);
    this.AllUnauthorizedUsers();
  }

  private AllUnauthorizedUsers(): void {
    const data: DataRequest = {
      id: crypto.randomUUID(),
      type: RequestType.UserInactive,
      payload: null,
    };
    const request: string = JSON.stringify(data);
    localStorage.setItem('IF-USER_INACTIVE', request);
    this.socket.send(request);
  }

  public getMessageHistory(userName: string): void {
    const data: DataRequest = {
      id: crypto.randomUUID(),
      type: RequestType.FromUser,
      payload: {
        user: {
          login: userName,
        },
      },
    };
    const request: string = JSON.stringify(data);
    this.socket.send(request);
  }

  public sendMessage(msg: string, user: string): void {
    const idRequest: string = crypto.randomUUID();
    localStorage.setItem('IF-MSG_SEND', idRequest);
    const data: DataRequest = {
      id: idRequest,
      type: RequestType.Send,
      payload: {
        message: {
          to: user,
          text: msg,
        },
      },
    };
    const request: string = JSON.stringify(data);
    this.socket.send(request);
  }

  public changeReadStatusOfMessage(idMessage: string): void {
    const idRequest: string = crypto.randomUUID();
    localStorage.setItem('IF-MSG_READ', idRequest);
    const data: DataRequest = {
      id: idRequest,
      type: RequestType.Read,
      payload: {
        message: {
          id: idMessage,
        },
      },
    };
    const request: string = JSON.stringify(data);
    this.socket.send(request);
  }

  public deleteMessage(idMessage: string): void {
    const data: DataRequest = {
      id: crypto.randomUUID(),
      type: RequestType.Delete,
      payload: {
        message: {
          id: idMessage,
        },
      },
    };
    const request: string = JSON.stringify(data);
    this.socket.send(request);
  }

  public editMessage(idMessage: string, textMessage: string): void {
    const data: DataRequest = {
      id: crypto.randomUUID(),
      type: RequestType.Edit,
      payload: {
        message: {
          id: idMessage,
          text: textMessage,
        },
      },
    };
    const request: string = JSON.stringify(data);
    this.socket.send(request);
  }
}

export const serverRequests = new ServerRequests();
