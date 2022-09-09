'use strict';

//modal
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const btnAbout = document.querySelector('.about');
const btnClose = document.querySelector('.btn--close');

const openModal = () => {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
};

const closeModal = () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};

btnAbout.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closeModal();
});

//game
const dieDOM = document.querySelector('.dice');
const btnRoll = document.getElementById('roll');
const btnHold = document.getElementById('hold');
const btnNew = document.getElementById('new');
const player0 = document.getElementById('player-0');
const player1 = document.getElementById('player-1');
const currentScoreP0 = document.getElementById('current-score-0');
const currentScoreP1 = document.getElementById('current-score-1');
const scoreP0 = document.getElementById('score-player-0');
const scoreP1 = document.getElementById('score-player-1');

let activePlayer, currentScore, scores, isPlaying;
const win = 20;

const init = () => {
  dieDOM.classList.add('hidden');
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];
  isPlaying = true;
  currentScoreP0.textContent = currentScore;
  currentScoreP1.textContent = currentScore;
  scoreP0.textContent = scores[0];
  scoreP1.textContent = scores[1];
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

const switchPlayer = () => {
  document
    .getElementById(`player-${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .getElementById(`player-${activePlayer}`)
    .classList.add('player--active');
  currentScore = 0;
  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
};

const rollDie = () => {
  if (isPlaying) {
    const die = Math.floor(Math.random() * 6) + 1;
    dieDOM.src = `./assets/img/dice-${die}.png`;
    dieDOM.classList.remove('hidden');
    if (die === 1) {
      switchPlayer();
      return;
    }
    currentScore += die;
    document.getElementById(`current-score-${activePlayer}`).textContent =
      currentScore;
  }
};

const hold = () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score-player-${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= win) {
      isPlaying = false;
      document
        .getElementById(`player-${activePlayer}`)
        .classList.remove('player--active');
      document
        .getElementById(`player-${activePlayer}`)
        .classList.add('player--winner');
      return;
    }
    switchPlayer();
  }
};

init();

btnRoll.addEventListener('click', rollDie);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', init);
