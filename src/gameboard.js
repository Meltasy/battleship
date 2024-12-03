import { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer } from './ship.js'

class Gameboard {
  constructor(player) {
    this.player = player
    this.board = this.createBoard()
    this.ships = [
      new Carrier('carrier'),
      new Battleship('battleship'),
      new Cruiser('cruiser'),
      new Submarine('submarine'),
      new Destroyer('destroyer')
    ]
  }
  createBoard(boardSize = 10) {
    let board = []
    for (let row = 0; row < boardSize; row++) {
      board.push([])
      for(let col = 0; col < boardSize; col++) {
        board[row].push('Empty')  
      }
    }
    return board
  }
  // Gameboards should be able to place ships at specific coordinates by calling the 'Ship' class
  placeShips(ship, row, col, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        if (!this.board[row][col]) {
          throw new Error('Error: This cell doesn\'t exist')
        } else if (this.board[row][col] instanceof Ship) {
          throw new Error('Error: There is already a ship here')
        }
        this.board[row][col] = ship
        col++
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        if (!this.board[row][col]) {
          throw new Error('Error: This cell doesn\'t exist')
        } else if (this.board[row][col] instanceof Ship) {
          throw new Error('Error: There is already a ship here')
        }
        this.board[row][col] = ship
        row++
      }
    }
  }
  getRandomShips() {
    for (let ship of this.ships) {
      this.placeRandomShip(ship)
    }
  }
  placeRandomShip(ship) {
    let row = Math.floor(Math.random() * 10)
    let col = Math.floor(Math.random() * 10)
    let direction = Math.round(Math.random()) ? 'horizontal' : 'vertical'
    if (direction === 'horizontal') {
      col + ship.length > 9 ? col = 9 - ship.length : col
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col] === 'Empty') {
        this.board[row][col] = ship
          col++
        } else {
          return this.placeRandomShip(ship)
        }
      }
    } else if (direction === 'vertical') {
      row + ship.length > 9 ? row = 9 - ship.length : row
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col] === 'Empty') {
          this.board[row][col] = ship
          row++
        } else {
          return this.placeRandomShip(ship)
        }
      }
    }
  }
  receiveAttack(row, col) {
    if (!this.board[row][col]) {
      throw new Error('Error: This cell doesn\'t exist')
    }
    if (this.board[row][col] === 'Hit' || this.board[row][col] === 'Miss') {
      throw new Error('Error: This cell\'s already been attacked')
    }
    if (this.board[row][col] === 'Empty') {
      this.board[row][col] = 'Miss'
    } else if (this.board[row][col] instanceof Ship) {
      this.board[row][col].hit()
      this.board[row][col].isSunk()
      this.board[row][col] = 'Hit'
      this.areAllShipsSunk()
    }
  }
  areAllShipsSunk(boardSize = 10) {
    for (let row = 0; row < boardSize; row++) {
      for(let col = 0; col < boardSize; col++) {
        if (this.board[row][col] instanceof Ship) {
          return false
        }
      }
    }
    return true
  }
}

export { Gameboard }
