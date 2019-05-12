//variable that stores possible word answers
var gameWords  = ["jamesbaldwin", "fscottfitzgerald", "edithwharton", "joandidion", "henrymiller", "jackkeruoac", "langstonhughes", "allenginsberg", "ednastvincentmillay"];

//function to randomly pull word to guess
function randomWord(wordArray) {
    return wordArray[Math.floor(Math.random()*wordArray.length)];
}

//function to determine if the letter guessed is a correct match
function isCorrectGuess(wordChosen, letterGuess) {
    for (i = 0; i < wordChosen.length; i++) {
        if (letterGuess === wordChosen[i]) {
        return true;
        }
    }
    return false;
}

//function to generate letter blanks for word answer
function getBlanks(wordChosen) {
    var blankArray = [];
    for (i = 0; i< wordChosen.length; i++) {
    blankArray.push("_");
    }
    return blankArray
}

//function to full in letter blanks as the correct letter is guess
function fillBlanks(wordChosen, currentArray, letterGuess) {
    for (i = 0; i < wordChosen.length; i++) {
        if (letterGuess === wordChosen[i]) {
            currentArray.splice(i, 1, letterGuess);
        }
    }
    return currentArray;
}

//function to create a round
function setupRound(wordChosen) {
    round = {
        word: wordChosen,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: getBlanks(wordChosen)
    }
    return round;
}

//function to update round after a guess
function updateRound(object, letterGuess) {
    isCorrectGuess(object.word, letterGuess)
    if (isCorrectGuess(object.word, letterGuess) === true) {
        object.puzzleState = fillBlanks(object.word, object.puzzleState, letterGuess);
    } else {
        object.guessesLeft--
        object.wrongGuesses.push(letterGuess);
    }
}

function hasWon(puzzleState) {
    for (i = 0; i < puzzleState.length; i++) {
        if (puzzleState[i] === "_") {
            return false
        }
    }
    return true;
}

function hasLost(guessesLeft) {
    if (guessesLeft === 0) {
        return true; 
    }
    return false;
}

function isEndOfRound(round) {
    if (hasLost(round.guessesLeft === true) || (hasWon(round.puzzleState) === true) || (round.guessesLeft === 0)) {
        return true;
    }
    return false;
}

function setupGame(wordArray, totalWins, totalLosses) {
    var game = {
        words: wordArray,
        wins: totalWins,
        losses: totalLosses,
        round: setupRound(randomWord(wordArray))
    }
    return game;
}

function startNewRound(game) {
    if (hasWon(game.round.puzzleState) === true) {
        game.wins++;
        alert("You won! The word was " + game.round.word + ".")
    } else if (hasLost(game.round.guessesLeft) === true) {
        game.losses++;
        alert("You lost! The word was " + game.round.word + ". Try again!");
    }
    if (isEndOfRound(game.round) === true) {
        game.round = setupRound(randomWord(game.words));
    }
}

var myGame = setupGame(gameWords, 0, 0);
//appending object properties to the document
document.getElementById("puzzle-state").append(myGame.round.puzzleState.join(" "));
document.getElementById("wrong-guesses").append(myGame.round.wrongGuesses);  
document.getElementById("guesses-left").append(myGame.round.guessesLeft);
document.getElementById("win-counter").append(myGame.wins);
document.getElementById("loss-counter").append(myGame.losses);

document.onkeyup = function(event) {
    updateRound(myGame.round, event.key);
    if (isCorrectGuess(myGame.round.word, event.key) === true) {
    document.getElementById("puzzle-state").textContent = myGame.round.puzzleState.join(" ")
    } else {
    document.getElementById("guesses-left").textContent = myGame.round.guessesLeft; 
    document.getElementById("wrong-guesses").textContent = myGame.round.wrongGuesses;
    }
    if (isEndOfRound(myGame.round) === true) {
        startNewRound(myGame);
        document.getElementById("win-counter").textContent = myGame.wins;
        document.getElementById("loss-counter").textContent = myGame.losses;
        document.getElementById("puzzle-state").textContent = myGame.round.puzzleState.join(" ");
        document.getElementById("wrong-guesses").textContent = myGame.round.wrongGuesses;
        document.getElementById("guesses-left").textContent = myGame.round.guessesLeft;
    }
}
