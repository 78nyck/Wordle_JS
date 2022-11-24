class WordleWord{
    constructor(word) {
        
        this.word = word;
        this.letterCount = WordleWord.getLetterCount(word);
        this.letterList = this.word.split("");
        this.letterPosDict = WordleWord.convertWordToPosDict(word);
        this.wordWeight = WordleWord.getWordWeight(this.letterCount);
    }

    compareWordToSelf(wordToCompWith) {
        let letterPlacement = new Map();
        let wordUseFrequency = WordleWord.convertWordToLetterCount(this.word, this.letterCount);

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

    static convertWordToPosDict(word) {
        let index = 0;
        let wordPosDict = new Map();

        for (const ch of word) {
            wordPosDict.set(index, ch);
            index += 1;
        }
        return wordPosDict;
    }

    static getLetterCount(word) {
        let letterCount = new Map();
        for (let ch of word) {
            if (letterCount.get(ch) === undefined) {
                letterCount.set(ch, 1);
            } else {
                letterCount.set(ch, letterCount.get(ch) + 1);
            }
        }
        return letterCount;
    }

    static convertWordToLetterCount(word, letterFreq) {
        let letterCountDict = new Map();
        for (let ch of word) {
            letterCountDict.set(ch, letterFreq.get(ch));
        }
        return letterCountDict;
    }

    static getWordWeight(wordDict) {
        let sum = 0;
        for (let [key, value] of wordDict) {
            sum += LETTER_WEIGHTS.get(key) * value;
        }

        for (let [key, value] of wordDict) {
            if (value >=2) {
                sum = sum - (LETTER_WEIGHTS.get(key) * (value - 1));
            }
        }
        return Math.ceil(sum * 100) / 100;
    }

}