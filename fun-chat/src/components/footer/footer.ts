import { LINK_GIT_HUB, LINK_SCHOOL } from '../../shared/const/const';
import './styleFooter.css';

export class Footer {
  item: HTMLDivElement;

  constructor() {
    this.item = document.createElement('div');
    this.item.className = 'footer-main-page';
    this.addChildren();
  }

  private addChildren(): void {
    const linkSchool: HTMLAnchorElement = document.createElement('a');
    const logoSchool: HTMLDivElement = document.createElement('div');
    const year: HTMLParagraphElement = document.createElement('p');
    const linkGit: HTMLAnchorElement = document.createElement('a');
    const logoGit: HTMLDivElement = document.createElement('div');
    logoSchool.className = 'logo-school-footer';
    linkSchool.href = LINK_SCHOOL;
    linkSchool.target = '_blank';
    year.className = 'year-footer';
    year.textContent = '2024';
    logoGit.className = 'logo-git-footer';
    linkGit.href = LINK_GIT_HUB;
    linkGit.target = '_blank';
    linkSchool.append(logoSchool);
    linkGit.append(logoGit);
    this.item.append(linkSchool, year, linkGit);
  }
}
