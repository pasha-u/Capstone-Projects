// Select all buttons with the class 'box'
const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-btn');
const msgContainer = document.querySelector('.msg-container');
const msg = document.getElementById('msg');

// Initialize the current player (X starts)
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left
  [2, 4, 6]  // Diagonal from top-right
];

// Check for a win or tie
function checkGameStatus() {
  // Check for a winner
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boxes[a].textContent === currentPlayer &&
      boxes[b].textContent === currentPlayer &&
      boxes[c].textContent === currentPlayer
    ) {
      gameActive = false;
      msg.textContent = `Player ${currentPlayer} Wins!`;
      msgContainer.classList.remove('hide');
      return;
    }
  }

  // Check for a tie
  const allFilled = Array.from(boxes).every(box => box.textContent.trim() !== '');
  if (allFilled) {
    gameActive = false;
    msg.textContent = "It's a Tie!";
    msgContainer.classList.remove('hide');
  }
}

// Add event listeners to each box
boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    // If the box is already filled or game is over, do nothing
    if (box.textContent.trim() !== '' || !gameActive) return;

    // Set the current player's symbol in the box
    box.textContent = currentPlayer;

    // Check for a win or tie
    checkGameStatus();

    // Toggle to the next player if the game is still active
    if (gameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

// Reset the game
function resetGame() {
  boxes.forEach(box => (box.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  msgContainer.classList.add('hide');
}

// Add event listeners for reset and new game buttons
resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);
