
words = open("words.txt", "r")
wordsFormatted = open("formatted-words.txt", "w")

toWrite = "new Map(["
index = 0
for line in words:
    toWrite = toWrite + "[new WordleWord(" + '"' + line.strip() + '"' + ")" + ", " + str(index)  + "], "
    index+=1

wordsFormatted.write(toWrite)
words.close()





'''
class Helper:
    def __init__(self, word) -> None:
        self.letterCount = {"a": 0, "b": 0, "c": 0, "d": 0, "e": 0, "f": 0, "g": 0, "h": 0, "i": 0, "j": 0,
                    "k": 0, "l": 0, "m": 0, "n": 0, "o": 0, "p": 0, "q": 0, "r": 0, "s": 0, "t": 0,
                    "u": 0, "v": 0, "w": 0, "x": 0, "y": 0, "z": 0}
        for ch in word:
            self.letterCount[ch] = self.letterCount[ch] + 1
        
    def getText(self):
        toWrite = "new Map(["
        text = ""
        for key in self.letterCount:
            text = text + "[" + '"' + key + '"' + ", " + str(self.letterCount[key]) + "], "
        return toWrite + text[:-2] + "])"  

for line in words:
    theWord = line.strip()
    myHelper = Helper(theWord)

    toWrite = "[" + '"' + theWord + '"' ", " + myHelper.getText() + "], "
    wordsFormatted.write(toWrite)


words.close()
wordsFormatted.close()
'''