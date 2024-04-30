import { Button } from '../shared/ui';
import { LINK_GIT_HUB } from '../shared/const/const';

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

  private start(): void {
    const info: HTMLParagraphElement = document.createElement('p');
    info.className = 'description-info-page';
    info.innerHTML =
      'The application was developed by student Irina Fileva as part of the RS School JS / Front-end course';
    const linkGitHub: HTMLAnchorElement = document.createElement('a');
    const logoGit: HTMLDivElement = document.createElement('div');
    linkGitHub.className = 'link-git-info-page';
    linkGitHub.href = LINK_GIT_HUB;
    linkGitHub.target = '_blank';
    linkGitHub.innerText = 'Link to';
    logoGit.className = 'logo-link-git-info-page';
    const btnBack: HTMLButtonElement = new Button('btn-back-info-page', 'button', '').item;
    btnBack.innerHTML = '&larr;&nbsp;Back';
    btnBack.addEventListener('click', () => {
      window.history.back();
    });
    linkGitHub.append(logoGit);
    this.children.append(info, linkGitHub, btnBack);
    this.item.appendChild(this.children);
  }
}
