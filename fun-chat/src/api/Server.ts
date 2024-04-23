import { ModalError } from '../components/errorModal/errorModal';
import { PATH } from '../const/const';
import { DataRequest, DataResponse, RequestType, User } from '../types/serverTypes';
import { ServerResponses } from './serverResponses';

export class Server {
  socket: WebSocket;

  errorMessage: ModalError;

  constructor() {
    this.socket = this.start();
    this.errorMessage = new ModalError();
  }

  private start(): WebSocket {
    const socket = new WebSocket(PATH);
    this.open(socket);
    this.message(socket);
    this.error(socket);
    this.close(socket);
    return socket;
  }

  private open(ws: WebSocket): void {
    const data: string | null = sessionStorage.getItem('IF-chat');
    const allActiveUser: string | null = localStorage.getItem('IF-USER_ACTIVE');
    const allInactiveUser: string | null = localStorage.getItem('IF-USER_INACTIVE');
    ws.addEventListener('open', () => {
      if (data && allActiveUser && allInactiveUser) {
        this.errorMessage.remove();
        this.socket.send(data);
        this.socket.send(allActiveUser);
        this.socket.send(allInactiveUser);
      } else {
        this.errorMessage.remove();
        window.location.hash = '';
      }
    });
  }

  private message(ws: WebSocket): void {
    ws.addEventListener('message', (event: MessageEvent) => {
      const data: DataResponse = JSON.parse(event.data);
      new ServerResponses(data);
      this.userHistoryRequest(data);
      console.log(data);
    });
  }

  private error(ws: WebSocket) {
    ws.addEventListener('error', () => {
      ws.close();
    });
  }

  public close(ws: WebSocket): void {
    ws.addEventListener('close', () => {
      this.errorMessage.add();
      this.start();
      if (ws.readyState === ws.CLOSING) {
        this.start();
      }
    });
  }

  private userHistoryRequest(data: DataResponse): void {
    if (data.type === RequestType.UserActive || data.type === RequestType.UserInactive) {
      const clients = data.payload.users;
      if (clients) {
        clients.forEach((item: User) => {
          const details: DataRequest = {
            id: crypto.randomUUID(),
            type: RequestType.FromUser,
            payload: {
              user: {
                login: item.login,
              },
            },
          };
          const request: string = JSON.stringify(details);
          this.socket.send(request);
        });
      }
    }
  }
}
