let p1Score = 0;
let p2Score = 0;

let maxScore = 0;

let gameOver = false;

let winner = document.querySelector('#pwin');

let p1 = document.querySelector('#p1');
let p2 = document.querySelector('#p2');

let maxScoreSelector = document.querySelector('#maxscore');

let plusP1 = document.querySelector('#plusp1');
let plusP2 = document.querySelector('#plusp2');

let reset = document.querySelector('#reset');

plusP1.classList.add('disabled');
plusP2.classList.add('disabled');

maxScoreSelector.addEventListener('change', () => {
    maxScore = parseInt(maxScoreSelector.value);
    resetValues();
    if (maxScore == 0) {
        plusP1.classList.add('disabled');
        plusP2.classList.add('disabled');
    }
})

plusP1.addEventListener('click', () => {
    if (!gameOver) {
        p1Score++;
        p1.innerText = p1Score;
        if (p1Score >= maxScore) {
            gameOver = true;
            plusP1.classList.add('disabled');
            plusP2.classList.add('disabled');
            
            p1.classList.add('won');
            p2.classList.add('lost');

            winner.textContent = 'Player 1 Won!'
            winner.classList.add('won')
        }
    }
});

plusP2.addEventListener('click', () => {    
    if (!gameOver) {
        p2Score++;
        p2.innerText = p2Score;
        if (p2Score >= maxScore) {
            gameOver = true;
            plusP1.classList.add('disabled');
            plusP2.classList.add('disabled');

            p1.classList.add('lost');
            p2.classList.add('won');

            winner.textContent = 'Player 2 Won!'
            winner.classList.add('won')
        }
    }
});

reset.addEventListener('click',  resetValues);

function resetValues() {
    if (maxScore != 0) {
        p1Score = 0;
        p2Score = 0;

        p1.innerText = p1Score;
        p2.innerText = p2Score;

        plusP1.classList.remove('disabled');
        plusP2.classList.remove('disabled');

        p1.classList.remove('won');
        p2.classList.remove('won');
        p1.classList.remove('lost');
        p2.classList.remove('lost');

        winner.textContent = 'Use the buttons to keep score'
        winner.classList.remove('won')

        gameOver = false;
    }
}