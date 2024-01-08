const body = document.querySelector('.body');


function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
}

addElement('div', 'game__wrapper', body);

const gameWrapper = document.querySelector('.game__wrapper');

addElement('h1', 'game__title', gameWrapper);
addElement('div', 'game__img-container', gameWrapper);

const gameName = document.querySelector('.game__title');
const imgContainer = document.querySelector('.game__img-container');

gameName.innerText = 'HANGMAN';

addElement('img', 'game__img-gallows', imgContainer);
addElement('img', 'game__img-loop', imgContainer);

const imgGallows = document.querySelector('.game__img-gallows');
const imgLoop = document.querySelector('.game__img-loop');

imgGallows.src = 'assets/gallows.png';
imgGallows.alt = 'Gallows';

imgLoop.src = 'assets/loop.png';
imgLoop.alt = 'Loop';


