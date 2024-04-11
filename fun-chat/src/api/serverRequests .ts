import { DataRequestUser, UserType } from '../types/serverTypes';
import { Server, newConnection } from './Server';

export class ServerRequests {
  user: string;

  api: Server;

  constructor() {
    this.user = '';
    this.api = newConnection;
  }

  public UserLoginAndLogOut(typeUser: UserType, value: string, value1: string): void {
    const user: DataRequestUser = {
      id: crypto.randomUUID(),
      type: typeUser,
      payload: {
        user: {
          login: value,
          password: value1,
        },
      },
    };
    const request = JSON.stringify(user);
    sessionStorage.setItem('IF-chat', request);
    this.api.socket.send(request);
  }
}

export const serverRequests = new ServerRequests();
