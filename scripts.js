const game = (function() {
    const gameBoard = (function() {
        const create = function() {
            let spaces = ['', '', '', '', '', '', '', '', ''];
            return {spaces};
        }
        return {create};
    })();
    
    const player = (function() {
        const create = function(playerName, flip) {
            const name = playerName;
            const symbol = flip ? 'x' : 'o';
            console.log(`Player name is ${name}(${symbol})`)
            return {name, symbol};
        }
        return {create};
    })();

    const logic = (function() {
        const create = function() {
            const echo = function() {
                console.log(gameBoards.spaces);
                // console.log(`The players are: ${players[0].echo()} and ${players[1].echo()}`);
                // console.log(players[0]);
                // console.log(`The game state is ${gameBoards().spaces}`);
            }
            const makePlayers = function() {
                const playerOne = player.create('playerOne', flip)
                const playerTwo = player.create('playerTwo', !flip)
                const players = [playerOne, playerTwo]
                return players;
            }
            const makeGameBoard = function() {
                return gameBoard.create();
            }
            const makeMove = function(player, boardIndexNumber) {
                gameBoards.spaces[boardIndexNumber] = player.symbol;
                echo();
                
            }
            const checkForWin = function() {
                let isMatch = false;
                function rowOrDiagIsMatch (a,b,c) {
                    if (a === b && a === c && a != false) {
                        isMatch = true;
                    } 
                }
                let spaces = gameBoards.spaces;
                rowOrDiagIsMatch(spaces[0], spaces[1], spaces[2]);
                rowOrDiagIsMatch(spaces[3], spaces[4], spaces[5]);
                rowOrDiagIsMatch(spaces[6], spaces[7], spaces[8]);
                rowOrDiagIsMatch(spaces[0], spaces[3], spaces[6]);
                rowOrDiagIsMatch(spaces[1], spaces[4], spaces[7]);
                rowOrDiagIsMatch(spaces[2], spaces[5], spaces[8]);
                rowOrDiagIsMatch(spaces[0], spaces[4], spaces[8]);
                rowOrDiagIsMatch(spaces[2], spaces[4], spaces[6]);
                console.log(isMatch);
                return isMatch;
            }
            const play = function() {
                echo();
                let round = 0;
                let gameOver = false;
                while (!gameOver && round < 9) {
                    let choice = prompt("Enter the board index number to make a move");
                    let currentPlayer = players[!flip ^ (round % 2)]; //returns whose turn it is on the given round based on the initial flip
                    makeMove(currentPlayer,choice);
                    gameOver = checkForWin();
                    round ++;
                }
            }
            const flip = Math.floor(Math.random()*2)
            const players = makePlayers(); 
            const gameBoards = makeGameBoard();
            return {play}
        }
        return {create};
    })();
    return {logic}
})();

const gameOne = game.logic.create();
gameOne.play();1
