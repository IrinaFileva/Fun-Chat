const body = document.querySelector('.body');


function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
}

addElement('div', 'game__wrapper', body);

const gameWrapper = document.querySelector('.game__wrapper');

addElement('h1', 'game__title', gameWrapper)

const gameName= document.querySelector('.game__title');

gameName.innerText = 'HANGMAN'
