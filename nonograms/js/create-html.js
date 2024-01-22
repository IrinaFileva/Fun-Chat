import { addElement } from "./functions.js";

export const body = document.querySelector('.body');

const wrapperBody = document.createElement ('div');
wrapperBody.className = 'body__wrapper';

// Header
const header = addElement('header', 'header', wrapperBody);

const nameGame = addElement('h1', 'header__title', header);
nameGame.textContent = 'Nonograms';

// Main
const main = addElement('main', 'main', wrapperBody);


export {wrapperBody}