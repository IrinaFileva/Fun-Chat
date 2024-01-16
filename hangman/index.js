const body = document.querySelector('.body');

function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
  return item;
}

const gameName = addElement('h1', 'game__title', body);
const gameWrapper = addElement('div', 'game__wrapper', body);
const imgContainer = addElement('div', 'game__img-container', gameWrapper);
const quizContainer = addElement('div', 'game__quiz-container', gameWrapper);
const quizCipherWord = addElement('p', 'quiz__cipher-word', quizContainer);
const quizQuestion = addElement('p', 'quiz__question', quizContainer);
const quizGuesses = addElement('p', 'quiz__guesses', quizContainer);
const buttonsContainer = addElement('div', 'quiz__buttons-container', gameWrapper);
const modalWindowEndGame = addElement('div', 'modal_game-end', gameWrapper);
const modalImgLoop = addElement('img', 'modal__img-loop', modalWindowEndGame);
const modalTitle = addElement("p", "modal__title-result", modalWindowEndGame);
const modalResponse = addElement("p", "modal__title-response", modalWindowEndGame);
const modalButton = addElement('button', 'modal__button', modalWindowEndGame);
let arrayButton = [];
let invalidCounter = 0;
let indexRandom;
let imgGallows;
let imgLoop;

const arrayQuestions = [
  "The first month of winter?",
  "What's the tallest animal?",
  "The capital of Japan?", 
  "The last month of summer?",
  "What is the fastest animal?", 
  "The capital of Thailand?",
  "The second month of spring?",
  "What's the slowest animal?",
  "The capital of Turkey?",
  "The capital of Australia?"
 ];

const arrayResponses = ['DECEMBER', 'GIRAFFE', 'TOKYO', 'AUGUST', 'CHEETAH', 'BANGKOK', 'APRIL', 'SLOTH', 'ANKARA', 'CANBERRA'];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetRu = "АБВГДЕЁЖЗИКЛМНОПРСТЧШЩЪЫЬЭЮЯ";

const riddleWord = (item) => {
  const arr = Array(item.length).fill('_');
  return arr.join(' ');
};

gameName.innerText = 'HANGMAN';


function createGallows(){
  imgGallows = addElement('img', 'game__img-gallows', imgContainer);
  imgLoop = addElement('img', 'game__img-loop img-pos', imgContainer);
  imgGallows.src = 'assets/gallows.png';
  imgGallows.alt = 'Gallows';
  imgLoop.src = 'assets/loop.png';
  imgLoop.alt = 'Loop';
  return imgLoop;
}

createGallows()


function addQuestionAndCipherWord(){
  indexRandom =  Math.floor(Math.random() * arrayQuestions.length);
  quizCipherWord.innerText = riddleWord(arrayResponses[indexRandom]);
  quizQuestion.innerText = arrayQuestions[indexRandom];
  quizGuesses.innerText = `Incorrect guesses: ${invalidCounter}/6`;
  console.log(arrayResponses[indexRandom]);
  return indexRandom;
}

addQuestionAndCipherWord();

function addImages(){
  imgLoop.classList.add('none');
  let img = document.createElement('img');
  img.className = `game__img-${invalidCounter} img-pos`;
  img.src = `assets/error${invalidCounter}.png`;
  img.alt = '';
  imgContainer.append(img);
}

function finishGame(){
  modalImgLoop.src = "assets/loop.png";
  modalImgLoop.alt = 'Loop';
  modalButton.type = 'button';
  modalButton.innerText = 'Play again';
  modalResponse.innerText = `Cipher word: "${arrayResponses[indexRandom]}"`;

  if(quizCipherWord.innerText.replaceAll(' ','') === arrayResponses[indexRandom]){
    modalTitle.innerText = "You win!";
    quizContainer.classList.add('opacity');
    imgContainer.classList.add('opacity');
    modalWindowEndGame.classList.add('modal_open');
  }

  if(invalidCounter >= 6){
    modalTitle.innerText = "You lost...";
    modalTitle.style.color = 'red';
    quizContainer.classList.add('opacity');
    imgContainer.classList.add('opacity');
    modalWindowEndGame.classList.add('modal_open');
  }
}


for(let i = 0; i < alphabet.length; i +=1){
  let letterButton = addElement('button', 'quiz__button', buttonsContainer);
  letterButton.type ='button';
  letterButton.innerText = alphabet[i];
  letterButton.addEventListener('click', () => {
    letterButton.classList.add('button_active');
    arrayButton.push(letterButton.innerText);
    if(arrayResponses[indexRandom].includes(letterButton.innerText)){
      for(let j = 0; j < arrayResponses[indexRandom].length; j += 1){
        if(arrayResponses[indexRandom][j] === letterButton.innerText){
          let transformWord = quizCipherWord.innerText.split(' ');
          transformWord[j] = letterButton.innerText;
          quizCipherWord.innerText = transformWord.join(' ');
        }
      }
    }
    else if(invalidCounter < 6){
      invalidCounter += 1;
      quizGuesses.innerText = `Incorrect guesses: ${invalidCounter}/6`;
      addImages(); 
    }
    setTimeout(finishGame, 400);
  });
}

const listButtons = document.querySelectorAll('.quiz__button');

document.addEventListener('keydown', (elem) => {
  if(!arrayButton.includes(elem.key.toUpperCase()) || arrayButton.length === 0){
    listButtons.forEach((item) =>{
      if(item.innerText === elem.key.toUpperCase()){
        item.classList.add('button_active');
        arrayButton.push(item.innerText);
      }
  })

  if(alphabet.includes(elem.key.toUpperCase())){
    if(arrayResponses[indexRandom].includes(elem.key.toUpperCase())){
      for(let j = 0; j < arrayResponses[indexRandom].length; j += 1){
        if(arrayResponses[indexRandom][j] === elem.key.toUpperCase()){
          let transformWord = quizCipherWord.innerText.split(' ');
          transformWord[j] = elem.key.toUpperCase();
          quizCipherWord.innerText = transformWord.join(' ');
        }
      }
    }
    else if(invalidCounter < 6){
      invalidCounter += 1;
      quizGuesses.innerText = `Incorrect guesses ${invalidCounter}/6`;
      addImages(); 
    }
    setTimeout(finishGame, 400);
  }
  else if(alphabetRu.includes(elem.key.toUpperCase())){
    alert ("Please, switch your keyboard to the English layout \n(Пожалуйста, переключите клавиатуру на английскую раскладку)");
  }
}
});


modalButton.addEventListener('click', () => {
    invalidCounter = 0;
    listButtons.forEach((x) => x.classList.remove('button_active'));
    while(imgContainer.firstChild){
      imgContainer.removeChild(imgContainer.firstChild);
    }
    modalWindowEndGame.classList.remove('modal_open');
    quizContainer.classList.remove('opacity');
    imgContainer.classList.remove('opacity');
    createGallows();
    addQuestionAndCipherWord();
    arrayButton = [] 
});
