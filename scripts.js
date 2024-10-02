const GameBoard = (function() {
    const create = function() {
        let spaces = Array(9).fill('');
        return {spaces};
    };
    return {create};
})();

const Player = (function() {
    const create = function(playerName, isX) {
        const name = playerName;
        const symbol = isX ? 'x' : 'o';
        return {name, symbol};
    };
    return {create};
})();

const Display = (function() {
    const create = function() {
        // const playerNames = [...document.querySelectorAll('player-name')]
        const spaces = [...document.querySelectorAll(".space")]
        for (let i = 0; i < spaces.length; i++) {
            let space = spaces[i]
            space.addEventListener('click', () => {
                const id = space.dataset.spaceNum;
                playGame.makeMove(id);
            })
        };
        const resetButton = document.querySelector('.reset-button');
        resetButton.addEventListener('click', () => {
            playGame.resetGame();
        });
        return {spaces}
    }
    return {create}
})();

const playGame = (function() {
    let display = Display.create()
    const flip = Math.floor(Math.random()*2);
    const players = [Player.create('Chris', flip), Player.create('Erika', !flip)];
    let gameBoard = GameBoard.create();
    let gameOver = false
    let round = 0;
    let result;

    const makeMove = function(choice) {
        let currentPlayer = players[flip ^ (round % 2)]; //returns whose turn it is on the given round based on the initial flip
        if (gameOver) {
            console.log('The game is already over.');
            return;
        }
        if (gameBoard.spaces[choice] != '') {
            console.log('This space is already taken.')
            return;
        }
        gameBoard.spaces[choice] = currentPlayer.symbol;
        display.spaces[choice].textContent = currentPlayer.symbol;
        if (gameIsTied() || gameIsWon()) {
            console.log(result);
            gameOver = true;
        }
        round++;
    };

    const gameIsTied = function() {
        if (round >= 8 && !gameIsWon()) {
            result = 'Tie';
            return true;
        }
        return false;
    };

    const gameIsWon = function() {
        const spaces = gameBoard.spaces;
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const [a, b, c] of winConditions) {
            if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
                result = `${spaces[a]} Wins`;
                return true;
            }
        }
        return false;
    }
    const resetGame = function() {
        gameBoard = GameBoard.create(); // Reset the game board
        gameOver = false; // Reset the game over state
        round = 0; // Reset the round counter
        result = null; // Reset the result

        // Clear the display
        display.spaces.forEach(space => {
            space.textContent = '';
        });
        console.log('Game has been reset.');
    };

    return {makeMove, resetGame};
})();


