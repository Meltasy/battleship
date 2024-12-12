import { Ship } from './ship.js'
import { GameControl } from './gameControl.js'

class GameDisplay {
  constructor() {
  }
  displayShips(player) {
    const shipDisplay = document.querySelector('#shipDisplay')
    const changeDirection = document.createElement('div')
    const toggle = document.createElement('div')
    changeDirection.setAttribute('id', 'changeDirection')
    toggle.setAttribute('class', 'toggle')
    let active = false
    changeDirection.addEventListener('click', () => {
      toggle.classList.toggle('active')
      active = !active
      for (let i = 0; i < player.gameboard.ships.length; i++) {
        let eachShip = player.gameboard.ships[i]
        const toggleDirection = document.querySelector('#' + eachShip.name)
        if (active) {
          toggleDirection.classList.add('shipVertical')
          eachShip.direction = 'vertical'
        } else {
          toggleDirection.classList.remove('shipVertical')
          eachShip.direction = 'horizontal'
        }
        this.updatePlayerDisplay(player)
      }
    })
    changeDirection.appendChild(toggle)
    shipDisplay.appendChild(changeDirection)
    // Draggable ships - the ships in the ship display
    for (let i = 0; i < player.gameboard.ships.length; i++) {
      let ship = document.createElement('div')
      let name = player.gameboard.ships[i].name
      ship.setAttribute('class', 'ship')
      ship.setAttribute('id', name)
      ship.draggable = 'true'
      ship.addEventListener('dragstart', (e) => {
        ship.classList.add('dragging')
        e.dataTransfer.clearData()
        e.dataTransfer.setData('text/plain', e.target.id)
      })
      ship.addEventListener('dragend', () => {
        ship.classList.remove('dragging')
        const shipsArray = [...document.querySelectorAll('.ship')]
        const shipsPlaced = shipsArray.every((item) => {
          return item.style.display === 'none'
        })
        if (shipsPlaced === true) {
          while (shipDisplay.lastChild) {
            shipDisplay.removeChild(shipDisplay.lastChild)
          }
        }
      })
      for (let j = 0; j < player.gameboard.ships[i].length; j++) {
        let shipBody = document.createElement('div')
        let icon = document.createElement('box-icon')
        shipBody.setAttribute('class', 'shipBody')
        icon.setAttribute('name', 'ship')
        icon.setAttribute('type', 'solid')
        shipBody.appendChild(icon)
        ship.appendChild(shipBody)
      }
      shipDisplay.appendChild(ship)
    }
  }
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
    this.updatePlayerDisplay(player, enemy)
    this.updateEnemyDisplay(player, enemy)
  }
  updatePlayerDisplay(player, enemy) {
    const playerBoard = document.querySelector('#playerBoard')
    while (playerBoard.lastChild) {
      playerBoard.removeChild(playerBoard.lastChild)
    }
    const playerCurrentBoard = player.gameboard
    this.renderBoard(playerBoard, playerCurrentBoard, player.isEnemy)

    // Draggable containers - the cells in the player gameboard
    const playerCells = playerBoard.querySelectorAll('.cell')
    playerCells.forEach(cell => {
      cell.addEventListener('dragover', (e) => {
        e.preventDefault()
      })
      cell.addEventListener('drop', (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData('text')
        const source = document.querySelector('#' + data)
        let currentShip = document.querySelector('.dragging')
        let ship
        for (let item of player.gameboard.ships) {
          if (item.name === data) {
            ship = item
          }
        }
        let direction = ship.direction
        let row = cell.dataset.row
        let col = cell.dataset.col
        if (player.gameboard.placeShips(player, ship, row, col, direction) === false) {
          const shipDisplay = document.querySelector('#shipDisplay')
          shipDisplay.appendChild(currentShip)
        } else {
          player.gameboard.placeShips(player, ship, row, col, direction)
        }
        this.updatePlayerDisplay(player, enemy)
        currentShip.style.display = 'none'
      })
    })
  }
  updateEnemyDisplay(player, enemy) {
    const enemyBoard = document.querySelector('#enemyBoard')
    while (enemyBoard.lastChild) {
      enemyBoard.removeChild(enemyBoard.lastChild)
    }
    const enemyCurrentBoard = enemy.gameboard
    this.renderBoard(enemyBoard, enemyCurrentBoard, enemy.isEnemy = 'yes')

    const enemyCells = enemyBoard.querySelectorAll('.cell')
    enemyCells.forEach(cell => {
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
