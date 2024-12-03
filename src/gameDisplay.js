import { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer } from './ship.js'
import { Gameboard } from './gameboard.js'
import { Player } from './player.js'

// Move the below into gameControl with eventListeners to buttons

let player = new Player('Loulou')
// let player = new Player('Nutty')
let enemy = new Player('Computer')

// let game = player.gameboard

// let ship1 = new Destroyer('destroyer')
// game.placeShips(ship1, 9, 0, 'horizontal')
// let ship2 = new Battleship('battleship')
// game.placeShips(ship2, 3, 5, 'vertical')
// let ship3 = new Submarine('submarine')
// game.placeShips(ship3, 2, 7, 'vertical')
// let ship4 = new Cruiser('cruiser')
// game.placeShips(ship4, 6, 1, 'horizontal')
// let ship5 = new Carrier('carrier')
// game.placeShips(ship5, 6, 1, 'horizontal')

let playerGame = player.gameboard
playerGame.getRandomShips()

let enemyGame = enemy.gameboard
enemyGame.getRandomShips()

// enemyGame.receiveAttack(3, 5)
// playerGame.receiveAttack(9, 7)
// enemyGame.receiveAttack(2, 1)
// playerGame.receiveAttack(0, 5)
// enemyGame.receiveAttack(4, 2)
// playerGame.receiveAttack(6, 8)
// enemyGame.receiveAttack(6, 3)

// Up to here

// function displayGameboard(player, enemy) {
  function displayGameboard() {
  const gameDisplay = document.querySelector('#gameDisplay')
  const playerGame = document.createElement('div')
  const playerHead = document.createElement('h2')
  playerHead.textContent = 'Player\'s Board'
  playerGame.appendChild(playerHead)
  gameDisplay.appendChild(playerGame)

  const enemyGame = document.createElement('div')
  const enemyHead = document.createElement('h2')
  enemyHead.textContent = 'Enemy\'s Board'
  enemyGame.appendChild(enemyHead)
  gameDisplay.appendChild(enemyGame)

  const playerBoard = document.createElement('div')
  // player.gameboard relies on creating a new Player in this module
  const playerCurrentBoard = player.gameboard
  renderBoard(playerBoard, playerCurrentBoard, player.isEnemy)
  gameDisplay.appendChild(playerBoard)

  const enemyBoard = document.createElement('div')
  // enemy.gameboard relies on creating a new Player in this module
  const enemyCurrentBoard = enemy.gameboard
  renderBoard(enemyBoard, enemyCurrentBoard, player.isEnemy = true)
  gameDisplay.appendChild(enemyBoard)
}

function renderBoard(emptyBoard, currentBoard, isEnemy) {
  emptyBoard.setAttribute('class', 'gameBoard')
  for (let i = 0; i < currentBoard.board.length; i++) {
    for (let j = 0; j < currentBoard.board.length; j++) {
      let cell = document.createElement('div')
      cell.setAttribute('class', 'cell')
      let icon = document.createElement('box-icon')
      if (currentBoard.board[i][j] === 'Empty') {
        icon.setAttribute('name', 'water')
      } else if (currentBoard.board[i][j] === 'Miss') {
        icon.setAttribute('name', 'x-circle')
        icon.setAttribute('type', 'solid')
      } else if (currentBoard.board[i][j] === 'Hit') {
        icon.setAttribute('name', 'hot')
        icon.setAttribute('type', 'solid')
      } else if (currentBoard.board[i][j] instanceof Ship) {
        if (isEnemy === false) {
          icon.setAttribute('name', 'ship')
          icon.setAttribute('type', 'solid')
        } else {
          icon.setAttribute('name', 'water')
        }
      }
      cell.appendChild(icon)
      emptyBoard.appendChild(cell)
    }
  }
}

export { displayGameboard }
