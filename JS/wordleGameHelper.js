class WordleGameHelper {
    
    static getRandNum(max) {
        return Math.floor(Math.random() * max);
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

    static mapDeepCopy(mapToCopy) {
        let mapCopy = new Map();
        for (let [key, value] of mapToCopy) {
            mapCopy.set(key, value);
        } 
        return mapCopy;
    }
}