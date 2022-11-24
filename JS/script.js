wordBoard = $(".word-board")[0];

var curRowIndex = 0;
var curRow = wordBoard.children[curRowIndex];

var curLetterIndex = 0;
var curLetter = curRow.children[curLetterIndex];
var curH1 = curLetter.children[0];

var randomWord = WORD_LIST.get(getRandNum(WORD_LIST.size));
var chosenWord = "prime"
var mainWord = new WordleWord(randomWord);

console.log("Main Word: ");
console.log(mainWord.word);
console.log("___________") 

var myAI = new WordleAI();
let myStartWord = new WordleWord("audio");
let AIGuess = myStartWord//myAI.makeGuess();
myAI.reduceWordSpace(AIGuess, mainWord.compareWordToSelf(AIGuess));
console.log("Current Guess: ")
console.log(AIGuess.word);
console.log("_______________")

let keyFadeDuration = 20;

//console.log(mainWord);  

$(".keyboard-letter-box").on("click", function() {
    $(this).fadeOut(keyFadeDuration).fadeIn(keyFadeDuration);
    whenClicked(this);
});

$("body").on("keydown", function(e) {

    if (e.key === "Enter") {
        $("#" + e.key).fadeOut(keyFadeDuration).fadeIn(keyFadeDuration);
        whenClicked($("#" + e.key)[0]);

    } else if (e.key === "Backspace") {
        $("#" + "Del").fadeOut(keyFadeDuration).fadeIn(keyFadeDuration);
        whenClicked($("#" + "Del")[0]);

    } else if (letterSet.has(e.key)) {
        $("#" + e.key.toUpperCase()).fadeOut(keyFadeDuration).fadeIn(keyFadeDuration);
        whenClicked($("#" + e.key.toUpperCase())[0]);
    }
});



function whenClicked(element) {
    
    letter = element.children[0].innerHTML;

    if (letter == "Del") {
        if (curLetterIndex == 0 && !$(curH1).hasClass("letter-hidden")) {
            $(curH1).addClass("letter-hidden");

        } else if (curLetterIndex > 0 && curLetterIndex <= 4 && !$(curH1).hasClass("letter-hidden")) {
            $(curH1).addClass("letter-hidden");
            decCurLetter();

        } else if (curLetterIndex > 0 && curLetterIndex <= 4 && $(curH1).hasClass("letter-hidden")){
            decCurLetter();
            $(curH1).addClass("letter-hideen");
        } 

    } else if (letter == "Enter") {
        let fullWord = getFullWord().toLowerCase();

        if (WORDS.has(fullWord) && curRowIndex <= 4) {
            console.log("was in");

            let myWord = new WordleWord(fullWord);
            let wordMap = mainWord.compareWordToSelf(myWord);

            let AIGuess = myAI.makeGuess();
            console.log("Current Guess: ")
            console.log(AIGuess.word);
            console.log("_______________")
            myAI.reduceWordSpace(AIGuess, mainWord.compareWordToSelf(AIGuess));
            
            iterateThroughRow(wordMap);
            resetValues(curRowIndex + 1);

        } else if (WORDS.has(fullWord) && curRowIndex == 5) {
            console.log("was in");

            
            let myWord = new WordleWord(fullWord);
            let wordMap = mainWord.compareWordToSelf(myWord);
            iterateThroughRow(wordMap);

            
        } else {
            $(curRow).fadeOut(100).fadeIn(100);
            
        }

    } else {
        
        if (curLetterIndex < 4 && $(curH1).hasClass("letter-hidden")) {
            $(curH1).text(letter);
            $(curH1).removeClass("letter-hidden");

        } else if (curLetterIndex < 4 && !$(curH1).hasClass("letter-hidden")) {
            incCurLetter();
            $(curH1).text(letter);
            $(curH1).removeClass("letter-hidden");
        }   
    } 
}

function incCurLetter() {
    if (curLetterIndex < 4) {
        curLetterIndex += 1;
        curLetter = curRow.children[curLetterIndex];
        curH1 = curLetter.children[0];
    }
}

function decCurLetter() {
    if (curLetterIndex > 0) {
        curLetterIndex -= 1;
        curLetter = curRow.children[curLetterIndex];
        curH1 = curLetter.children[0];
    }
}

function resetValues(rowIndex) {
    curRowIndex = rowIndex;
    curRow = wordBoard.children[curRowIndex];

    curLetterIndex = 0;
    curLetter = curRow.children[curLetterIndex];
    curH1 = curLetter.children[0];

}

function getFullWord() {
    let theWord = "";
    for (const div of curRow.children) {
        if (!$(div.children[0]).hasClass("letter-hidden")) {
            theWord += div.children[0].innerHTML;
        }
    }
    return theWord;
}

function getRandNum(max) {
    return Math.floor(Math.random() * max);
}

function iterateThroughRow(wordMap) {
    let index = 0;
    for (let div of curRow.children) {
        let keyName = "#" + div.children[0].innerHTML;
        if (wordMap.get(index) === "#") {
            $(div).addClass("letter-correct");

            $(keyName).removeClass("letter-wrong letter-in-word letter-correct");
            $(keyName).addClass("letter-correct");

        } else if (wordMap.get(index) === "-") {
            $(div).addClass("letter-in-word");

            $(keyName).removeClass("letter-wrong letter-in-word letter-correct");
            $(keyName).addClass("letter-in-word");

        } else {
            $(div).addClass("letter-wrong");

            $(keyName).removeClass("letter-wrong letter-in-word letter-correct");
            $(keyName).addClass("letter-wrong");
        }
        index +=1;
    }
}

