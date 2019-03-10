
var HangmanGame = {
    won: 0,
    lost: 0,
    enableInput: true,
    hangWords: 
    ["structure", "resolution", "critical", "practice", "materiality", "linked", "password", "debugging", "instances", "security", "virtual",
    "release", "technology", "reality", "requirement", "insertion", "executing", "javascript", "analytics", "developer"],    
    currentguessesLeft: 10,
    currentGuesses: "",
    userGuess: "",
    wordToGuess: "",
    currentGuessed: "",
    audioWin: new Audio("assets/audio/win-sound.mp3"),
    audioLose: new Audio("assets/audio/fail-buzzer-03.mp3"),
    // setting up variables with HTML tags
    wordToGuessText: document.getElementById("word-to-guess"),
    opportunitiesLeftText: document.getElementById("opportunities-left"),
    guessedLettersText: document.getElementById("letters-tried"),
    errorMsgText: document.getElementById("error-msg"),
    winText: document.getElementById("win-score"),
    loseText: document.getElementById("lose-score"),
    // Functions declaration
    StartNewGame:function () {
        this.enableInput = true;
        this.wordToGuess = this.hangWords[Math.floor(Math.random() * this.hangWords.length)].toString();
        this.hiddenWord(this.wordToGuess);
        this.currentguessesLeft = 10; },
    
    hiddenWord:function(word) {
        this.wordToGuessText.textContent = "";
        this.currentGuessed = "";
        for (var j = 0; j < word.length; j++) {
            this.wordToGuessText.textContent += "_";
            this.currentGuessed += "_";
            }
        this.currentGuesses = "";
    },

    UpdateFoundLetter:function (index, letter) {
        this.currentGuessed = this.currentGuessed.substring(0, index) + letter + this.currentGuessed.substring(index + 1);
        this.wordToGuessText.textContent = this.currentGuessed;
    },
    
    Cleansing:function () {
        console.log("Entro a Reset");
        this.currentGuessed = "";
        this.currentguessesLeft = 10;
        this.opportunitiesLeftText= document.getElementById("opportunities-left");
        this.opportunitiesLeftText.textContent = currentguessesLeft;
    
        this.currentGuesses = "";
        this.guessedLettersText= document.getElementById("letters-tried");
        this.guessedLettersText.textContent = "_";
        this.enableInput = true;
        HangmanGame.StartNewGame();
        HangmanGame.enableInput = true;
    },

    UpdateScore:function () {
        console.log("entro a updatescore");
        this.winText.textContent = this.won;
        this.loseText.textContent = this.lost;
        //this.Cleansing();
    },
    
    GameStatus:function () {
        console.log("entro a GameStatus");
        if (this.currentGuessed == this.wordToGuess) {
            this.wordToGuessText.textContent = this.wordToGuess;
            this.won++;
            this.audioWin.pause();
            this.audioWin.currentTime = 0;
            this.audioWin.play();
            HangmanGame.UpdateScore();
            this.enableInput = false;
            setTimeout(HangmanGame.Cleansing, 1000);
            //HangmanGame.Reset;
        }
    
        if (this.currentguessesLeft == 0) {
            this.lost++;
            this.audioLose.pause();
            this.audioLose.currentTime = 0;
            this.audioLose.play();
            HangmanGame.UpdateScore();
            this.enableInput = false;
            setTimeout(HangmanGame.Cleansing, 1000);
            //HangmanGame.Reset;
        }
    },
    
    validateLetter: function (letter) {
        var count = 0;
        for (var i = 0; i < this.wordToGuess.length; i++) {
            if (this.wordToGuess.charAt(i) == letter) {
                HangmanGame.UpdateFoundLetter(i, letter);
                count++;
            }
        }
        if (count == 0) {
            this.currentguessesLeft--;
            this.opportunitiesLeftText.textContent = this.currentguessesLeft;
        }
    }
}

// Starting a new game
HangmanGame.StartNewGame();

document.onkeyup = function (event) {
    if(HangmanGame.enableInput == false) { return }
    if (!event.key.match(/[a-z]/i) || event.key.length > 1) { 
        HangmanGame.errorMsgText.style.visibility = "visible";
        setInterval(() => { HangmanGame.errorMsgText.style.visibility = "hidden"; }, 3000);
        return; }

    if (HangmanGame.currentGuesses.includes(event.key)) {
        HangmanGame.errorMsgText.style.visibility = "visible";
        // Error Msg hidden after 3 seconds
        setInterval(() => { HangmanGame.errorMsgText.style.visibility = "hidden"; }, 3000);
        return; }

    // if letter is valid, it is stored
    userGuess = event.key;

    HangmanGame.currentGuesses += userGuess + ", ";
    HangmanGame.guessedLettersText.textContent = HangmanGame.currentGuesses;

    // check point
    HangmanGame.validateLetter(userGuess);
    HangmanGame.GameStatus();
};