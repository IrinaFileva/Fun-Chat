export function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
  return item;
}

export function createAndFillButton(button, kind ,text){
  button.type = kind;
  button.textContent = text;
}