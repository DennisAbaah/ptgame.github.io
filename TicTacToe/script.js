const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    e.target.innerText = currentPlayer;

    checkWinner();
    switchPlayer();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageElement.innerText = `${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        messageElement.innerText = 'Draw!';
        isGameActive = false;
        return;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    messageElement.innerText = '';
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
