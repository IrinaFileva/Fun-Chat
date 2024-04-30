import { MessageBlock } from '../components';
import { HindInput } from '../shared/ui';
import { ADDITIONAL_INDEX, START_NEW_MESSAGE } from '../shared/const/const';
import { ColorElement } from '../shared/types/elementTypes';
import {
  DataRequest,
  DataResponse,
  User,
  RequestType,
  Message,
  PayloadRequest,
  StatusMessage,
} from '../shared/types/serverTypes';
import { MessageStatus } from '../shared/types';

export class ServerResponses {
  data: DataResponse;

  constructor(data: DataResponse) {
    this.data = data;
    this.loginUser();
    this.getAllUser();
    this.CheckUserExternalLogin();
    this.CheckUserExternalLogout();
    this.processMessageSent();
    this.processMessageReceived();
    this.processMessageHistory();
    this.changeStatusMessage();
    this.deleteMessage();
    this.editMessage();
  }

  private loginUser(): void {
    const dataStorage: string | null = sessionStorage.getItem('IF-chat');
    if (dataStorage && this.data) {
      const storedData: DataRequest = JSON.parse(dataStorage);
      if (this.data.id === storedData.id) {
        if (this.data.type === RequestType.UserLogin) {
          const person: User | undefined = this.data.payload.user;
          if (person && person.isLogined === true) {
            window.location.hash = '#main';
            const titleHeader: Element | null = document.querySelector('.header-title');
            if (titleHeader) titleHeader.textContent = `User: ${person.login}`;
          }
        }
        if (this.data.type === RequestType.Error) {
          const messageError = new HindInput('message-error').item;
          if (this.data.payload.error) {
            messageError.textContent = this.data.payload.error;
            document.body.appendChild(messageError);
          }
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
        const userLogin: PayloadRequest | null = user.payload;
        const usersAll: User[] | undefined = this.data.payload.users;
        if (usersAll && this.data.type === RequestType.UserActive && userLogin) {
          const login: User | undefined = userLogin.user;
          for (let i = 0; i < usersAll.length; i += 1) {
            if (login && usersAll[i].login !== login.login) {
              this.addUser(parent, usersAll[i]);
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
            const unreadMessages: HTMLDivElement = document.createElement('div');
            unreadMessages.className = 'unread-messages';
            unreadMessages.textContent = START_NEW_MESSAGE;
            li.append(span, unreadMessages);
            list.append(li);
          }
        }
      }
    }
  }

  private CheckUserExternalLogin(): void {
    if (this.data.id === null && this.data.type === RequestType.UserExternalLogin) {
      const usersName: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      const list: Element | null = document.querySelector('.list-users');
      const client: User | undefined = this.data.payload.user;
      let isUser: boolean = false;
      usersName.forEach((item: Element) => {
        if (client && item.textContent === client.login) {
          const parent: HTMLElement | null = item.parentElement;
          if (parent && client.isLogined === true) {
            const statusMessages: NodeListOf<Element> = document.querySelectorAll('.message-data');
            statusMessages.forEach((elem: Element) => {
              if (elem.textContent === MessageStatus.Sent) {
                elem.textContent = MessageStatus.Delivered;
              }
            });
            parent.style.color = ColorElement.Green;
            parent.id = 'on';
          }
          isUser = true;
        }
      });
      if (list && !isUser && client) {
        this.addUser(list, client);
      }
    }
  }

  private CheckUserExternalLogout(): void {
    if (this.data.id === null && this.data.type === RequestType.UserExternalLogout) {
      const users: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      const client: User | undefined = this.data.payload.user;
      users.forEach((item: Element) => {
        if (client && item.textContent === client.login) {
          const parent: HTMLElement | null = item.parentElement;
          if (parent && client.isLogined === false) {
            parent.style.color = ColorElement.Red;
            parent.id = '';
          }
        }
      });
    }
  }

  private processMessageSent(): void {
    const idLocal: string | null = localStorage.getItem('IF-MSG_SEND');
    if (this.data.id === idLocal && this.data.type === RequestType.Send) {
      const parent: Element | null = document.querySelector('.wrapper-messages');
      const messageUser: Message | undefined = this.data.payload.message;
      if (parent && !parent.classList.contains('.wrapper-messages-start') && messageUser)
        new MessageBlock(messageUser, 'message-user', parent);
    }
  }

  private processMessageReceived(): void {
    if (this.data.id === null && this.data.type === RequestType.Send) {
      const usersName: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      const parent: Element | null = document.querySelector('.wrapper-messages');
      const lineMessage: Element | null = document.querySelector('.line-new-message');
      const messageUser: Message | undefined = this.data.payload.message;
      if (parent && messageUser) {
        usersName.forEach((item: Element) => {
          if (messageUser.from === item.textContent) {
            if (item.classList.contains('open')) {
              if (!lineMessage) {
                const lineNewMessage: HTMLDivElement = document.createElement('div');
                lineNewMessage.className = 'line-new-message';
                lineNewMessage.textContent = 'New Message';
                parent.append(lineNewMessage);
              }
              new MessageBlock(messageUser, 'message-interlocutor', parent);
            }
            if (!item.classList.contains('open')) {
              const nextElement: HTMLElement | null = item.nextSibling as HTMLElement;
              if (nextElement) {
                const numberMessage: number = Number(nextElement.textContent);
                nextElement.textContent = `${numberMessage + ADDITIONAL_INDEX}`;
                nextElement.style.display = 'inline-flex';
              }
            }
          }
        });
      }
    }
  }

  private processMessageHistory(): void {
    if (this.data.type === RequestType.FromUser) {
      const userLocal: string | null = sessionStorage.getItem('IF-chat');
      const usersName: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      if (userLocal) {
        const userData: DataRequest = JSON.parse(userLocal);
        const history: Message[] | undefined = this.data.payload.messages;
        const parent: Element | null = document.querySelector('.wrapper-messages');
        if (history && parent) {
          usersName.forEach((item: Element) => {
            this.ifDialogIsOpen(item, parent, history, userData);
            this.ifDialogIsClose(item, history);
          });
        }
      }
    }
  }

  private ifDialogIsOpen(item: Element, parent: Element, history: Message[], userData: DataRequest): void {
    if (userData.payload) {
      const login: User | undefined = userData.payload.user;
      if (item.classList.contains('open') && login) {
        parent.innerHTML = '';
        if (history.length === 0) {
          parent.classList.add('wrapper-message-start');
          parent.textContent = 'Write your first message...';
        } else {
          parent.classList.remove('wrapper-message-start');
          parent.innerHTML = '';
        }
        history.forEach((elem: Message) => {
          if (login.login === elem.from) {
            new MessageBlock(elem, 'message-user', parent);
          } else {
            const lineMessage: Element | null = document.querySelector('.line-new-message');
            const statusMessage: StatusMessage | undefined = elem.status;
            if (!lineMessage && statusMessage && statusMessage.isReaded !== true && login.login !== elem.from) {
              const lineNewMessage: HTMLDivElement = document.createElement('div');
              lineNewMessage.className = 'line-new-message';
              lineNewMessage.textContent = 'New Message';
              parent.append(lineNewMessage);
            }
            new MessageBlock(elem, 'message-interlocutor', parent);
          }
        });
      }
    }
  }

  private ifDialogIsClose(item: Element, history: Message[]): void {
    if (!item.classList.contains('open') && history.length !== 0) {
      history.forEach((elem: Message) => {
        if (elem.from === item.textContent && elem.status) {
          if (elem.status.isReaded === false) {
            const nextElement: HTMLElement | null = item.nextSibling as HTMLElement;
            if (nextElement) {
              const numberMessage: number = Number(nextElement.textContent);
              nextElement.textContent = `${numberMessage + ADDITIONAL_INDEX}`;
              nextElement.style.display = 'inline-flex';
            }
          }
        }
      });
    }
  }

  private addUser(list: Element, client: User): void {
    const li: HTMLLIElement = document.createElement('li');
    li.className = 'item-list';
    li.style.color = ColorElement.Green;
    li.id = 'on';
    const span: HTMLSpanElement = document.createElement('span');
    span.className = 'item-list-name-user';
    span.textContent = client.login;
    const unreadMessages: HTMLDivElement = document.createElement('div');
    unreadMessages.className = 'unread-messages';
    unreadMessages.textContent = START_NEW_MESSAGE;
    li.append(span, unreadMessages);
    list.prepend(li);
  }

  private changeStatusMessage(): void {
    if (this.data.type === RequestType.Read) {
      const messages: NodeListOf<Element> = document.querySelectorAll('.message-user');
      messages.forEach((item: Element) => {
        const msg: Message | undefined = this.data.payload.message;
        if (msg && item.id === msg.id) {
          const statusText: Element | null = item.querySelector('.message-data');
          if (statusText) statusText.textContent = MessageStatus.Read;
        }
      });
    }
  }

  private deleteMessage(): void {
    if (this.data.id === null && this.data.type === RequestType.Delete) {
      const messages: NodeListOf<HTMLElement> = document.querySelectorAll('.message-interlocutor');
      messages.forEach((item: HTMLElement) => {
        const dataMessage: Message | undefined = this.data.payload.message;
        if (dataMessage && dataMessage.id === item.id && dataMessage.status) {
          if (dataMessage.status.isDeleted === true) {
            item.remove();
          }
        }
      });
    }
  }

  private editMessage(): void {
    if (this.data.id === null && this.data.type === RequestType.Edit) {
      const messages: NodeListOf<HTMLElement> = document.querySelectorAll('.message-interlocutor');
      messages.forEach((item: HTMLElement) => {
        const dataMessage: Message | undefined = this.data.payload.message;
        if (dataMessage && dataMessage.id === item.id && dataMessage.status) {
          if (dataMessage.status.isEdited === true) {
            const textMessage: Element | null = item.querySelector('.message-text');
            const statusMessage: Element | null = item.querySelector('.message-data');
            if (textMessage && statusMessage) {
              if (textMessage.textContent && dataMessage.text) textMessage.textContent = dataMessage.text;
              if (dataMessage.status.isEdited === true) statusMessage.textContent = MessageStatus.Changed;
            }
          }
        }
      });
    }
  }
}
