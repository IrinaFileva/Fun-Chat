import { DataRequestUser, UserType } from '../types/serverTypes';
import { Server, newConnection } from './Server';

export class ServerRequests {
  user: string;

  api: Server;

  constructor() {
    this.user = '';
    this.api = newConnection;
  }

  public UserLogin(value: string, value1: string): void {
    const user: DataRequestUser = {
      id: crypto.randomUUID(),
      type: UserType.UserLogin,
      payload: {
        user: {
          login: value,
          password: value1,
        },
      },
    };
    const request: string = JSON.stringify(user);
    sessionStorage.setItem('IF-chat', request);
    this.api.socket.send(request);
  }

  public UserLogout(): void {
    const data: string | null = sessionStorage.getItem('IF-chat');
    if (data) {
      const user: DataRequestUser = JSON.parse(data);
      user.type = UserType.UserLogout;
      const request: string = JSON.stringify(user);
      this.api.socket.send(request);
      sessionStorage.clear();
      const users: NodeListOf<Element> = document.querySelectorAll('.item-list');
      users.forEach((item) => item.remove());
    }
  }

  public requestAllUsers(): void {
    const idRequest: string = crypto.randomUUID();
    localStorage.setItem('IF-USER_ACTIVE', idRequest);
    const data: DataRequestUser = {
      id: idRequest,
      type: UserType.UserActive,
      payload: null,
    };
    const request: string = JSON.stringify(data);
    this.api.socket.send(request);
    this.AllUnauthorizedUsers();
  }

  private AllUnauthorizedUsers(): void {
    const idRequest: string = crypto.randomUUID();
    localStorage.setItem('IF-USER_INACTIVE', idRequest);
    const data: DataRequestUser = {
      id: idRequest,
      type: UserType.UserInactive,
      payload: null,
    };
    const request: string = JSON.stringify(data);
    this.api.socket.send(request);
  }
}

export const serverRequests = new ServerRequests();
