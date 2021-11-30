'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, currentScore, activePlayer, playing;

const init = function() { 
    // Thông tin ban đầu
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');
}
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // toggle dùng để chuyển nếu nó có ở đó thì remove nó đi, 
    // nếu nó ko có ở đó thì add nó
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
// Chuyển sang 0
score0El.textContent = 0;
score1El.textContent = 0;
// Ẩn dice
diceEl.classList.add('hidden');
// Hiện tượng click 
btnRoll.addEventListener('click', function() {
    if(playing) {
        // 1. Thực hiện random dice
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. Display dice
        diceEl.classList.remove('hidden');
        // Change the pictures with random dice
        diceEl.src = `dice-${dice}.png`;
        // 3. Check for rolled 1 : If true switch to next player
        if(dice !== 1) {
           currentScore += dice;
           document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(playing) {
         // 1. Add current score to active player score 
         scores[activePlayer] += currentScore;
         // scores[1] = scores[1] + currentScore;
         document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
         // 2.Check if player's score is >= 100
         if(scores[activePlayer] >=100) {
             // Finish the game 
             playing = false;
             diceEl.classList.add('hidden');
             document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
             document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
         } else {
            switchPlayer();
         }

    } else {
    // Switch to the next player
       switchPlayer();
    }
})
// When reset the game 
btnNew.addEventListener('click', init);

