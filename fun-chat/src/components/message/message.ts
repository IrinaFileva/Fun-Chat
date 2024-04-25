import { EXTRA_SIZE } from '../../shared/const/const';
import { MessageStatus } from '../../shared/types/messageTypes';
import { Message } from '../../shared/types/serverTypes';
import { ContextMenu } from '../contextMenu/contextMenu';
import './messageStyle.css';

export class MessageBlock {
  item: HTMLDivElement;

  data: Message;

  nameClass: string;

  constructor(data: Message, nameClass: string, parent: Element) {
    this.data = data;
    this.nameClass = nameClass;
    this.item = document.createElement('div');
    this.item.className = nameClass;
    if (this.data.id) this.item.id = this.data.id;
    this.addUserAndDate();
    this.addTextMessage();
    this.addStatusMessage();
    this.handlerContextMenu();
    parent.append(this.item);
    this.item.scrollIntoView();
  }

  private addUserAndDate(): void {
    const nameUser: HTMLSpanElement = document.createElement('span');
    nameUser.className = 'message-user-name';
    if (this.data.datetime && this.data.from) {
      const date: string = new Date(this.data.datetime).toLocaleString('en-GB');
      nameUser.textContent = `${this.data.from} (${date.replaceAll('/', '.')})`;
    }
    this.item.append(nameUser);
  }

  private addTextMessage(): void {
    const text: HTMLParagraphElement = document.createElement('p');
    text.className = 'message-text';
    if (this.data.text) text.textContent = this.data.text;
    this.item.append(text);
  }

  private addStatusMessage(): void {
    const dataMessage: HTMLParagraphElement = document.createElement('p');
    dataMessage.className = 'message-data';
    this.setMessageStatus(dataMessage);
    this.item.append(dataMessage);
  }

  private setMessageStatus(item: HTMLParagraphElement): void {
    if (this.data.status && this.nameClass !== 'message-interlocutor') {
      if (this.data.status.isDelivered) item.textContent = MessageStatus.Delivered;
      if (!this.data.status.isDelivered) item.textContent = MessageStatus.Sent;
      if (this.data.status.isReaded && this.data.status.isDelivered) item.textContent = MessageStatus.Read;
      if (this.data.status.isEdited && this.data.status.isDelivered)
        item.textContent = `${MessageStatus.Edit} ${MessageStatus.Delivered}`;
      if (this.data.status.isEdited && !this.data.status.isDelivered)
        item.textContent = `${MessageStatus.Edit} ${MessageStatus.Sent}`;
      if (this.data.status.isReaded && this.data.status.isDelivered && this.data.status.isEdited)
        item.textContent = `${MessageStatus.Edit} ${MessageStatus.Read}`;
    }
    if (this.data.status && this.nameClass === 'message-interlocutor' && this.data.status.isEdited)
      item.textContent = MessageStatus.Changed;
  }

  private handlerContextMenu(): void {
    if (this.nameClass === 'message-user') {
      this.item.addEventListener('contextmenu', (ev: MouseEvent) => {
        const menu: Element | null = document.querySelector('.context-menu');
        if (menu) menu.remove();
        const contextMenu: HTMLDivElement = new ContextMenu(this.item).item;
        ev.preventDefault();
        contextMenu.style.display = 'block';
        contextMenu.style.left = `${this.item.scrollLeft + EXTRA_SIZE}px`;
        contextMenu.style.top = `${this.item.scrollTop + EXTRA_SIZE}px`;
        document.body.addEventListener('click', () => {
          contextMenu.style.display = 'none';
        });
      });
    }
  }
}
