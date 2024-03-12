import './global.css';
import { startButton, startPage } from './app/components/startPage/page';
import { startForm } from './app/components/startForm/form';
import { modalExitButtonYes } from './app/components/gamePage/itemPageGame/header';
import { gamePage } from './app/components/gamePage/page';

if (!localStorage.getItem('IF-Puzzle')) {
  document.body.append(startForm);
} else {
  document.body.append(startPage);
}

startButton.addEventListener('click', () => {
  startPage.remove();
  setTimeout((): void => document.body.append(gamePage), 500);
});

modalExitButtonYes.addEventListener('click', () => {
  localStorage.clear();
  gamePage.remove();
  setTimeout((): void => document.body.append(startForm), 500);
});
