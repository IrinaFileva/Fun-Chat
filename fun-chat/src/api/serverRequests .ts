import { TextForElement } from '../types/elementTypes';
import { DataRequest, RequestType } from '../types/serverTypes';
import { Server } from './Server';

export class ServerRequests extends Server {
  user: string;

  constructor() {
    super();
    this.user = '';
  }

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
  }

  public UserLogout(): void {
    const data: string | null = sessionStorage.getItem('IF-chat');
    if (data) {
      const user: DataRequest = JSON.parse(data);
      user.type = RequestType.UserLogout;
      const request: string = JSON.stringify(user);
      this.socket.send(request);
      sessionStorage.clear();
      const users: NodeListOf<Element> = document.querySelectorAll('.item-list');
      const header = document.querySelector('.header-wrapper-message');
      if (header) header.remove();
      const wrapper = document.querySelector('wrapper-messages');
      if (wrapper) {
        wrapper.innerHTML = '';
        wrapper.textContent = TextForElement.BlockMessageStart;
      }
      users.forEach((item) => item.remove());
      sessionStorage.clear();
      localStorage.clear();
    }
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
    const idRequest: string = crypto.randomUUID();
    localStorage.setItem('IF-MSG_FROM_USER', idRequest);
    const data: DataRequest = {
      id: idRequest,
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
}

export const serverRequests = new ServerRequests();
