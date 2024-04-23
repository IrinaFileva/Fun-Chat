import { MessageBlock } from '../components';
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
    this.processMessageDeliveryStatus();
    this.changeStatusMessage();
    this.deleteMessage();
  }

  private loginUser(): void {
    const dataStorage: string | null = sessionStorage.getItem('IF-chat');
    if (dataStorage && this.data) {
      const storedData: DataRequest = JSON.parse(dataStorage);
      if (this.data.id === storedData.id && this.data.type === RequestType.UserLogin) {
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
      let isUser = false;
      usersName.forEach((item: Element) => {
        if (client && item.textContent === client.login) {
          const parent: HTMLElement | null = item.parentElement;
          if (parent && client.isLogined === true) {
            const statusMessages = document.querySelectorAll('.message-data');
            statusMessages.forEach((elem: Element) => {
              if (elem.textContent === 'sent') {
                elem.textContent = 'delivered';
              }
            });
            parent.style.color = 'greenyellow';
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
            parent.style.color = 'red';
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
      if (parent && messageUser) new MessageBlock(messageUser, 'message-user', parent);
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
                lineNewMessage.textContent = TextForElement.lineNewMessage;
                parent.append(lineNewMessage);
              }
              new MessageBlock(messageUser, 'message-interlocutor', parent);
            }
            if (!item.classList.contains('open')) {
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
  }

  private processMessageStatus(item: Message, dataMessage: HTMLParagraphElement, nameClass: string): void {
    if (item.status && nameClass !== 'message-interlocutor') {
      if (item.status.isDelivered === true) {
        dataMessage.textContent = 'delivered';
      }
      if (item.status.isDelivered === false) {
        dataMessage.textContent = 'sent';
      }
      if (item.status.isReaded === true && item.status.isDelivered === true) {
        dataMessage.textContent = 'read';
      }
    }
  }

  private processMessageHistory(): void {
    if (this.data.type === RequestType.FromUser) {
      const userLocal: string | null = sessionStorage.getItem('IF-chat');
      const usersName: NodeListOf<Element> = document.querySelectorAll('.item-list-name-user');
      if (userLocal) {
        const userData: DataRequest = JSON.parse(userLocal);
        if (userData.payload) {
          const login = userData.payload.user;
          const history: Message[] | undefined = this.data.payload.messages;
          const parent: Element | null = document.querySelector('.wrapper-messages');
          if (login && history && parent) {
            parent.innerHTML = '';
            usersName.forEach((item: Element) => {
              if (item.classList.contains('open')) {
                if (history.length === 0) {
                  parent.classList.add('wrapper-message-start');
                  parent.textContent = TextForElement.BlockMessageDialog;
                } else {
                  parent.classList.remove('wrapper-message-start');
                  parent.innerHTML = '';
                }
                history.forEach((elem: Message) => {
                  if (login.login === elem.from) {
                    new MessageBlock(elem, 'message-user', parent);
                  } else {
                    const lineMessage: Element | null = document.querySelector('.line-new-message');
                    const statusMessage = elem.status;
                    if (!lineMessage && statusMessage && statusMessage.isReaded !== true && login.login !== elem.from) {
                      const lineNewMessage: HTMLDivElement = document.createElement('div');
                      lineNewMessage.className = 'line-new-message';
                      lineNewMessage.textContent = TextForElement.lineNewMessage;
                      parent.append(lineNewMessage);
                    }
                    new MessageBlock(elem, 'message-interlocutor', parent);
                  }
                });
              }
              if (!item.classList.contains('open') && history.length !== 0) {
                history.forEach((elem: Message) => {
                  if (elem.from === item.textContent && elem.status) {
                    if (elem.status.isReaded === false) {
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
            });
          }
        }
      }
    }
  }

  private processMessageDeliveryStatus(): void {
    if (this.data.id === null && this.data.type === RequestType.Deliver) {
      const dataMessage: Message | undefined = this.data.payload.message;
      if (dataMessage) {
        const idMessage: string | undefined = dataMessage.id;
        const messages: NodeListOf<Element> = document.querySelectorAll('.message-user');
        if (idMessage) {
          messages.forEach((elem: Element) => {
            if (elem.id === idMessage) {
              console.log(elem.id === idMessage);
              const parent: HTMLParagraphElement | null = elem.querySelector('.message-data');
              if (parent) this.processMessageStatus(dataMessage, parent, 'message-user');
            }
          });
        }
      }
    }
  }

  private addUser(list: Element, client: User) {
    const li: HTMLLIElement = document.createElement('li');
    li.className = 'item-list';
    li.style.color = 'greenyellow';
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

  private changeStatusMessage() {
    if (this.data.type === RequestType.Read) {
      const messages = document.querySelectorAll('.message-user');
      messages.forEach((item: Element) => {
        const msg = this.data.payload.message;
        if (msg && item.id === msg.id) {
          const statusText = item.querySelector('.message-data');
          if (statusText) statusText.textContent = 'read';
        }
      });
    }
  }

  private deleteMessage() {
    if (this.data.id === null && this.data.type === RequestType.Delete) {
      const messages: NodeListOf<HTMLElement> = document.querySelectorAll('.message-interlocutor');
      messages.forEach((item: HTMLElement) => {
        const dataMessage = this.data.payload.message;
        if (dataMessage && dataMessage.id === item.id && dataMessage.status) {
          if (dataMessage.status.isDeleted === true) {
            item.remove();
          }
        }
      });
    }
  }
}
