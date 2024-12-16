import { Ship } from './ship.js'
import { GameControl } from './gameControl.js'

class GameDisplay {
  constructor() {
  }
  toggleDisplays(shipDisplay) {
    const enemyDisplay = document.querySelector('#enemyDisplay')
    if (shipDisplay.style.display === 'none') {
      enemyDisplay.style.display = 'grid'
    } else {
      enemyDisplay.style.display = 'none'
    }
  }
  displayShips(player) {
    const shipDisplay = document.querySelector('#shipDisplay')
    while (shipDisplay.lastChild) {
      shipDisplay.removeChild(shipDisplay.lastChild)
    }
    shipDisplay.style.display = 'grid'
    this.toggleDisplays(shipDisplay)
    const buttons = document.createElement('div')
    buttons.setAttribute('class', 'buttons')
    const directionBtn = document.createElement('div')
    directionBtn.setAttribute('id', 'directionBtn')
    const directionToggle = document.createElement('div')
    directionToggle.setAttribute('class', 'directionToggle')
    const undoBtn = document.createElement('button')
    undoBtn.setAttribute('id', 'undoBtn')
    undoBtn.textContent = 'Undo'
    let active = false
    if (directionToggle.classList.contains('active')) {
      directionToggle.classList.remove('active')
    }
    if (shipDisplay.classList.contains('vertical')) {
      shipDisplay.classList.remove('vertical')
    }
    if (buttons.classList.contains('vertical')) {
      buttons.classList.remove('vertical')
    }
    directionBtn.addEventListener('click', () => {
      active = !active
      this.changeShipDirection(player, active, directionToggle, shipDisplay, buttons)
    })
    undoBtn.addEventListener('click', () => {
      let lastShip = player.shipsArray.slice(-1)[0]
      let shipDiv = document.querySelector('#' + lastShip[0].name)
      shipDisplay.appendChild(shipDiv)
      shipDiv.style.display = 'flex'
      this.undoShipPlace(player, lastShip)
      this.updatePlayerDisplay(player)
    })
    directionBtn.appendChild(directionToggle)
    buttons.appendChild(directionBtn)
    buttons.appendChild(undoBtn)
    shipDisplay.appendChild(buttons)
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
        this.shipsReady(player, shipDisplay)
      })
      for (let j = 0; j < player.gameboard.ships[i].length; j++) {
        let shipBody = document.createElement('div')
        let icon = document.createElement('box-icon')
        shipBody.setAttribute('class', 'shipBody')
        shipBody.setAttribute('id', name + j)
        icon.setAttribute('name', 'ship')
        icon.setAttribute('type', 'solid')
        shipBody.appendChild(icon)
        ship.appendChild(shipBody)
      }
      shipDisplay.appendChild(ship)
    }
  }
  changeShipDirection(player, active, directionToggle, shipDisplay, buttons) {
    for (let i = 0; i < player.gameboard.ships.length; i++) {
      const shipDiv = document.querySelector('#' + player.gameboard.ships[i].name)
      shipDiv.classList.toggle('shipVertical')
      if (active) {
        directionToggle.classList.add('active')
        shipDisplay.classList.add('vertical')
        buttons.classList.add('vertical')
        player.gameboard.ships[i].direction = 'vertical'
      } else {
        directionToggle.classList.remove('active')
        shipDisplay.classList.remove('vertical')
        buttons.classList.remove('vertical')
        player.gameboard.ships[i].direction = 'horizontal'
      }
      this.updatePlayerDisplay(player)
    }
  }
  undoShipPlace(player, lastShip) {
    let row
    let col
    for (let i = 0; i < player.shipsArray.length; i++) {
      if (player.shipsArray[i][0].name === lastShip[0].name) {
        row = player.shipsArray[i][1]
        col = player.shipsArray[i][2]
        player.shipsArray.splice(i, 1)
        player.gameboard.board[row][col] = 'Empty'
        i--
      }
    }
  }
  shipsReady(player, shipDisplay) {
    const results = document.querySelector('#results')
    const shipsPlacedArray = [...document.querySelectorAll('.ship')]
    const shipsPlaced = shipsPlacedArray.every((item) => {
      return item.style.display === 'none'
    })
    if (shipsPlaced === true) {
      while (shipDisplay.lastChild) {
        shipDisplay.removeChild(shipDisplay.lastChild)
      }
      shipDisplay.style.display = 'none'
      this.toggleDisplays(shipDisplay)
      results.textContent = `Let's start the battle, ${player.name}!`
    }
  }
  displayBoard(player, enemy) {
    const playerDisplay = document.querySelector('#playerDisplay')
    const enemyDisplay = document.querySelector('#enemyDisplay')
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
    const playerCells = playerBoard.querySelectorAll('.cell')
    playerCells.forEach(cell => {
      cell.addEventListener('dragover', (e) => {
        e.preventDefault()
      })
      cell.addEventListener('drop', (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData('text')
        this.placeShipCell(player, cell, data)
        this.updatePlayerDisplay(player, enemy)
      })
    })
  }
  placeShipCell(player, cell, data) {
    const currentShip = document.querySelector('.dragging')
    const shipDisplay = document.querySelector('#shipDisplay')
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
      shipDisplay.appendChild(currentShip)
    } else {
      player.gameboard.placeShips(player, ship, row, col, direction)
    }
    currentShip.style.display = 'none'
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
