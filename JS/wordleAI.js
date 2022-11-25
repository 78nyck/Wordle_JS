class WordleAI{
    constructor(currentWordSpace = NEW_WORDS) {
        this.currentWordSpace = currentWordSpace;
    }

    makeGuess() {
        let maxGuess = new WordleWord("zzzzz");
        for (let [,value] of this.currentWordSpace) {
            let curWord = value;
            if (curWord.wordWeight > maxGuess.wordWeight) {
                maxGuess = curWord;
            }
        }
        return maxGuess;
    }

    reduceWordSpace(wordleWord, letterPlacement) {
        let greenSpots = this.reduceByGreenSpots(wordleWord, letterPlacement)
        let orangeSpots = this.reduceByOrangeSpots(greenSpots, wordleWord, letterPlacement);
        let graySpots = this.reduceByGraySpots(greenSpots, orangeSpots, wordleWord, letterPlacement);
        return this.currentWordSpace;
    }
    reduceByOrangeSpots(greenSpots, wordleWord, letterPlacement) {
        let newWordSpace = new Map();
        let orangeSpots = new Map();

        for (let [key, value] of letterPlacement) {
            if (value === "-") {
                orangeSpots.set(key, wordleWord.letterPosDict.get(key));
            }
        }
        
        for (let [key, value] of this.currentWordSpace) {
            //let someWord = new WordleWord(key, value);
            let noGreenPosList = new Map();
            for (let [sWKey, sWValue] of value.letterPosDict) {
                if (greenSpots.get(sWKey) !== sWValue) {
                    noGreenPosList.set(sWKey, sWValue);
                }
            }
            let cum = true;

            for (let [oGKey, oGValue] of orangeSpots) {
                cum = cum && (Array.from(noGreenPosList.values()).includes(oGValue) && (noGreenPosList.get(oGKey) !== oGValue));
            }

            if (cum) {
                newWordSpace.set(key, value)
            }
        }
        this.currentWordSpace = newWordSpace;

        return orangeSpots;
    }

    reduceByGraySpots(greenSpots, orangeSpots, wordleWord, letterPlacement) {
        let newWordSpace = new Map();
        let graySpots = new Map();

        let orangeLetterList = Array.from(orangeSpots.values());

        let toReturn = true;

        for (let [key, value] of letterPlacement) {
            if (value === "_") {
                graySpots.set(key, wordleWord.letterPosDict.get(key));
            }
        }

        let grayLetterList = Array.from(graySpots.values());

        for (let [key, value] of this.currentWordSpace) {
            toReturn = true;
            // copy the random words pos dict
            let someWord = new WordleWord(key, value);
            let someWordPosDictCopy = new Map();
            for (let [key, value] of someWord.letterPosDict) {
                someWordPosDictCopy.set(key, value);
            }
            // remove the green letters

            for (let [aKey, aValue] of greenSpots) {
                if (someWordPosDictCopy.get(aKey) === aValue) {
                    someWordPosDictCopy.delete(aKey);
                }
            }

            for (let [bKey, bValue] of someWordPosDictCopy) {
                if (grayLetterList.includes(bValue) && !orangeLetterList.includes(bValue)) {
                    toReturn = false;
                    break;
                }
            }

            if (toReturn) {
                newWordSpace.set(key, value)
            }
        }
        this.currentWordSpace = newWordSpace;
        return graySpots;
    }

            

    reduceByGreenSpots(wordleWord, letterPlacement) {
        let newWordSpace = new Map();
        let greenSpots = new Map();
        
        for (let [key, value] of letterPlacement) {
            if (value === "#") {
                greenSpots.set(key, wordleWord.letterPosDict.get(key));
            }
        }

        for (let [key, value] of this.currentWordSpace) {
            let someWord = new WordleWord(key, value);
            let cum = true;

            for (let [gSKey, gSValue] of greenSpots) {
                cum = cum && (someWord.letterPosDict.get(gSKey) === gSValue);
            }

            if (cum) {
                newWordSpace.set(key, value);
            }
        }

        this.currentWordSpace = newWordSpace

        return greenSpots;
    }
}