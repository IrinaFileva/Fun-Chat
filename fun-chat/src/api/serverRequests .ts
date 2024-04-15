import { DataRequest, RequestType } from '../types/serverTypes';
import { newConnection } from './Server';

export class ServerRequests {
  user: string;

  api: WebSocket;

  constructor() {
    this.user = '';
    this.api = newConnection.socket;
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
    this.api.send(request);
  }

  public UserLogout(): void {
    const data: string | null = sessionStorage.getItem('IF-chat');
    if (data) {
      const user: DataRequest = JSON.parse(data);
      user.type = RequestType.UserLogout;
      const request: string = JSON.stringify(user);
      this.api.send(request);
      sessionStorage.clear();
      const users: NodeListOf<Element> = document.querySelectorAll('.item-list');
      users.forEach((item) => item.remove());
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
    this.api.send(request);
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
    this.api.send(request);
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
    this.api.send(request);
  }
}

export const serverRequests = new ServerRequests();
