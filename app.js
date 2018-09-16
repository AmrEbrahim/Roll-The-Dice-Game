/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousdice, previousdice1;
scores = [0, 0];
roundScore = 0;
previousdice = 0;
previousdice1 = 0;
activePlayer = 0;
gamePlaying = true;

// Hide Dice & Reset All TextContent to 0
function newGame() {
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('#name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    scores = [0, 0];
    roundScore = 0;
    previousdice = 0;
    previousdice1 = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}
newGame();
// Next Player Function 

function nextPlayer() {
    document.querySelector('.dice-0').style.display = 'none';
    document.querySelector('.dice-1').style.display = 'none';
    roundScore = 0;
    previousdice = 0;
    previousdice1 = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice-0').style.display = 'block';
        document.querySelector('.dice-0').src = 'dice-' + dice + '.png';
        document.querySelector('.dice-1').style.display = 'block';
        document.querySelector('.dice-1').src = 'dice-' + dice1 + '.png';
        if (dice == 1 || dice1 == 1) {
            nextPlayer();
        } else if (dice == 6 && previousdice == 6 || dice == 6 && previousdice == 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else {
            roundScore += (dice + dice1);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        previousdice = dice
        previousdice1 = dice1
    }
});

// Hold Button
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input
        } else {
            winningScore = 50;
        }
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            gamePlaying = false;
            document.querySelector('.dice-0').style.display = 'none';
            document.querySelector('.dice-1').style.display = 'none';
        } else {
            nextPlayer();
        }
    }
});

// New Game Button
document.querySelector('.btn-new').addEventListener('click', newGame);