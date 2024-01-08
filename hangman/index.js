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
addElement('div', 'game__quiz-container',gameWrapper);

const gameName = document.querySelector('.game__title');
const imgContainer = document.querySelector('.game__img-container');
const quizContainer = document.querySelector('.game__quiz-container');

gameName.innerText = 'HANGMAN';

addElement('img', 'game__img-gallows', imgContainer);
addElement('img', 'game__img-loop', imgContainer);
addElement('p', 'quiz__cipher-word', quizContainer);
addElement('p', 'quiz__question', quizContainer);
addElement('p', 'quiz__guesses', quizContainer);

const imgGallows = document.querySelector('.game__img-gallows');
const imgLoop = document.querySelector('.game__img-loop');
const quizCipherWord = document.querySelector('.quiz__cipher-word');
const quizQuestion = document.querySelector('.quiz__question');
const quizGuesses = document.querySelector('.quiz__guesses');

imgGallows.src = 'assets/gallows.png';
imgGallows.alt = 'Gallows';

imgLoop.src = 'assets/loop.png';
imgLoop.alt = 'Loop';

const arrayQuestions = [
                      'Первый зимний месяц?',
                      'Самое высокое животное?',
                      'Столица Японии?', 
                      'Последний месяц лета?',
                      'Самая маленькая птичка?', 
                      'Cтолица Тайланда?',
                      'Второй месяц весны?',
                      'Самое медленное животное?',
                      'Столица Турции?',
                      'Столица Австралии?'
                     ];

const arrayResponses = ['Декабрь', 'Жираф', 'Токио', 'Август', 'Колибри', 'Бангкок', 'Апрель', 'Ленивец', 'Анкара', 'Канберра']; 

const riddleWord = (item) => {
   const arr = Array(item.length).fill('_');
   return arr.join(' ');
};

const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';

const indexRandom = Math.floor(Math.random() * arrayQuestions.length);
const invalidCounter = 0;
const attemptsLeft = 6;

quizCipherWord.innerText = riddleWord(arrayResponses[indexRandom]);
quizQuestion.innerText = arrayQuestions[indexRandom];
quizGuesses.innerText = `Ошибки ${invalidCounter}/${attemptsLeft}`;
console.log(arrayResponses[indexRandom]);

