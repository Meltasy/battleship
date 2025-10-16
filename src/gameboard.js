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
        return
      }
    }
    if (this.board[row][col] === 'Empty') {
      this.board[row][col] = 'Miss'
      return
    }
    if (this.board[row][col] instanceof Ship) {
      const hitShip = this.board[row][col]
      hitShip.hit()
      this.board[row][col] = 'Hit'
      player.hitsArray.push([row, col])
      this.ships.forEach((item) => {
        if (item.isSunk() === true) {
          const shipName = item.name
          const sunkCoords = player.shipsArray.filter(([ship]) => ship.name === shipName).map(([_, row, col]) => [row, col])
          sunkCoords.forEach(([row, col]) => {
            this.board[row][col] = 'Sunk'
          })
          player.hitsArray = player.hitsArray.filter(([row, col]) => !sunkCoords.some(([someRow, someCol]) => someRow === row && someCol === col))
        }
      })
      this.areAllShipsSunk()
    }
  }
  computerAttack(player, isEnemy) {
    if (player.hitsArray.length > 0) {
      const target = this.targetAttack(player)
      if (target) {
        const [row, col] = target
        this.receiveAttack(player, row, col, isEnemy)
        return
      }
    }
    let row = Math.floor(Math.random() * 10)
    let col = Math.floor(Math.random() * 10)
    if (this.board[row][col] === 'Hit' || this.board[row][col] === 'Miss' || this.board[row][col] === 'Sunk') {
      return this.computerAttack(player, isEnemy)
    }
    this.receiveAttack(player, row, col, isEnemy)
  }
  targetAttack(player) {
    let hits = player.hitsArray.filter(([row, col]) => {
      return this.board[row] && this.board[row][col] === 'Hit'
    })
    player.hitsArray = hits
    if (hits.length === 0) return null
    if (hits.length === 1) {
      const [row, col] = hits[0]
      const options = [[row + 1, col], [row, col + 1], [row -1, col], [row, col - 1]]
      return this.chooseCell(options)
    }
    const sameRow = hits.every(([row]) => row === hits[0][0])
    const sameCol = hits.every(([_, col]) => col === hits[0][1])
    if (sameRow) {
      const cols = hits.map(([_, col]) => col)
      const minC = Math.min(...cols)
      const maxC = Math.max(...cols)
      return this.chooseCell([[hits[0][0], minC - 1], [hits[0][0], maxC + 1]])
    } else if (sameCol) {
      const rows = hits.map(([row]) => row)
      const minR = Math.min(...rows)
      const maxR = Math.max(...rows)
      return this.chooseCell([[minR - 1, hits[0][1]], [maxR + 1, hits[0][1]]])
    }
    const [row, col] = hits[hits.length - 1]
    const fallback = [[row + 1, col], [row, col + 1], [row -1, col], [row, col - 1]]
    return this.chooseCell(fallback)
  }
  chooseCell(cells) {
    for (const [row, col] of cells) {
      if (row >= 0 && row < 10 && col >= 0 && col < 10) {
        const cell = this.board[row][col]
        if (cell === 'Empty' || cell instanceof Ship) {
          return [row, col]
        }
      }
    }
    return null
  }
  areAllShipsSunk() {
    return this.ships.every((item) => {
      return item.isSunk()
    })
  }
}

export { Gameboard }
