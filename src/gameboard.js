import { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer } from './ship.js'

class Cell {
  constructor(row, col) {
    this.row = row
    this.col = col
  }
}

class Gameboard {
  constructor(player) {
    this.player = player
    this.board = this.createBoard()
    // Do we need somewhere to place all the existing ships for each board?
    // this.ships = [
    //   new Carrier('carrier'),
    //   new Battleship('battleship'),
    //   new Cruiser('cruiser'),
    //   new Submarine('submarine'),
    //   new Destroyer('destroyer')
    // ]
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
        }
        this.board[row][col] = ship
        col++
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        if (!this.board[row][col]) {
          throw new Error('Error: This cell doesn\'t exist')
        }
        this.board[row][col] = ship
        row++
      }
    }
  }
  receiveAttack(row, col) {
    if (!this.board[row][col]) {
      throw new Error('Error: This cell doesn\'t exist')
    }
    if (this.board[row][col] === 'Hit' || this.board[row][col] === 'Miss') {
      throw new Error('Error: This cell already attacked')
    }
    if (this.board[row][col] === 'Empty') {
      this.board[row][col] = 'Miss'
    } else if (this.board[row][col] instanceof Ship) {
      this.board[row][col].hit()
      this.board[row][col].isSunk()
      this.board[row][col] = 'Hit'
    }
  }
}

export { Cell, Gameboard }
