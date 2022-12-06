class WordleWord{
    constructor(word) {
        
        this.word = word;
        this.letterCount = WordleGameHelper.getLetterCount(word);
        this.letterList = this.word.split("");
        this.letterPosDict = WordleGameHelper.convertWordToPosDict(word);
        this.wordWeight = WordleGameHelper.getWordWeight(this.letterCount);
    }

    compareWordToSelf(wordToCompWith) {
        let letterPlacement = new Map();
        let wordUseFrequency = WordleGameHelper.mapDeepCopy(this.letterCount);

        for (let [key, value] of wordToCompWith.letterPosDict) {
            
            if (this.letterList.includes(value)) {
                if (this.letterPosDict.get(key) === value) {
                    wordUseFrequency.set(value, wordUseFrequency.get(value) - 1);
                    letterPlacement.set(key, "#");
                }
            }
            else {
                letterPlacement.set(key, "_");
            }
        }

        for (let [key, value] of wordToCompWith.letterPosDict) {
            
            if (letterPlacement.get(key) !== "#" && letterPlacement.get(key) !== "_") {
                if (wordUseFrequency.get(value) > 0) {
                    wordUseFrequency.set(value, wordUseFrequency.get(value) - 1);
                    letterPlacement.set(key, "-");
                } else {
                    letterPlacement.set(key, "_");
                }
            }
            
        }
        return letterPlacement;
    }
}