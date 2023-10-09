//create player
const createPlayer = (name, marker) => {
    return {name, marker};
};

//gameboard obj
const gameBoard = (() => {
    //generate gameboard
    let board = [];
    for (i = 0; i < 9; i++) {
        board.push('');
    };

    //display tile for each array item
    let tileGrid = document.querySelector('.gameboard');

    board.forEach((item, index) => {
        //create tile
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tileGrid.appendChild(tile);
    });

    Array.from(tileGrid.children).forEach((tile, index) => {
        tile.addEventListener('click', () => {
            //display active player marker
            const markerSpan = document.createElement('span');
            markerSpan.classList.add('material-symbols-outlined');
            markerSpan.classList.add('tile-marker')
            markerSpan.textContent = game.activePlayer.marker;
            tile.appendChild(markerSpan);
            //update array value to active player
            board[index] = game.activePlayer.marker;
            //remove listener from marked index
            tile.style.pointerEvents = 'none';
            //update remaining tiles
            game.remainingTiles -= 1;
            //check for winner || remaining tiles
            game.checkWinner();
            if (game.winnerDecided === false) {
                if (game.remainingTiles > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingTiles == 0) {
                    game.tieGame();
                    // game.resetGame();
                };
            };
        });
    });
    return {
        board
    };
})();

//game obj
const game = (() => {
    //declare players
    const playerOne = createPlayer('Player 1', 'close');
    const playerTwo = createPlayer('Player 2', 'circle');

    //starting point
    let activePlayer = playerOne;
    let winnerDecided = false;
    let remainingTiles = 9;

    //document selectors
    let titleSubtext = document.querySelector('.subtext');
    let playerName = document.querySelector('.player-name');

    //set winning conditions
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function checkWinner() {
        winConditions.forEach((item, index) => {
            if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
                titleSubtext.innerHTML = `<span class="player-name">${this.activePlayer.name}</span> wins!`;
                this.winnerDecided = true;
                // resetGame();
            };
        });
    };

    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = 'Player 2' : playerName.textContent = 'Player 1';
    };

    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    };

    function tieGame() {
        titleSubtext.innerHTML = `<b>Tie game!</b>`;
    };

    // function resetGame() {
    //     const modal = document.querySelector('#modal');
    //     modal.style.display = 'block';
    //     modal.addEventListener('click', (event) => {
    //         const { target } = event;
    //         if (target.classList.contains('close')) {
    //             modal.style.display = 'none';
    //         } else if (target.classList.contains('play-again')) {
    //             modal.style.display = 'none';
    //         }
    //     });
    // }

    return {
        activePlayer,
        remainingTiles,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        tieGame,
        winnerDecided
    };
})();