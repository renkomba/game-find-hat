# Find Your Hat
*simple terminal game*

* [Description](#description)
* [Features](#features)
* [Feature To Add](#features-to-add)
* [How To Use](#how-to-use)
* [Technologies](#technologies)

---

## Description
> Use the safe paths to get to your hat, -OR-
> go rogue and fall to your death.
> No presh.

Move through the grey paths to get to your "hat".

## Features
1. Classic W-A-S-D movement keys
2. Coloured path, holes, and hat

## Features To Add
### May-June 2022
1. ~Movement keys. Change to more adjacent keys like "wasd".~
2. French theme. Concept: PLAYER is letter "e" looking for its accent (*aigu, grave, circonflexe, tréma*).
3. Secret level. PLAYER is a "c" looking for its *cédille*.
4. Function. Ensure that generated boards are winable.
5. Lives. Add lives for when PLAYER accidentally falls off board.

## How To Use
1. Run the game using
    ``` nodejs
    node main.js
    ```

2. PLAYER will be prompted for their name, given a random board (3x3 minimum) to play, and asked if they want a new one. 
    * If they type 'n', the game will begin with the generated board
    * Else, a new board will be generated and they will be asked if they want a new one

3. Use the appropriate key to move in any direction
    * "W" to go up
    * "A" to go left
    * "S" to go down
    * "D" to go right

4. Reach the "^" to win

5. Lose if you fall off the board or run into a hole "0"

## Technologies
JavaScript

<!-- ## Collaborators -->

<!-- ## License -->