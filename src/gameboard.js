import { Ship } from './ship.js'

class Gameboard {
  constructor() {
    this.board = []
    // this.ships = [
    //     new Ship('carrier', 5),
    //     new Ship('battleship', 4),
    //     new Ship('cruiser', 3),
    //     new Ship('submarine', 3),
    //     new Ship('destroyer', 2)
    // ]
    this.shipSizes = {
        carrier: 5,
        battleship: 4,
        cruiser: 3,
        submarine: 3,
        destroyer: 2
    }
  }
  createBoard(boardSize = 10) {
    for (let row = 0; row < boardSize; row++) {
      this.board.push([])
      for(let col = 0; col < boardSize; col++) {
        this.board[row].push(0)  
      }
    }
  }
  placeShips(ship, row, col, direction) {
    const size = this.shipSizes[ship]
    if (!size) {
        throw new Error('This ship doesn\'t exist')
    }
    if (direction === 'horizontal') {
      for (let i = 0; i < size; i++) {
        this.board[row][col] = ship
        col++
      }
    }
    if (direction === 'vertical') {
      for (let i = 0; i < size; i++) {
        this.board[row][col] = ship
        row++      }
    }
  }
//   receiveAttack() {

//   }
}

export { Gameboard }
