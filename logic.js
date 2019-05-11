//variable that stores possible word answers
var gameWords  = ["jamesbaldwin", "fscottfitzgerald", "edithwharton", "joandidion", "henrymiller"];

//function to randomly pull word to guess
function randomWord(wordArray) {
    return wordArray[Math.floor(Math.random()*wordArray.length)];
}

//function to determine if the letter guessed is a correct match
function isCorrectGuess(wordAnswer, letterGuess) {
    for (i = 0; i < wordAnswer.length; i++) {
        if (letterGuess === wordAnswer[i]) {
        return true;
        }
    }
    return false;
}

//function to generate letter blanks for word answer
function getBlanks(wordAnswer) {
    var blankArray = [];
    for (i = 0; i< wordAnswer.length; i++) {
    blankArray.push("_");
    }
    return blankArray
}

//function to full in letter blanks as the correct letter is guess
function fillBlanks(wordAnswer, currentArray, letterGuess) {
    for (i = 0; i < wordAnswer.length; i++) {
        if (letterGuess === wordAnswer[i]) {
            currentArray.splice(i, 1, letterGuess);
        }
    }
    return currentArray;
}

//
var round;
var game;

function setupRound(wordAnswer) {
    var object = {
        word: wordAnswer,
        guessesLeft: 9,
        wrongGuesses: [],
        puzzleState: [getBlanks(wordAnswer)]
    }
    return object;
}