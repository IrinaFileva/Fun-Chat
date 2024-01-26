import { addElement, createAndFillButton, addNonogram, createRandomNonogram } from "./functions.js";
import { nonogramsEasy } from "./constants.js";
export const body = document.querySelector('.body');

const wrapperBody = document.createElement ('div');
wrapperBody.className = 'body__wrapper';

// Header
const header = addElement('header', 'header', wrapperBody);

const nameGame = addElement('h1', 'header__title', header);
nameGame.textContent = 'Nonograms';

// Main
const main = addElement('main', 'main', wrapperBody);

// Section Game Board
const sectionGame = addElement('section', 'game-board', main);

const wrapperGame = addElement('div', 'game-board__wrapper', sectionGame);

// Container Buttons-Level And Button-RandomGame
const containerButtonsLevel = addElement('div', 'game-board__container_buttons-level', wrapperGame);
const buttonEasyLevel = addElement('button', 'buttons-level__button button_easy-level', containerButtonsLevel);
const buttonMediumLevel = addElement('button', 'buttons-level__button button_medium-level', containerButtonsLevel);
const buttonHardLevel = addElement('button', 'buttons-level__button button_hard-level', containerButtonsLevel);
const buttonRandomGame = addElement('button', 'buttons-level__button button_random-game', containerButtonsLevel);

createAndFillButton(buttonEasyLevel, 'button', 'Easy (5*5) ▼');
createAndFillButton(buttonMediumLevel, 'button', 'Medium (10*10) ▼');
createAndFillButton(buttonHardLevel, 'button', 'Hard (15*15) ▼');
createAndFillButton(buttonRandomGame, 'button', 'Random Game');

//container playing-field
const containerPlayingField = addElement('div', 'game-board__container_playing-field', wrapperGame);
const titleTimeGame = addElement('p', 'playing-field__title-time-game', containerPlayingField);
const nonogramPlayingField = addElement('div', 'playing-field__nonogram easy', containerPlayingField);

titleTimeGame.textContent = 'Game Time: 00.00';
// nonogram
export const randomNonogram = createRandomNonogram(nonogramsEasy);
addNonogram(randomNonogram, nonogramPlayingField); 
// container score & solution
const containerScoresAndSolution = addElement ('div', 'game-board__container_scores-solution', wrapperGame);
const containerLinkScores = addElement('div', 'score-solution__link_top-scores', containerScoresAndSolution);
const buttonSolution = addElement('button', 'score-solution__button_solution buttons-level__button', containerScoresAndSolution);

containerLinkScores.textContent = 'Best Time:';
createAndFillButton(buttonSolution, 'button', 'Solution');

// button switch theme
const buttonSwitchTheme = addElement('button', 'game-board__button_theme', wrapperGame);

createAndFillButton(buttonSwitchTheme, 'button', '');

export {wrapperBody};