const body = document.querySelector('.body');


function startGame(){

function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
}
addElement('h1', 'game__title', body);
addElement('div', 'game__wrapper', body);

const gameWrapper = document.querySelector('.game__wrapper');


addElement('div', 'game__img-container', gameWrapper);
addElement('div', 'game__quiz-container', gameWrapper);
addElement('div', 'quiz__buttons-container', gameWrapper);
addElement('div', 'modal_game-end', gameWrapper);

const gameName = document.querySelector('.game__title');
const imgContainer = document.querySelector('.game__img-container');
const quizContainer = document.querySelector('.game__quiz-container');
const buttonsContainer = document.querySelector('.quiz__buttons-container');
const modalWindowEndGame = document.querySelector('.modal_game-end');

gameName.innerText = 'HANGMAN';

addElement('img', 'game__img-gallows', imgContainer);
addElement('img', 'game__img-loop img-pos', imgContainer);
addElement('p', 'quiz__cipher-word', quizContainer);
addElement('p', 'quiz__question', quizContainer);
addElement('p', 'quiz__guesses', quizContainer);

addElement('img', 'modal__img-loop', modalWindowEndGame);
addElement("p", "modal__title-result", modalWindowEndGame);
addElement("p", "modal__title-response", modalWindowEndGame);
addElement('button', 'modal__button', modalWindowEndGame)

const imgGallows = document.querySelector('.game__img-gallows');
const imgLoop = document.querySelector('.game__img-loop');
const quizCipherWord = document.querySelector('.quiz__cipher-word');
const quizQuestion = document.querySelector('.quiz__question');
const quizGuesses = document.querySelector('.quiz__guesses');
const modalImgLoop = document.querySelector('.modal__img-loop');
const modalTitle = document.querySelector('.modal__title-result');
const modalResponse = document.querySelector('.modal__title-response');
const modalButton = document.querySelector('.modal__button');

imgGallows.src = 'assets/gallows.png';
imgGallows.alt = 'Gallows';

imgLoop.src = 'assets/loop.png';
imgLoop.alt = 'Loop';

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

const riddleWord = (item) => {
   const arr = Array(item.length).fill('_');
   return arr.join(' ');
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetRu = "АБВГДЕЁЖЗИКЛМНОПРСТЧШЩЪЫЬЭЮЯ"

const indexRandom = Math.floor(Math.random() * arrayQuestions.length);
let invalidCounter = 0;
let attemptsLeft = 6;

function addImages(){
  let img = document.createElement('img');

  if(invalidCounter >= 1){
    imgLoop.classList.add('none');
    img.className = 'game__img-head img-pos';
    img.src = 'assets/loop-head.png';
    img.alt = 'Head';
  }
  if(invalidCounter >= 2){
    img.className = 'game__img-body img-pos';
    img.src = 'assets/body.png';
    img.alt ='Body';
  }
  if(invalidCounter >= 3){
    img.className = 'game__img-left-hand img-pos';
    img.src = 'assets/left-hand.png';
    img.alt = 'Left hand';
  }
  if(invalidCounter >= 4){
    img.className ='game__img-right-hand img-pos';
    img.src = 'assets/right-hand.png';
    img.alt = 'Right hand';
  }
  if(invalidCounter >= 5){
    img.className = 'game__img-left-foot img-pos';
    img.src = 'assets/left-foot.png';
    img.alt = 'Left foot';
  }
  if(invalidCounter >= 6){
    img.className = 'game__img-right-foot img-pos';
    img.src = 'assets/right-foot.png';
    img.alt = 'Right foot';
  }
  imgContainer.append(img);
}

modalImgLoop.src = "assets/loop.png";
modalImgLoop.alt = 'Loop';
modalButton.type = 'button';
modalButton.innerText = 'Play again';
modalResponse.innerText = `Cipher word: "${arrayResponses[indexRandom]}"`;

function finishGame(){
  if(quizCipherWord.innerText.replaceAll(' ','') === arrayResponses[indexRandom]){
    modalTitle.innerText = "You win!";
    quizContainer.classList.add('opacity');
    imgContainer.classList.add('opacity')
    modalWindowEndGame.classList.add('modal_open');
  }
  if(invalidCounter >= 6){
    modalTitle.innerText = "You lost..."
    modalTitle.style.color = 'red'
    quizContainer.classList.add('opacity');
    imgContainer.classList.add('opacity')
    modalWindowEndGame.classList.add('modal_open');
  }
}

quizCipherWord.innerText = riddleWord(arrayResponses[indexRandom]);
quizQuestion.innerText = arrayQuestions[indexRandom];
quizGuesses.innerText = `Incorrect guesses: ${invalidCounter}/6`;
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
    
    if(arrayResponses[indexRandom].includes(elem.innerText)){
      for(let j = 0; j < arrayResponses[indexRandom].length; j += 1){
        if(arrayResponses[indexRandom][j] === elem.innerText){
          let transformWord = quizCipherWord.innerText.split(' ');
          transformWord[j] = elem.innerText;
          quizCipherWord.innerText = transformWord.join(' ');
        }
      }
    }
    else{
      invalidCounter += 1;
      quizGuesses.innerText = `Incorrect guesses: ${invalidCounter}/6`;
      addImages(); 
    }
    setTimeout(finishGame, 500);
  });
});

document.addEventListener('keydown', (elem) => {
  listButtons.forEach((item) => {

    if(item.innerText === elem.key.toUpperCase()){
      item.classList.add('button_active');
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
    else{
      invalidCounter += 1;
      attemptsLeft -= 1;
      quizGuesses.innerText = `Incorrect guesses ${invalidCounter}/${attemptsLeft}`;
      addImages(); 
    }
    setTimeout(finishGame, 500);
  }

  else if(alphabetRu.includes(elem.key.toUpperCase())){
    alert ("Please, switch your keyboard to the English layout \n(Пожалуйста, переключите клавиатуру на английскую раскладку)");
  }
});
  modalButton.addEventListener('click', () => {
    body.innerHTML = ''
    startGame()
})

}
startGame()


