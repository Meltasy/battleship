import { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer } from './ship.js'

class Gameboard {
  constructor(player) {
    this.player = player
    this.board = this.createBoard()
    this.ships = [
      new Carrier('Carrier'),
      new Battleship('Battleship'),
      new Cruiser('Cruiser'),
      new Submarine('Submarine'),
      new Destroyer('Destroyer')
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
  getRandomShips(player) {
    player.shipsArray = []
    for (let ship of this.ships) {
      this.placeRandomShip(player, ship)
    }
  }
  placeRandomShip(player, ship) {
    let row = Math.floor(Math.random() * 10)
    let col = Math.floor(Math.random() * 10)
    let direction = Math.round(Math.random()) ? 'horizontal' : 'vertical'
    if (direction === 'horizontal') {
      col + ship.length > 9 ? col = 9 - ship.length : col
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col] !== 'Empty') {
          return this.placeRandomShip(player, ship)
        }
        col++
      }
      col = col - ship.length
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col] = ship
        player.shipsArray.push([ship, row, col])
        col++
      }
    } else if (direction === 'vertical') {
      row + ship.length > 9 ? row = 9 - ship.length : row
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col] !== 'Empty') {
          return this.placeRandomShip(player, ship)
        }
        row++
      }
      row = row - ship.length
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col] = ship
        player.shipsArray.push([ship, row, col])
        row++
      }
    }
  }
  receiveAttack(player, row, col) {
    if (!this.board[row][col]) {
      throw new Error('Error: This cell doesn\'t exist')
    }
    if (this.board[row][col] === 'Hit' || this.board[row][col] === 'Miss') {
      if (this.player.isEnemy === 'no') {
        throw new Error('Error: This cell\'s already been attacked')
      } else {
        this.computerAttack(player, row, col)
      }
    }
    if (this.board[row][col] === 'Empty') {
      this.board[row][col] = 'Miss'
    } else if (this.board[row][col] instanceof Ship) {
      this.board[row][col].hit()
      this.board[row][col] = 'Hit'
      this.ships.forEach((item) => {
        if (item.isSunk() === true) {
          let ship = item.name
          for (let i = 0; i < player.shipsArray.length; i++) {
            if (ship == player.shipsArray[i][0].name) {
              row = player.shipsArray[i][1]
              col = player.shipsArray[i][2]
              this.board[row][col] = 'Sunk'
            }
          }
        }
      })
      this.areAllShipsSunk()
    }
  }
  computerAttack(player) {
    let row = Math.floor(Math.random() * 10)
    let col = Math.floor(Math.random() * 10)
    this.receiveAttack(player, row, col)
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
