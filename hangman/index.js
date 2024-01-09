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
addElement('div', 'quiz__buttons-container', quizContainer);

const imgGallows = document.querySelector('.game__img-gallows');
const imgLoop = document.querySelector('.game__img-loop');
const quizCipherWord = document.querySelector('.quiz__cipher-word');
const quizQuestion = document.querySelector('.quiz__question');
const quizGuesses = document.querySelector('.quiz__guesses');
const buttonsContainer = document.querySelector('.quiz__buttons-container');

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
let invalidCounter = 0;
let attemptsLeft = 6;

quizCipherWord.innerText = riddleWord(arrayResponses[indexRandom]);
quizQuestion.innerText = arrayQuestions[indexRandom];
quizGuesses.innerText = `Ошибки ${invalidCounter}/${attemptsLeft}`;
console.log(arrayResponses[indexRandom]);

for( let i = 0; i < alphabet.length; i +=1){
  addElement('button', 'quiz__button', buttonsContainer);
}

let listButtons = document.querySelectorAll('.quiz__button');

listButtons.forEach((elem, index) => {
  elem.type ='button';
  elem.innerText = alphabet[index];

  elem.addEventListener('click', () => {
    elem.classList.add('button_active');
    invalidCounter += 1;
    attemptsLeft -= 1;

    for(let i = 0; i < arrayResponses[indexRandom].length; i +=1){
      if(elem.innerText === arrayResponses[indexRandom][i].toUpperCase()){
        let transformWord = quizCipherWord.innerText.split(' ');
        transformWord[i] = arrayResponses[indexRandom][i];
        quizCipherWord.innerText = transformWord.join(' ');
        invalidCounter -=1;
        attemptsLeft +=1;
      };  
    };
    quizGuesses.innerText = `Ошибки ${invalidCounter}/${attemptsLeft}`;
  });
});
