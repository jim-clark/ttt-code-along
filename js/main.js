/*----- constants -----*/
const COLOR_LOOKUP = {
  '1': 'purple',
  '-1': 'orange',
  null: 'white'
};

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getGameStatus() {
  for (let arr of WINNING_COMBOS) {
    if (Math.abs(board[arr[0]] + board[arr[1]] + board[arr[2]]) === 3) return turn;
  }
  if (!board.includes(null)) return 'T';
  return null;
}

/*----- app's state (variables) -----*/
// Array of 9 elements...
// null -> sq avail; 1 or -1 for the players
let board;
let turn;  // 1 or -1
let gameStatus; // null -> game in play; 1/-1 player win; 'T' -> tie

/*----- cached element references -----*/
const squareEls = [...document.querySelectorAll('#board > div')];
const msgEl = document.querySelector('h1');
const replayBtn = document.querySelector('button');

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleMove);
replayBtn.addEventListener('click', init);

/*----- functions -----*/
init();

function init() {
  // board = new Array(9).fill(null);
  board = [
    null, null, null,
    null, null, null,
    null, null, null,
  ];
  turn = 1;
  gameStatus = null;
  render();
}

// In response to user interaction (e.g., click)
// We update ALL impacted state,
// then lastly, call render
function handleMove(evt) {
  // Guards
  if (
    gameStatus ||
    !squareEls.includes(evt.target)
  ) return;
  const idx = squareEls.indexOf(evt.target);
  board[idx] = turn;
  gameStatus = getGameStatus();
  turn *= -1;
  render();
}

// Render's job is to transfer/visualize
// all state to the DOM
function render() {
  squareEls.forEach(function(squareEl, idx) {
    squareEl.style.backgroundColor = COLOR_LOOKUP[board[idx]];
  });
  renderMessage();
  replayBtn.style.visibility = gameStatus ? 'visible' : 'hidden';
}

function renderMessage() {
  if (gameStatus === null) {
    msgEl.innerHTML = `Player <span style="color: ${COLOR_LOOKUP[turn]}">${COLOR_LOOKUP[turn].toUpperCase()}</span>'s Turn`;
  } else if (gameStatus === 'T') {
    // Tie game
    msgEl.textContent = 'Another Tie Game :(';
  } else {
    // Player has won!
    msgEl.innerHTML = `Player <span style="color: ${COLOR_LOOKUP[gameStatus]}">${COLOR_LOOKUP[gameStatus].toUpperCase()}</span>'s Wins!`;
  }
}