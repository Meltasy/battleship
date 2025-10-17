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
    const horizontalArrow = document.createElement('i')
    horizontalArrow.setAttribute('class', 'bx bxs-arrow-big-right')
    const verticalArrow = document.createElement('i')
    verticalArrow.setAttribute('class', 'bx bxs-arrow-big-down')
    const undoBtn = document.createElement('button')
    undoBtn.setAttribute('id', 'undoBtn')
    undoBtn.textContent = 'Undo'
    if (player.gameboard.ships[0].direction === 'vertical') {
      player.gameboard.ships.forEach((item) => {
        item.direction = 'horizontal'
      })
      directionToggle.classList.remove('active')
      shipDisplay.classList.remove('vertical')
      buttons.classList.remove('vertical')
    }
    let active = false
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
    directionBtn.appendChild(horizontalArrow)
    directionBtn.appendChild(verticalArrow)
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
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', e.target.id)
      })
      ship.addEventListener('dragend', (e) => {
        ship.classList.remove('dragging')
        this.clearHighlights()
        setTimeout(() => {
          this.shipsReady(player, shipDisplay, directionToggle, buttons)
        }, 10)
      })
      for (let j = 0; j < player.gameboard.ships[i].length; j++) {
        let shipBody = document.createElement('div')
        let icon = document.createElement('i')
        shipBody.setAttribute('class', 'bx bxs-ship shipIcon')
        shipBody.setAttribute('id', name + j)
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
  shipsReady(player, shipDisplay, directionToggle, buttons) {
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
      directionToggle.classList.remove('active')
      shipDisplay.classList.remove('vertical')
      buttons.classList.remove('vertical')
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
        e.dataTransfer.dropEffect = 'move'
      })
      cell.addEventListener('dragenter', (e) => {
        e.preventDefault()
        const draggingShip = document.querySelector('.dragging')
        const shipId = draggingShip ? draggingShip.id : null
        if (shipId) {
          this.highlightShipPlacement(player, cell, shipId)
        }
      })
      cell.addEventListener('dragleave', (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          this.clearHighlights()
        }
      })
      cell.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.clearHighlights()
        const data = e.dataTransfer.getData('text/plain')
        if (data) {
          this.placeShipCell(player, cell, data)
          this.updatePlayerDisplay(player, enemy)
        }
      })
    })
  }
  highlightShipPlacement(player, startCell, shipId) {
    this.clearHighlights()
    let ship = player.gameboard.ships.find(ship => ship.name === shipId)
    if (!ship) return
    const startRow = parseInt(startCell.dataset.row)
    const startCol = parseInt(startCell.dataset.col)
    const boardSize = player.gameboard.board.length
    const cellsToHighlight = []
    let placementValid = true
    for (let i = 0; i < ship.length; i++) {
      let row = startRow
      let col = startCol
      if (ship.direction === 'horizontal') {
        col = startCol + i
      } else {
        row = startRow + i
      }
      if (row >= boardSize || col >= boardSize || row < 0 || col < 0) {
        placementValid = false
        break
      }
      const cellContent = player.gameboard.board[row][col]
      if (cellContent !== 'Empty' && cellContent instanceof Ship && cellContent.name !== shipId) {
        placementValid = false
      }
      cellsToHighlight.push({ row, col })
    }
    cellsToHighlight.forEach(({ row, col }) => {
      const cell = document.querySelector(`#playerBoard .cell[data-row="${row}"][data-col="${col}"]`)
      if (cell) {
        if (placementValid) {
          cell.classList.add('dragOver')
        } else {
          cell.classList.add('dragInvalid')
        }
      }
    })
    return placementValid
  }
  clearHighlights() {
    document.querySelectorAll('.dragOver').forEach(cell => {
      cell.classList.remove('dragOver')
    })
    document.querySelectorAll('.dragInvalid').forEach(cell => {
      cell.classList.remove('dragInvalid')
    })
  }
  placeShipCell(player, cell, data) {
    const currentShip = document.querySelector('.dragging')
    const shipDisplay = document.querySelector('#shipDisplay')
    if (!currentShip || !data) return
    let ship
    for (let item of player.gameboard.ships) {
      if (item.name === data) {
        ship = item
        break
      }
    }
    if (!ship) return
    let direction = ship.direction
    let row = parseInt(cell.dataset.row)
    let col = parseInt(cell.dataset.col)
    const placeSuccess = player.gameboard.placeShips(player, ship, row, col, direction)
    if (placeSuccess === false) {
      currentShip.style.display = 'flex'
      shipDisplay.appendChild(currentShip)
    } else {
      currentShip.style.display = 'none'
    }
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
        let icon = document.createElement('i')
        if (currentBoard.board[i][j] === 'Empty') {
          icon.setAttribute('class', 'bx bx-water')
        } else if (currentBoard.board[i][j] === 'Miss') {
          icon.setAttribute('class', 'bx bxs-x-circle')
        } else if (currentBoard.board[i][j] === 'Hit') {
          icon.setAttribute('class', 'bx bxs-hot')
        } else if (currentBoard.board[i][j] === 'Sunk') {
          icon.setAttribute('class', 'bx bxs-ghost')
        } else if (currentBoard.board[i][j] instanceof Ship) {
          if (isEnemy === 'no') {
            icon.setAttribute('class', 'bx bxs-ship')
          } else {
          icon.setAttribute('class', 'bx bx-water')
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
