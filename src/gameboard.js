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
  placeShips(player, ship, row, col, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col] !== 'Empty' || !this.board[row][col]) {
          return false
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
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][col] !== 'Empty' || !this.board[row][col]) {
          return false
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
      col + ship.length > 9 ? col = 10 - ship.length : col
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
      row + ship.length > 9 ? row = 10 - ship.length : row
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
  receiveAttack(player, row, col, isEnemy) {
    if (!this.board[row][col]) {
      throw new Error('Error: This cell doesn\'t exist')
    }
    if (this.board[row][col] === 'Hit' || this.board[row][col] === 'Miss') {
      if (isEnemy === 'no') {
        throw new Error('Error: This cell\'s already been attacked')
      } else {
        this.computerAttack(player, isEnemy)
      }
    }
    if (this.board[row][col] === 'Empty') {
      this.board[row][col] = 'Miss'
    } else if (this.board[row][col] instanceof Ship) {
      this.board[row][col].hit()
      this.board[row][col] = 'Hit'
      player.hitsArray.push([row, col])
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
  computerAttack(player, isEnemy) {
    if (player.hitsArray.length > 0) {
      this.targetAttack(player)
    } else {
      let row = Math.floor(Math.random() * 10)
      let col = Math.floor(Math.random() * 10)
      this.receiveAttack(player, row, col, isEnemy)
    }
  }
  targetAttack(player) {
    for (let i = 0; i < player.hitsArray.length; i++) {
      let row = player.hitsArray[i][0]
      let col = player.hitsArray[i][1]
      if (this.board[row][col] === 'Sunk') {
        player.hitsArray.splice(i, 1)
        i--
      } else {
        let nextHitArray = [[row + 1, col], [row, col + 1], [row -1, col], [row, col - 1]]
        for (let j = nextHitArray.length - 1; j >= 0; j--) {
          let r = nextHitArray[j][0]
          let c = nextHitArray[j][1]
          if (r < 0 || r > 9) {
            nextHitArray.splice(j, 1)
          } else if (c < 0 || c > 9) {
            nextHitArray.splice(j, 1)
          } else if (this.board[r][c] === 'Sunk' || this.board[r][c] === 'Hit' || this.board[r][c] === 'Miss') {
            nextHitArray.splice(j, 1)
          } else if (this.board[r][c] === 'Empty' || this.board[r][c] instanceof Ship) {
            return this.receiveAttack(player, r, c)
          }
        }
        nextHitArray = []
        player.hitsArray.splice(i, 1)
        i--
      }
    }
    this.computerAttack(player)
  }
  areAllShipsSunk() {
    return this.ships.every((item) => {
      return item.isSunk()
    })
  }
}

export { Gameboard }
