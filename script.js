let board = [];
let mines = [];
let revealed = [];

function createBoard(rows, cols, numMines) {
  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      board[r][c] = { value: "", revealed: false };
    }
  }
  for (let i = 0; i < numMines; i++) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    board[r][c].value = "*";
    mines.push([r, c]);
  }
}

function printBoard() {
  let boardHTML = "";
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      let cell = board[r][c];
      let className = "cell";
      if (cell.revealed) {
        className += " revealed";
      }
      if (cell.value === "*") {
        className += " mine";
      } else if (countAdjacentMines(r, c) > 0) {
        className += " adjacent-mine";
      }
      boardHTML += `<div class="${className}" onclick="revealCell(${r}, ${c})">${cell.value}</div>`;
    }
    boardHTML += "<br>";
  }
  document.getElementById("board").innerHTML = boardHTML;
}

function countAdjacentMines(r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      let nr = r + dr;
      let nc = c + dc;
      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[nr].length && board[nr][nc].value === "*") {
        count++;
      }
    }
  }
  return count;
}

function revealCell(r, c) {
  if (board[r][c].value === "*") {
    alert("Game over! You stepped on a mine.");
    return;
  }
  board[r][c].revealed = true;
  revealed.push([r, c]);
  if (countAdjacentMines(r, c) === 0) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        let nr = r + dr;
        let nc = c + dc;
        if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[nr].length &&!board[nr][nc].revealed) {
          revealCell(nr, nc);
        }
      }
    }
  }
  printBoard();
}

createBoard(10, 10, 10);
printBoard();
