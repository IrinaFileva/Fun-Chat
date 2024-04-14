import { PATH } from '../const/const';
import { DataResponseUser } from '../types/serverTypes';
import { ServerResponses } from './serverResponses';

export class Server {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(PATH);
  }

  public open(): void {
    const data: string | null = sessionStorage.getItem('IF-chat');
    if (data) {
      this.socket.addEventListener('open', () => {
        this.socket.send(data);
      });
    } else {
      window.location.hash = '';
    }
  }

  public message(): void {
    this.socket.addEventListener('message', (event: MessageEvent) => {
      const data: DataResponseUser = JSON.parse(event.data);
      new ServerResponses(data);
      console.log(data);
    });
  }

  public close(): void {
    this.socket.addEventListener('close', () => {
      this.socket.close();
    });
  }
}

export const newConnection: Server = new Server();
