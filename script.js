const animals = ["🦦", "🐀", "🐈", "🐸"];

const slotMachineGrid = document.getElementById("slot-machine-grid");
const numRows = 3;
const numCols = 3;

let playerBalance = 1000;

const spinButton = document.getElementById("spin-button");
spinButton.addEventListener("click", spinSlotMachine);

function spinSlotMachine() {
  const betAmount = parseInt(document.getElementById("bet-amount").value);
  if (betAmount > playerBalance) {
    alert("You don't have enough balance to place this bet!");
    return;
  }
  playerBalance -= betAmount;

  // Add 'spin' class to each column container
  const columnContainers = document.querySelectorAll('.column-container');
  columnContainers.forEach(container => container.classList.add('spin'));

  // Delay for a short time to allow the columns to spin
  setTimeout(() => {
    const emojis = Array.from({ length: numRows * numCols }, () => {
      const randomIndex = Math.floor(Math.random() * animals.length);
      return animals[randomIndex];
    });

    slotMachineGrid.innerHTML = "";
    
          for (let i = 0; i < numRows; i++) {
          const rowEmojis = emojis.slice(i * numCols, (i + 1) * numCols);
          const row = createRow(rowEmojis);
          slotMachineGrid.appendChild(row);
          }
    
    const winningCombination = checkWinningCombinations(emojis);
    const winningAmount = getWinningAmount(winningCombination, betAmount);
    playerBalance += 2 * winningAmount;
    displayResult(winningCombination, winningAmount);

    // Remove 'spin' class from each column container after a short delay
    setTimeout(() => {
      columnContainers.forEach(container => container.classList.remove('spin'));
    }, 100);
  }, 500); 
}



function createRow(emojis) {
  const row = document.createElement("div");
  row.classList.add("row");
  emojis.forEach((emoji) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = emoji;
    row.appendChild(cell);
  });
  return row;
}
function spin() {
  // Add 'spin' class to each column container
  const columnContainers = document.querySelectorAll('.column-container');
  columnContainers.forEach(container => container.classList.add('spin'));

  // Generate random matrix
  const matrix = generateRandomMatrix();

  // Update cells with new values
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    const [row, column] = getRowColumn(index);
    cell.innerText = matrix[row][column];
  });

  // Remove 'spin' class from each column container after a short delay
  setTimeout(() => {
    columnContainers.forEach(container => container.classList.remove('spin'));
  }, 1000);
}



function checkWinningCombinations(emojis) {
  const combinations = [
    emojis.slice(0, 3), // row 1
    emojis.slice(3, 6), // row 2
    emojis.slice(6, 9), // row 3
    [emojis[0], emojis[3], emojis[6]], // column 1
    [emojis[1], emojis[4], emojis[7]], // column 2
    [emojis[2], emojis[5], emojis[8]], // column 3
    [emojis[0], emojis[4], emojis[8]], // diagonal 1
    [emojis[2], emojis[4], emojis[6]], // diagonal 2
  ];
  const winningCombination = combinations.find((combination) =>
    checkMatchingEmojis(combination)
  );
  return winningCombination;
}

function checkMatchingEmojis(emojis) {
  return emojis.every((emoji) => emoji === emojis[0]);
}

function getWinningAmount(winningCombination, betAmount) {
  if (winningCombination) {
    return betAmount; // adjust this based on your desired payout ratio
  } else {
    return 0;
  }
}

function displayResult(winningCombination, winningAmount) {
  const balanceDisplay = document.getElementById("balance-display");
  balanceDisplay.textContent = `Balance: $${playerBalance}`;

  const resultDisplay = document.getElementById("result-display");
  if (winningCombination) {
    const winningCombinationString = winningCombination.join(" ");
    resultDisplay.textContent = `You won $${winningAmount} with ${winningCombinationString}!`;
  } else {
    resultDisplay.textContent = "Sorry, you didn't win anything.";
  }
}


