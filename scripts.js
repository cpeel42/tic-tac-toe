const GameBoard = (function() {
    const create = function() {
        let spaces = ['', '', '', '', '', '', '', '', ''];
        const checkForWin = function() {
            let isMatch = false;
            function rowOrDiagIsMatch (a,b,c) {
                if (a === b && a === c && a != false) {
                    isMatch = true;
                };
            };
            rowOrDiagIsMatch(spaces[0], spaces[1], spaces[2]);
            rowOrDiagIsMatch(spaces[3], spaces[4], spaces[5]);
            rowOrDiagIsMatch(spaces[6], spaces[7], spaces[8]);
            rowOrDiagIsMatch(spaces[0], spaces[3], spaces[6]);
            rowOrDiagIsMatch(spaces[1], spaces[4], spaces[7]);
            rowOrDiagIsMatch(spaces[2], spaces[5], spaces[8]);
            rowOrDiagIsMatch(spaces[0], spaces[4], spaces[8]);
            rowOrDiagIsMatch(spaces[2], spaces[4], spaces[6]);
            return isMatch;
        };
        return {spaces, checkForWin};
    };
    return {create};
})();

const Player = (function() {
    const create = function(playerName, flip) {
        const name = playerName;
        const symbol = flip ? 'x' : 'o';
        return {name, symbol};
    };
    return {create};
})();

const playGame = (function() {
    const flip = Math.floor(Math.random()*2)
    const players = [Player.create('Chris', flip), Player.create('Erika', !flip)]
    const gameBoard = GameBoard.create()
    const makeMove = function() {
        let currentPlayer = players[flip ^ (i % 2)]; //returns whose turn it is on the given round based on the initial flip
        let isValidMove = false;
        while (!isValidMove) {
            let choice = prompt("Enter the board index number to make a move");
            if (gameBoard.spaces[choice] == '') {
                gameBoard.spaces[choice] = currentPlayer.symbol;
                isValidMove = true;
            } else {
                console.log('Choose another space')
            }
        }
    };
    const init = (function() {
        let gameOver = false;
        console.log(players[0], players[1])
        for (i=1; i<=9 && !gameOver; i++) {
            makeMove();
            gameOver = gameBoard.checkForWin();
            console.log(`round ${i}: ${gameBoard.spaces}`);
        };
    })();
})();


