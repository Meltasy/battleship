import { Gameboard } from './gameboard.js'

class Player {
  constructor(name) {
    this.name = name
    this.gameboard = new Gameboard(this.name)
    this.isEnemy = 'no'
    this.shipsArray = []
    this.hitsArray = []
  }
}

export { Player }
