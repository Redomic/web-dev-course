let guess = parseInt(prompt('Guess the number between 1-5'));
let noOfGuesses = 0;
let randomNum = Math.floor(Math.random() * 5) + 1;
while (guess != randomNum) {
    noOfGuesses++
    if (guess > randomNum) {
        guess = parseInt(prompt('Try Lower'));
    } else if (guess < randomNum) {
        guess = parseInt(prompt('Try Higher'));
    } else {
        guess = parseInt(prompt('Enter a valid number'));
    }
};