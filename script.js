function gameBoard() {
    const rows = 3;
    const columns = 3;
    board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const markToken = (row, column, playerToken) => {
        const selectedCell = board[row][column];
        if (selectedCell.getValue() !== 0) return;
        selectedCell.addMark(playerToken);
    };

    return { getBoard, markToken };
}

function cell() {
    let value = 0;

    const addMark = (playerToken) => (value = playerToken);
    const getValue = () => value;

    return { addMark, getValue };
}

function gameController(playerOne = "player1", playerTwo = "player2") {
    const players = [
        { name: playerOne, token: 1 },
        { name: playerTwo, token: 2 },
    ];

    let roundCounter = 0;

    const board = gameBoard();

    let activePlayer = players[0];

    const switchActivePlayer = () =>
        (activePlayer = activePlayer === players[0] ? players[1] : players[0]);

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        board.markToken(row, column, getActivePlayer().token);
        roundCounter++;

        const weHaveWinner = checkForWinner(board.getBoard(), row, column);
        const itIsTie = !weHaveWinner && roundCounter === 9;

        if (!weHaveWinner && !itIsTie) switchActivePlayer();
    };

    return { getActivePlayer, playRound };
}

function checkForWinner(gameBoard, row, column) {
    const playedCell = gameBoard[row][column];

    const isRowWin = gameBoard[row].every(
        (cell) => cell.getValue() === playedCell.getValue()
    );

    const isColumnWin = gameBoard.every(
        (row) => row[column].getValue() === playedCell.getValue()
    );

    const leftDiagonalWin =
        row === column &&
        gameBoard.every(
            (row, index) => row[index].getValue === playedCell.getValue()
        );

    const rightDiagonalWin = (row =
        column === gameBoard.length - 1 &&
        gameBoard.every(
            (row, index) =>
                row[gameBoard.length - 1 - index].getValue() ===
                playedCell.getValue()
        ));

    return isRowWin || isColumnWin || leftDiagonalWin || rightDiagonalWin;
}
