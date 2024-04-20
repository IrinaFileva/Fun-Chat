import { PATH } from '../const/const';
import { DataResponse } from '../types/serverTypes';
import { ServerResponses } from './serverResponses';

export class Server {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(PATH);
    this.open();
    this.message();
    this.error();
    this.close();
  }

  public open(): void {
    const data: string | null = sessionStorage.getItem('IF-chat');
    const allActiveUser: string | null = localStorage.getItem('IF-USER_ACTIVE');
    const allInactiveUser: string | null = localStorage.getItem('IF-USER_INACTIVE');
    if (data && allActiveUser && allInactiveUser) {
      this.socket.addEventListener('open', () => {
        this.socket.send(data);
        this.socket.send(allActiveUser);
        this.socket.send(allInactiveUser);
      });
    } else {
      window.location.hash = '';
    }
  }

  public message(): void {
    this.socket.addEventListener('message', (event: MessageEvent) => {
      const data: DataResponse = JSON.parse(event.data);
      new ServerResponses(data);
      console.log(data);
    });
  }

  private error() {
    this.socket.addEventListener('error', () => {
      window.location.reload();
    });
  }

  public close(): void {
    this.socket.addEventListener('close', () => {
      window.location.reload();
    });
  }
}
