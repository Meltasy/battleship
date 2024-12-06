import { Ship } from './ship.js'
import { GameControl } from './gameControl.js'

class GameDisplay {
  constructor() {
  }
  // makePlayerDialog() {
  //   // Where's the form?
  //   const playerDialog = document.createElement('dialog')
  //   const playerLabel = document.createElement('label')
  //   const playerLabelText = document.createTextNode('Who wants to play?')
  //   playerLabel.setAttribute('for', 'playerName')
  //   playerLabel.appendChild(playerLabelText)
  //   playerDialog.appendChild(playerLabel)

  //   const playerInput = document.createElement('input')
  //   playerInput.setAttribute('type', 'text')
  //   playerInput.setAttribute('id', 'playerName')
  //   playerInput.setAttribute('name', 'playerName')
  //   playerInput.setAttribute('required', '')
  //   playerInput.required = true
  //   playerDialog.appendChild(playerInput)

  //   const closeBtns = document.createElement('div')
  //   const saveBtn = document.createElement('button')
  //   saveBtn.setAttribute('type', 'submit')
  //   saveBtn.setAttribute('id', 'saveBtn')
  //   saveBtn.textContent = 'Save'
  //   closeBtns.appendChild(saveBtn)

  //   const cancelBtn = document.createElement('button')
  //   cancelBtn.setAttribute('type', 'button')
  //   cancelBtn.setAttribute('id', 'cancelBtn')
  //   closeBtns.appendChild(cancelBtn)
  //   playerDialog.append(closeBtns)

  //   document.body.appendChild(playerDialog)
  //   // playerDialog.showModal()
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
    // Is there a way to disable the gameboard eventListeners ? element.replaceWith(element.cloneNode(true))
    // cell.addEventListener('click', () => {
    //   control.playerTurn(player, enemy, row, col)
    // })
    // cell.removeEventListener('click', () => {
    //   control.enemyTurn(player, enemy)
    // })
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
  // Modal not showing
  endGameModal(winner) {
    const winnerModal = document.createElement('div')
    winnerModal.setAttribute('id', 'winnerModal')
    const contentModal = document.createElement('div')
    contentModal.setAttribute('class', 'contentModal')
    const headModal = document.createElement('h2')
    headModal.textContent = `${winner.name} is the winner!`
    const closeModal = document.createElement('span')
    closeModal.setAttribute('class', 'closeModal')
    const icon = document.createElement('box-icon')
    icon.setAttribute('name', 'x')
    contentModal.appendChild(headModal)
    contentModal.appendChild(closeModal)
    winnerModal.appendChild(contentModal)
    document.body.appendChild(winnerModal)
  }
}

export { GameDisplay }
