import { addElement, createAndFillButton, addNonogram, createRandomNonogram, createListDropDown } from "./functions.js";
import { nonogramsEasy, nonogramsHard, nonogramsMedium } from "./constants.js";

export const body = document.querySelector('.body');

const wrapperBody = document.createElement ('div');
wrapperBody.className = 'body__wrapper';

// Header
const header = addElement('header', 'header', wrapperBody);

const nameGame = addElement('h1', 'header__title', header);
export const buttonMenuBurger = addElement('div', 'header__button-menu-burger', header);
export const lineTopButtonMenuBurger = addElement('div', 'button-menu-burger__line line-top', buttonMenuBurger);
export const lineCenterButtonMenuBurger = addElement('div', 'button-menu-burger__line line-center', buttonMenuBurger);
export const lineBottomButtonMenuBurger = addElement('div', 'button-menu-burger__line line-bottom', buttonMenuBurger);
export const burgerMenuWrapper = addElement('div', 'header__burger-menu', header);

nameGame.textContent = 'Nonograms';
// Main
const main = addElement('main', 'main', wrapperBody);

// Section Game Board
const sectionGame = addElement('section', 'game-board', main);

const wrapperGame = addElement('div', 'game-board__wrapper', sectionGame);

// Container Buttons-Level, Button-RandomGame, Button-SaveGame and Button-Continue
export const containerButtonsLevel = addElement('div', 'game-board__container_buttons-level', wrapperGame);
export const buttonEasyLevel = addElement('button', 'buttons-level__button button_easy-level', containerButtonsLevel);
export const listDropDownEasy = addElement('div', 'buttons-level__list_drop-down list-drop-down_easy', containerButtonsLevel);
createListDropDown(nonogramsEasy, 'item_drop-down-easy', listDropDownEasy);
export const buttonMediumLevel = addElement('button', 'buttons-level__button button_medium-level', containerButtonsLevel);
export const listDropDownMedium = addElement('div', 'buttons-level__list_drop-down list-drop-down_medium', containerButtonsLevel);
createListDropDown(nonogramsMedium, 'item_drop-down-medium', listDropDownMedium);
export const buttonHardLevel = addElement('button', 'buttons-level__button button_hard-level', containerButtonsLevel);
export const listDropDownHard = addElement('div', 'buttons-level__list_drop-down list-drop-down_hard', containerButtonsLevel);
createListDropDown(nonogramsHard, 'item_drop-down-hard', listDropDownHard);
export const buttonRandomGame = addElement('button', 'buttons-level__button button_random-game', containerButtonsLevel);
export const buttonSaveGame = addElement('button', 'buttons-level__button button_save-game', containerButtonsLevel);
export const buttonContinueGame = addElement('button','buttons-level__button button_continue-game', containerButtonsLevel);

createAndFillButton(buttonEasyLevel, 'button', 'Easy (5*5) ▼');
createAndFillButton(buttonMediumLevel, 'button', 'Medium (10*10) ▼');
createAndFillButton(buttonHardLevel, 'button', 'Hard (15*15) ▼');
createAndFillButton(buttonRandomGame, 'button', 'Random Game');
createAndFillButton(buttonSaveGame, 'button', 'Save Game');
createAndFillButton(buttonContinueGame, 'button', 'Continue last game');

buttonSaveGame.setAttribute('disabled', 'disabled');
buttonContinueGame.setAttribute('disabled', 'disabled');

//container playing-field
const containerPlayingField = addElement('div', 'game-board__container_playing-field', wrapperGame);
export const titleTimeGame = addElement('p', 'playing-field__title-time-game', containerPlayingField);
export const nonogramPlayingField = addElement('div', 'playing-field__nonogram easy', containerPlayingField);

// nonogram
export const randomNonogram = createRandomNonogram(nonogramsEasy);
addNonogram(randomNonogram, nonogramPlayingField); 

// container score, buttons solution and Reset
const containerScoresAndSolution = addElement ('div', 'game-board__container_scores-solution', wrapperGame);
export const buttonSolution = addElement('button', 'score-solution__button_solution buttons-level__button', containerScoresAndSolution);
export const buttonResetGame = addElement('button', 'score-solution__button_reset-game buttons-level__button', containerScoresAndSolution);
export const containerLinkScores = addElement('div', 'score-solution__link_top-scores', containerScoresAndSolution);

containerLinkScores.textContent = 'Results';
createAndFillButton(buttonSolution, 'button', 'Solution');
createAndFillButton(buttonResetGame, 'button', 'Reset game');

buttonSolution.setAttribute('disabled', 'disabled');
buttonResetGame.setAttribute('disabled', 'disabled');

// buttons switch theme and sound
export const buttonSwitchTheme = addElement('button', 'game-board__button_theme button-circle', wrapperGame);
export const buttonSound = addElement('button', 'game-board__button_sound button-circle', wrapperGame);

createAndFillButton(buttonSwitchTheme, 'button', '');
createAndFillButton(buttonSound, 'button', '');

// audio
export const audioBlackGrid = addElement('audio', '', body);
export const audioCross = addElement('audio', '', body);
export const audioEmptyCell = addElement('audio', '', body);
export const audioModal = addElement('audio', '', body);

audioBlackGrid.src ='assets/audio/3505bf33414114e.mp3';
audioEmptyCell.src = 'assets/audio/2c527a427875501.mp3';
audioCross.src = 'assets/audio/ed2e0bdcba691bf.mp3';
audioModal.src = 'assets/audio/952782968e924cf.mp3';

// modal window when solving a nonogram
export const backgroundModalWindowVictory = addElement('div','modal-window-victory__wrapper', body);
export const modalWindowVictory = addElement('div', 'modal-window-victory__container', backgroundModalWindowVictory);
export const crossModalWindowVictory = addElement('div', 'modal-window-victory__cross', modalWindowVictory);
export const titleModalWindowVictory = addElement('p', 'modal-window-victory__title', modalWindowVictory);

export {wrapperBody};