import { InputForm } from '../forms/componentsForm';
import './styleMain.css';

export class Main {
  item: HTMLElement;

  wrapperList: HTMLElement;

  constructor() {
    this.item = document.createElement('main');
    this.item.className = 'main-page-main';
    this.wrapperList = document.createElement('div');
    this.wrapperList.className = 'wrapper-user-list';
    this.FillWrapperList();
    this.item.append(this.wrapperList);
  }

  private FillWrapperList() {
    const list: HTMLUListElement = document.createElement('ul');
    list.className = 'list-users';
    const input = new InputForm('input-search', 'search').item;
    this.wrapperList.append(input, list);
  }
}
