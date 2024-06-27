const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];

let x = Math.random();
if (x < 0.5) {
  current = players[0];
}
else {
  current = players[1];
}

// Winning combinations
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

// Add event listeners to each cell
for (let cell of cells) {
  cell.addEventListener("click", handleCellClick);
}

function handleCellClick(event) {
  const cell = event.target;

  // If the cell is already marked, do nothing
  if (cell.textContent !== "") {
    return;
  }

  // Mark the cell with the current player's symbol (X/O)
  cell.textContent = current;

  // Checking for win or tie
  if (checkWin(current)) {
    msg.textContent = `${current} wins!`;

    endGame();
    //alert(`${current} wins!`);
    return;
  }

  if (checkTie()) {
    msg.textContent = "It's a tie!";

    endGame();
    //  alert("It's a tie!");
    return;
  }

  // Switch turns
  current = current === "X" ? "O" : "X";

  // Update the message
  msg.textContent = `${current}'s turn!`;

}

function checkWin(current) {
  // Check Winning conditions
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === current;
    });
  });
}

function checkTie() {
  // Check Tie conditions
  return [...cells].every(cell => cell.textContent !== "");
}

function endGame() {
  // Remove event listeners to end the game
  for (let cell of cells) {
    cell.removeEventListener("click", handleCellClick);
  }
}

function restart() {
  // Restart Game Functionality
  for (let cell of cells) {
    cell.textContent = "";
    cell.addEventListener("click", handleCellClick);
  }
  let x = Math.random();
  if (x < 0.5) {
    current = players[0];
  }
  else {
    current = players[1];
  }
  msg.textContent = `${current}'s turn!`;
}

document.getElementById("restartButton").addEventListener("click", restart);


