class Field {
    constructor() {}

    static getRandomNum(exceptionArr, max) {
        let num = 0;

        do{
            num = Math.floor( Math.random() * max );
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

        const iHat = Field.getRandomNum( [0], numBoxes );

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
}