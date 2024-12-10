import { Ship } from './ship.js'
import { GameControl } from './gameControl.js'

class GameDisplay {
  constructor() {
  }
  // displayShips(player) {
  //   const playerBoard = document.querySelector('#playerBoard')
  //   const shipDisplay = document.querySelector('#shipDisplay')
  //   for (let i = 0; i < player.gameboard.ships.length; i++) {
  //     let shipBody = document.createElement('div')
  //     shipBody.setAttribute('class', 'shipBody')
  //     shipBody.dataset.shipObject = player.gameboard.ships[i]
  //   }
  // }
  displayBoard(player, enemy) {
    const playerDisplay = document.querySelector('#playerDisplay')
    const enemyDisplay = document.querySelector('#enemyDisplay')
    // Check if I need this while loop and why?
    while (playerDisplay.lastChild && enemyDisplay.lastChild) {
      playerDisplay.removeChild(playerDisplay.lastChild)
      enemyDisplay.removeChild(enemyDisplay.lastChild)
    }
    
    const playerHead = document.createElement('h2')
    playerHead.textContent = `${player.name}\'s Board`
    playerDisplay.appendChild(playerHead)
    const enemyHead = document.createElement('h2')
    enemyHead.textContent = `${enemy.name}\'s Board`
    enemyDisplay.appendChild(enemyHead)
    
    const playerBoard = document.createElement('div')
    playerBoard.setAttribute('id', 'playerBoard')
    playerDisplay.appendChild(playerBoard)
    const enemyBoard = document.createElement('div')
    enemyBoard.setAttribute('id', 'enemyBoard')
    enemyDisplay.appendChild(enemyBoard)
    this.updateDisplay(player, enemy)
  }
  updateDisplay(player, enemy) {
    const playerBoard = document.querySelector('#playerBoard')
    const enemyBoard = document.querySelector('#enemyBoard')
    while (playerBoard.lastChild && enemyBoard.lastChild) {
      playerBoard.removeChild(playerBoard.lastChild)
      enemyBoard.removeChild(enemyBoard.lastChild)
    }
    const playerCurrentBoard = player.gameboard
    this.renderBoard(playerBoard, playerCurrentBoard, player.isEnemy)
    const enemyCurrentBoard = enemy.gameboard
    this.renderBoard(enemyBoard, enemyCurrentBoard, enemy.isEnemy = 'yes')
    
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        let row = cell.dataset.row
        let col = cell.dataset.col
        let control = new GameControl
        control.playRound(player, enemy, row, col)
      })
    })
  }
  renderBoard(board, currentBoard, isEnemy) {
    board.setAttribute('class', 'gameBoard')
    for (let i = 0; i < currentBoard.board.length; i++) {
      for (let j = 0; j < currentBoard.board.length; j++) {
        let cell = document.createElement('div')
        cell.setAttribute('class', 'cell')
        cell.dataset.row = i
        cell.dataset.col = j
        let icon = document.createElement('box-icon')
        if (currentBoard.board[i][j] === 'Empty') {
          icon.setAttribute('name', 'water')
        } else if (currentBoard.board[i][j] === 'Miss') {
          icon.setAttribute('name', 'x-circle')
          icon.setAttribute('type', 'solid')
        } else if (currentBoard.board[i][j] === 'Hit') {
          icon.setAttribute('name', 'hot')
          icon.setAttribute('type', 'solid')
        } else if (currentBoard.board[i][j] === 'Sunk') {
          icon.setAttribute('name', 'skull')
          icon.setAttribute('type', 'solid')
        } else if (currentBoard.board[i][j] instanceof Ship) {
          if (isEnemy === 'no') {
            icon.setAttribute('name', 'ship')
            icon.setAttribute('type', 'solid')
          } else {
            icon.setAttribute('name', 'water')
          }
        }
        cell.appendChild(icon)
        board.appendChild(cell)
      }
    }
  }
  displayWinner(winner) {
    const showWinner = document.querySelector('#showWinner')
    const winnerName = document.querySelector('#winnerName')
    showWinner.showModal()
    winnerName.textContent = `${winner.name} is the winner!`
    window.addEventListener('click', (e) => {
      if (e.target == showWinner) {
        showWinner.close()
      }
    }) 
  }
}

export { GameDisplay }
