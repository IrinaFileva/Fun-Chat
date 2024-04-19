import { HindInput } from '../components/forms/componentsForm';
import { START_NEW_MESSAGE } from '../const/const';
import { TextForElement } from '../types/elementTypes';
import { DataRequest, DataResponse, User, RequestType, Message } from '../types/serverTypes';

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

  private getActiveUser(parent: Element): void {
    const dataStorage: string | null = localStorage.getItem('IF-USER_ACTIVE');
    const userStorage: string | null = sessionStorage.getItem('IF-chat');
    if (dataStorage && userStorage) {
      const request: DataRequest = JSON.parse(dataStorage);
      const user: DataRequest = JSON.parse(userStorage);
      if (request.id === this.data.id) {
        const userLogin = user.payload;
        const usersAll: User[] | undefined = this.data.payload.users;
        if (usersAll && this.data.type === RequestType.UserActive && userLogin) {
          const login = userLogin.user;
          for (let i = 0; i < usersAll.length; i += 1) {
            if (login && usersAll[i].login !== login.login) {
              const li: HTMLLIElement = document.createElement('li');
              li.className = 'item-list';
              li.style.color = 'green';
              li.id = 'on';
              const span: HTMLSpanElement = document.createElement('span');
              span.className = 'item-list-name-user';
              span.textContent = usersAll[i].login;
              const unreadMessages: HTMLDivElement = document.createElement('div');
              unreadMessages.className = 'unread-messages';
              unreadMessages.textContent = START_NEW_MESSAGE;
              li.append(span, unreadMessages);
              parent.append(li);
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
      let isUser = false;
      usersName.forEach((item: Element) => {
        if (client && item.textContent === client.login) {
          const parent: HTMLElement | null = item.parentElement;
          if (parent && client.isLogined === true) {
            parent.style.color = 'green';
            parent.id = 'on';
          }
          isUser = true;
        }
      });
      if (list && !isUser && client) {
        const li: HTMLLIElement = document.createElement('li');
        li.className = 'item-list';
        li.style.color = 'green';
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
            parent.style.color = 'red';
            parent.id = '';
          }
        }
      });
    }
  }

  private createMessageBlock(item: Message, nameClass: string, parent: Element): void {
    const message: HTMLDivElement = document.createElement('div');
    if (item.id) message.id = item.id;
    message.className = nameClass;
    const nameUser: HTMLSpanElement = document.createElement('span');
    nameUser.className = 'message-user-name';
    if (item.datetime && item.from) {
      const data: string = new Date(item.datetime).toLocaleString('en-GB');
      nameUser.textContent = `${item.from} (${data.replaceAll('/', '.')})`;
    }
    const text: HTMLParagraphElement = document.createElement('p');
    text.className = 'message-text';
    text.textContent = item.text;
    const dataMessage: HTMLParagraphElement = document.createElement('p');
    dataMessage.className = 'message-data';
    message.append(nameUser, text, dataMessage);
    parent.append(message);
    message.scrollIntoView();
  }

  private processMessageSent(): void {
    const idLocal: string | null = localStorage.getItem('IF-MSG_SEND');
    if (this.data.id === idLocal && this.data.type === RequestType.Send) {
      const parent: Element | null = document.querySelector('.wrapper-messages');
      const messageUser: Message | undefined = this.data.payload.message;
      if (parent && messageUser) this.createMessageBlock(messageUser, 'message-user', parent);
    }
  }

  private processMessageReceived(): void {
    if (this.data.id === null && this.data.type === RequestType.Send) {
      const usersName: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      const parent: Element | null = document.querySelector('.wrapper-messages');
      const lineMessage = document.querySelector('.line-new-message');
      const messageUser: Message | undefined = this.data.payload.message;
      usersName.forEach((item: Element) => {
        if (messageUser && messageUser.from === item.textContent) {
          if (item.classList.contains('open')) {
            if (parent) {
              if (!lineMessage) {
                const lineNewMessage: HTMLDivElement = document.createElement('div');
                lineNewMessage.className = 'line-new-message';
                lineNewMessage.textContent = TextForElement.lineNewMessage;
                parent.append(lineNewMessage);
              }
              this.createMessageBlock(messageUser, 'message-interlocutor', parent);
            }
          } else {
            const nextElement: HTMLElement | null = item.nextSibling as HTMLElement;
            if (nextElement) {
              const numberMessage: number = Number(nextElement.textContent);
              nextElement.textContent = `${numberMessage + 1}`;
              nextElement.style.display = 'inline-flex';
            }
          }
        }
      });
    }
  }

  private processMessageHistory(): void {
    const idLocal: string | null = localStorage.getItem('IF-MSG_FROM_USER');
    const userLocal: string | null = sessionStorage.getItem('IF-chat');
    if (this.data.id === idLocal && userLocal) {
      const userData: DataRequest = JSON.parse(userLocal);
      if (userData.payload) {
        const login = userData.payload.user;
        const history: Message[] | undefined = this.data.payload.messages;
        const parent: Element | null = document.querySelector('.wrapper-messages');
        if (login && history && parent) {
          if (history.length === 0) {
            parent.classList.add('wrapper-message-start');
            parent.textContent = TextForElement.BlockMessageDialog;
          } else {
            parent.classList.remove('wrapper-message-start');
            parent.innerHTML = '';
          }
          history.forEach((elem: Message) => {
            if (login.login === elem.from) {
              this.createMessageBlock(elem, 'message-user', parent);
            } else {
              this.createMessageBlock(elem, 'message-interlocutor', parent);
            }
          });
        }
      }
    }
  }
}
