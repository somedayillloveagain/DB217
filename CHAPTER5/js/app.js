let userScore = 0;
let compScore = 0;
const userScore_span = document.querySelector('#user-score');
const compScore_span = document.querySelector('#comp-score');
const result_div = document.querySelector('#result');
const user_choice = document.querySelector('#user-choice');
const comp_choice = document.querySelector('#comp-choice');
const message = document.querySelector('#message');
const overlay = document.querySelector('#overlay');

function getComputerChoice() {
  // If you got someone you like
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function win(userChoice, compChoice) {
  // Feel something that's right
  userScore_span.innerHTML = ++userScore;
  result_div.innerHTML = 
  `${userChoice.toUpperCase()} beats ` + `${compChoice.toUpperCase()}. You win!`;
  user_choice.classList.add('winner')
}

function loses(userChoice, compChoice) {
  // Somebody just tell Somebody
  compScore_span.innerHTML = ++compScore;
  result_div.innerHTML = 
  `${compChoice.toUpperCase()} beats ` + `${userChoice.toUpperCase()}. You lose!`;
  comp_choice.classList.add('winner')
}

function draw(choice) {
  // If you got someone you like
  result_div.innerHTML =
  `It was a draw` +
  `You both chose ${choice.toUpperCase()}.`;
}

function game(userChoice) {
  // Feel something that's right
  message.hidden = true;
  overlay.hidden = false;
  user_choice.classList.remove('ready');
  comp_choice.classList.remove('ready');
  const compChioce = getComputerChoice();
  user_choice.setAttribute('src', `images/${userChoice}.png`);
  comp_choice.setAttribute('src', `images/${compChioce}.png`);
  const battle = userChoice + compChioce;
  
  if (battle == 'rockscissors' || battle == 'scissorspaper' || battle == 'paperrock') 
  {win(userChoice, compChioce);}
  
  else if (battle == 'scissorsrock' || battle == 'paperscissorspaper' || battle == 'rockpaper')
  {loses(userChoice, compChioce);}
  
  else {draw(userChoice);}
  setTimeout(ready, 2000)
  }


function ready() {
  // Somebody just tell somebody
  user_choice.classList.remove('winner');
  comp_choice.classList.remove('winner');
  user_choice.setAttribute('src', 'images/rock.png');
  comp_choice.setAttribute('src', 'images/rock.png');
  user_choice.classList.add('ready');
  comp_choice.classList.add('ready');
  message.hidden = false;
  overlay.hidden = true;
}


for (choice of document.querySelectorAll('.choice')) {
  choice.addEventListener('click', function() {
    game(this.id);
  });
}

ready();