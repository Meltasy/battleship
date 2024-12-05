import { Player } from './player.js'
import { GameDisplay } from './gameDisplay.js'

class GameControl {
  constructor(player = new Player('Mystery Player'), enemy = new Player('Computer')) {
    this.player = player
    this.enemy = enemy
    this.display = new GameDisplay()
  }
  createPlayer() {
    const newPlayer = document.querySelector('#newPlayer')
    const dialog = document.querySelector('dialog')
    const form = document.querySelector('form')
    const addBtn = document.querySelector('#addBtn')
    const cancelBtn = document.querySelector('#cancelBtn')
    window.addEventListener('load', () => {
        dialog.showModal()
    })
    newPlayer.addEventListener('click', () => {
      dialog.showModal()
    })
    cancelBtn.addEventListener('click', () => {
      dialog.close()
      form.reset()
    })
    addBtn.addEventListener('click', (e) => {
      e.preventDefault()
      let playerName = document.querySelector('#playerName').value
      dialog.close()
      form.reset()
      this.player = new Player(playerName)
      this.enemy.gameboard.board = this.enemy.gameboard.createBoard()
      this.player.gameboard.getRandomShips()
      this.enemy.gameboard.getRandomShips()
      this.display.displayBoard(this.player, this.enemy)
    })
  }
  placeShips() {
    const placeShips = document.querySelector('#placeShips')
    placeShips.addEventListener('click', () => {
      this.player.gameboard.board = this.player.gameboard.createBoard()
      this.player.gameboard.getRandomShips()
      this.display.updateDisplay(this.player, this.enemy)
      console.log(this.enemy.gameboard)
    })
  }
  startGame() {
    const newGame = document.querySelector('#newGame')
    newGame.addEventListener('click', () => {
      this.player.gameboard.board = this.player.gameboard.createBoard()
      this.enemy.gameboard.board = this.enemy.gameboard.createBoard()
      this.player.gameboard.getRandomShips()
      this.enemy.gameboard.getRandomShips()
      this.display.displayBoard(this.player, this.enemy)
      console.log(this.enemy.gameboard)
    })
  }
  playRound(player, enemy, row, col) {
    enemy.gameboard.receiveAttack(row, col)
    console.log(enemy.gameboard)
    this.display.updateDisplay(player, enemy)
    this.endGame(player, enemy)
    setTimeout(() => {
    //   cell.removeEventListener('click', (event))
      player.gameboard.computerAttack()
      this.display.updateDisplay(player, enemy)
      this.endGame(player, enemy)
    }, 1500)
  }
//   Is there a way to disable the gameboard eventListeners ? element.replaceWith(element.cloneNode(true))
//   playerTurn(player, enemy, row, col) {
//     enemy.gameboard.receiveAttack(row, col)
//     this.display.updateDisplay(player, enemy)
//     this.endGame(player, enemy)
//   }
//   enemyTurn(player, enemy) {
//     setTimeout(() => {
//       player.gameboard.computerAttack()
//       this.display.updateDisplay(player, enemy)
//       this.endGame(player, enemy)
//     }, 1500)
//   }
  endGame(player, enemy) {
    if (player.gameboard.areAllShipsSunk() === true) {
        alert(`${enemy.name} is the winner`)
        this.startGame()
    } else if (enemy.gameboard.areAllShipsSunk() === true) {
        alert(`${player.name} is the winner`)
        this.startGame()
    } else {
        return false
    }
  }
}

export { GameControl }
