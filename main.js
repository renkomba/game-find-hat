const prompt = require('prompt-sync')({sigint: true});

// ANSI escape colour codes for terminal
const colours = {
    red: '\x1b[91m',
    yellow: '\x1b[93m',
    pink: '\x1b[95m',
    black: '\x1b[30m',
    end: '\x1b[0m'
};

const accentsAndLetters = {
    e: {
        accent: ['/', '\\', '^', ':', 'a', 'o'],
        letter: ['é', 'è', 'ê', 'ë', 'æ', 'œ']
    },
    a: {
        accent: ['\\', '^', ':', 'e'],
        letter: ['à', 'â', 'ä', 'æ'],
    },
    o: {
        accent: [':', '^', 'e'],
        letter: ['ö', 'ô', 'œ'],
    },
    i: {
        accent: [':'],
        letter: ['ï'],
    },
    u: {
        accent: [':'],
        letter: ['ü'],
    },
    c: {
        accent: ['s'],
        letter: ['ç'],
    }
    // n: ['ñ']
    // n: ['~']
};

const getLetter = () => {
    let keys = Object.keys(accentsAndLetters);
    let i = getI(keys);
    
    return keys[i];
}

const getI = arr => {
    return Math.floor( Math.random() * arr.length );
}

const letter = getLetter();
const i = getI(accentsAndLetters[letter].letter);
const [ accent, accentedLetter ] = [
    accentsAndLetters[letter].accent[i],
    accentsAndLetters[letter].letter[i]
];

const hole = colours.black + 'O' + colours.end;
const hat = colours.pink + accent + colours.end;
const winner = colours.pink + accentedLetter + colours.end;
const loser = colours.red + 'X' + colours.end;
const field = '░';

const path = colours.yellow + letter + colours.end;
const winningPath = colours.pink + letter + colours.end;
const losingPath = colours.red + letter + colours.end;


class Field {
    constructor(arr2d) {
        this._grid = arr2d;
        this._position = [0,0];
        this._rows = arr2d.length;
        this._columns = arr2d[0].length;
        this._path = [[0,0]];
        this._directions = {
            w: 'up',
            d: 'right',
            s: 'down',
            a: 'left'
        };
    }

    set grid(newGrid) {
        this._grid = newGrid;
        this._rows = newGrid.length;
        this._columns = newGrid[0].length;
    }

    get grid() {
        return this.print();
    }

    set position(newCoordinates) {
        this._position = newCoordinates;
    }

    get position() {
        return this._position;
    }

    print() {
        let gridStr = this._grid.map(
            arr => arr.join('')
        ).join('\n');

        console.log(gridStr);
        return this._grid;
    }

    static getRandomNum(exceptionArr, max) {
        let num = 0;

        do {
            num = Math.floor( Math.random() * max)
        } while (exceptionArr.includes(num));

        return num;
    }

    static generateField(height, width=height) {
        [ height, width ] = [
            height < 3 ? 3 : height,
            width < 3 ? 3 : width
        ];

        let [ multipleOfFive, numHoles, numBoxes, box, iHoles, newGrid ] = [
            5,
            1,
            width * height,
            0,
            [],
            []
        ];

        const iHat = Field.getRandomNum( [0], numBoxes);

        // determine num of holes
        do {
            multipleOfFive += 5;
            numHoles++;
        } while (multipleOfFive < numBoxes);

        // set indexes of holes
        for (let i = 0; i < numHoles; i++) {
            let j = 0;

            j = Field.getRandomNum( [0, iHat, ...iHoles], numBoxes );
            iHoles[i] = j;
        }

        // fill new grid
        for (let i = 0; i < height; i++) {
            newGrid.push([]);

            for (let j = 0; j < width; j++) {
                if ( box === 0 ) {
                    newGrid[i][j] = path;
                } else if ( box === iHat ) {
                    newGrid[i][j] = hat;
                } else if ( iHoles.includes(box) ) {
                    newGrid[i][j] = hole;
                } else {
                    newGrid[i][j] = field;
                }

                box++;
            }
        }

        return newGrid;
    }

    move (direction) {
        if (direction === 'left') this._position[1]--;
        if (direction === 'right') this._position[1]++;
        if (direction === 'up') this._position[0]--;
        if (direction === 'down') this._position[0]++;

        let [row, col] = this._position;
        if (row < 0 || col < 0) {
            console.log('=== GAME OVER ===\nYou fell off the board!')
            this.wonGame(false)
            this.print();
            return false;
        }
        if (this._grid[row][col] === hole) {
            console.log('=== GAME OVER ===\nYou fell into a hole!')
            this._grid[row][col] = loser;
            this.wonGame(false)
            this.print();
            return false;
        }
        if (this._grid[row][col] === hat) {
            console.log('=== VICTORY ===\nYou found your hat!')
            this._grid[row][col] = winner;
            this.wonGame(true)
            this.print();
            return false;
        }

        this._grid[row][col] = path;
        this._path.push( [ row, col ] );
        this.print();
        return true;
    }

    wonGame(won) {
        let token = won ? winningPath : losingPath;

        for (let step of this._path) {
            this._grid[ step[0] ][ step[1] ] = token;
        }
    }

    changeGrid() {
        let change = false;

        do {
            change = prompt('Change board (y/n) ? ');
            change = change.toLowerCase()[0] === 'n' ? false : true;
        
            if (change) {
                this._grid = Field.generateField( Math.floor( Math.random() * 10 ) );
            }

            this.print();
        } while (change);
    }

    play() {
        let keepPlaying = true;

        do {
            let move = prompt('=== Your move | A (left) | W (up) | S (down) | D (right) ||  ');
            keepPlaying = this.move(this._directions[move]);

            // if (keepPlaying) this.play();
        } while (keepPlaying);
    }
}

const start = () => {
    let name = prompt('Player name? ');

    console.log(colours.yellow + `${name.toUpperCase()}'S BOARD` + colours.end);
    return new Field( Field.generateField( Math.floor( Math.random() * 10 ) ) );
}

// RUN GAME
let game = start();
game.print();
game.changeGrid();
game.play();