import { MessageElemText } from '../../types/messageTypes';
import './contextMenuStyle.css';

export class ContextMenu {
  item: HTMLDivElement;

  list: HTMLUListElement;

  parent: HTMLDivElement;

  constructor(parent: HTMLDivElement) {
    this.item = document.createElement('div');
    this.item.className = 'context-menu';
    this.list = document.createElement('ul');
    this.list.className = 'context-menu-list';
    this.item.append(this.list);
    this.addItemDelete();
    this.addItemEdit();
    this.parent = parent;
    this.parent.append(this.item);
  }

  private addItemDelete(): void {
    const itemDeletion: HTMLLIElement = document.createElement('li');
    itemDeletion.className = 'context-menu-item delete';
    itemDeletion.textContent = MessageElemText.listItemDelete;
    this.list.append(itemDeletion);
  }

  private addItemEdit(): void {
    const itemEditing: HTMLLIElement = document.createElement('li');
    itemEditing.className = 'context-menu-item edit';
    itemEditing.textContent = MessageElemText.listItemEdit;
    this.list.append(itemEditing);
  }
}
