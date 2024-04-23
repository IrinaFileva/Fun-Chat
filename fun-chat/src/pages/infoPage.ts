import { ButtonForm } from '../components/forms/componentsForm';
import { LINK_GIT_HUB } from '../const/const';
import { TextForElement } from '../types/elementTypes';

export class InfoPage {
  item: HTMLElement;

  children: HTMLElement;

  constructor() {
    this.item = document.createElement('div');
    this.item.className = 'info-page';
    this.children = document.createElement('div');
    this.children.className = 'wrapper-info-page';
    this.start();
  }

  private start() {
    const info = document.createElement('p');
    info.className = 'description-info-page';
    info.innerHTML = TextForElement.descriptionInfoPage;
    const linkGitHub = document.createElement('a');
    const logoGit = document.createElement('div');
    linkGitHub.className = 'link-git-info-page';
    linkGitHub.href = LINK_GIT_HUB;
    linkGitHub.target = '_blank';
    linkGitHub.innerText = 'Link to';
    logoGit.className = 'logo-link-git-info-page';
    const btnBack = new ButtonForm('btn-back-info-page', 'button', '').item;
    btnBack.innerHTML = '&larr;&nbsp;Back';
    btnBack.addEventListener('click', () => window.history.back());
    linkGitHub.append(logoGit);
    this.children.append(info, linkGitHub, btnBack);
    this.item.appendChild(this.children);
  }
}
