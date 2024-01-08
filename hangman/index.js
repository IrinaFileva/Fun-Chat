const body = document.querySelector('.body');


function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
}

addElement('div', 'game__wrapper', body);

const gameWrapper = document.querySelector('.game__wrapper');


