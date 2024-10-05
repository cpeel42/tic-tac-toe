const playerModule = (function() {

    function create(playerName, isX) {
        const name = playerName;
        const symbol = isX ? 'x' : 'o';
        return {name, symbol};
    };

    return {create};

})();

const displayModule = (function() {

    function create() {
        const info = document.querySelector('.info');
        const spaces = [...document.querySelectorAll(".space")]
        const resetButton = document.querySelector('.reset-button');

        for (let i = 0; i < spaces.length; i++) {
            let space = spaces[i]
            space.addEventListener('click', () => {
                const id = space.dataset.spaceNum;
                gameModule.makeMove(id);
            })
        };

        resetButton.addEventListener('click', () => {
            gameModule.reset(updatePlayers());
        });

        function updatePlayers() {
            const playerOne = document.querySelector('.player-one').value;
            const playerTwo = document.querySelector('.player-two').value;
            return { playerOne, playerTwo };
        };

        function updateInfo(information) {
            info.textContent = information;
        }

        function updateSpace(spaceObjects) {
            spaceObjects.forEach(space => {
                const element = document.querySelector(`[data-space-num="${space.id}"]`);
                element.textContent = space.content;
            });
        }

        return {updateInfo, updateSpace, updatePlayers}
    }
    return {create}
})();

const gameModule = (function() {

    const gameState = {
        flip: 0,
        round: 0,
        gameOver: false,
        players: [],
        spaces: [],
    };

    let display = displayModule.create();
    reset({ playerOne: 'Player 1', playerTwo: 'Player 2' });

    function reset({playerOne, playerTwo}) {
        gameState.flip = Math.floor(Math.random() * 2);
        gameState.round = 0;
        gameState.gameOver = false;
        gameState.players = [
            playerModule.create(playerOne, gameState.flip), 
            playerModule.create(playerTwo, !gameState.flip)
        ];
        gameState.spaces = Array.from({ length: 9 }, (_, index) => ({ id: index, content: '' }));
        display.updateInfo('Welcome. Enter player names below, then press Start.')
        display.updateSpace(gameState.spaces);
    }

    function makeMove(choice) {

        if (gameState.gameOver) {
            display.updateInfo("The game is already over! No more moves allowed.");
            return;
        }

        let currentPlayer = gameState.players[gameState.round % 2];
        if (isSpaceTaken(choice)) {
            display.updateInfo("That space is already taken. Try another spot.");
            return; 
        }

        gameState.spaces[choice].content = currentPlayer.symbol;
        display.updateSpace(gameState.spaces);


        if (isGameWon()) {
            handleGameOver(`${currentPlayer.name} has won!`);
            return;
        }

        if (isGameTied()) {
            handleGameOver(`It's a tie!`);
            return;
        }
    
        display.updateInfo("Next player's turn.");
        gameState.round++;
    };

    function handleGameOver(result) {
        gameState.gameOver = true;
        display.updateInfo(result);
    }

    function isSpaceTaken(choice) {
        return gameState.spaces[choice].content !== '';
    }

    function isGameTied() {
        return (gameState.round >= 8 && !isGameWon()) ? true : false;
    };

    function isGameWon() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        for (const [a, b, c] of winConditions) {
            if (gameState.spaces[a].content && 
                gameState.spaces[a].content === gameState.spaces[b].content && 
                gameState.spaces[a].content === gameState.spaces[c].content) {
                return true;
            }
        }
        return false;
    }
    return {makeMove, reset};
})();
