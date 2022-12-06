class PlayerData {
    constructor(total = 0, rows = new Map([[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]])) {
        this.total = total;
        this.rows = rows;
    }

    addData(numGuesses) {
        this.total += 1;
        this.rows.set(numGuesses, this.rows.get(numGuesses) + 1);
    }

    displayStats() {
        console.log("total games: " + this.total);
        console.log("+---------------+");
        for (let [key, value] of this.rows) {
            if (value === 0) {
                console.log("| " + key + " Guess: 0%   |");
            } else {
                let percent = Math.floor((value / this.total) * 100);
                if (percent < 10) {
                    console.log("| " + key + " Guess: " + percent + "%" + "  |" );
                } else if (percent < 100) {
                    console.log("| " + key + " Guess: " + percent + "%" + "  |" );
                } 
                else {
                    console.log("| " + key + " Guess: " + percent + "%" + " |" );
                }
            }
        }
    }
}