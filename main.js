const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const field = '░';
const path = '*';

class Field {
    constructor(arr2d) {
        this.grid = arr2d;
    }

    print() {
        let gridStr = this.grid.map(
            arr => arr.join('')
        ).join('\n');

        console.log(gridStr);
    }
}

let smallGame = new Field([
    [path, field, hole],
    [field, hole, field],
    [field, hat, field]
])


const name = prompt('Player name? ');
console.log(`${name.toUpperCase()}'S BOARD`);
smallGame.print();