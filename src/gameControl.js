import { Player } from './player.js'
import { GameDisplay } from './gameDisplay.js'

class GameControl {
  constructor() {
    this.player = new Player('Mystery Player')
    this.enemy = new Player('Computer')
    this.display = new GameDisplay()
  }
  startGame() {
    const results = document.querySelector('#results')
    this.enemy.gameboard.board = this.enemy.gameboard.createBoard()
    this.display.displayShips(this.player)
    this.enemy.gameboard.getRandomShips(this.enemy)
    this.display.displayBoard(this.player, this.enemy)
    // Need to find a way to have text that says 'Place your ships', then once ships are placed, change to below.
    // Rewrite displayShips function so that there is a function to 'chooseShips', and it controls the eventlisteners.
    results.textContent = `Let's start the battle, ${this.player.name}!`
    console.log(this.player.gameboard)
    console.log(this.enemy.gameboard)
  }
  createPlayer() {
    const newPlayer = document.querySelector('#newPlayer')
    const choosePlayer = document.querySelector('#choosePlayer')
    const form = document.querySelector('form')
    const saveBtn = document.querySelector('#saveBtn')
    const cancelBtn = document.querySelector('#cancelBtn')
    window.addEventListener('load', () => {
      choosePlayer.showModal()
    })
    newPlayer.addEventListener('click', () => {
      choosePlayer.showModal()
    })
    cancelBtn.addEventListener('click', () => {
      choosePlayer.close()
      form.reset()
    })
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault()
      let playerName = document.querySelector('#playerName').value
      choosePlayer.close()
      form.reset()
      this.player = new Player(playerName)
      this.startGame()
    })
  }
  newGame() {
    const newGame = document.querySelector('#newGame')
    newGame.addEventListener('click', () => {
      this.player.gameboard.board = this.player.gameboard.createBoard()
      this.startGame()
    })
  }
  playRound(player, enemy, row, col) {
    const enemyBoard = document.querySelector('#enemyBoard')
    const results = document.querySelector('#results')
    enemy.gameboard.receiveAttack(enemy, row, col)
    console.log('enemy.gameboard', enemy.gameboard)
    this.display.updateEnemyDisplay(player, enemy)
    if (this.endGame(player, enemy) === true) return
    enemyBoard.style.pointerEvents = 'none'
    results.textContent = `Take your shot, ${enemy.name}!`
    setTimeout(() => {
      player.gameboard.computerAttack(player)
      console.log('player.gameboard', player.gameboard)
      this.display.updatePlayerDisplay(player, enemy)
      if (this.endGame(player, enemy) === true) return
      enemyBoard.style.pointerEvents = 'auto'
      results.textContent = `Take your shot, ${player.name}!`
    }, 1500)
  }
  endGame(player, enemy) {
    if (player.gameboard.areAllShipsSunk() === true) {
      this.display.displayWinner(enemy)
      setTimeout(() => {
        this.player = new Player(player.name)
        this.startGame()
      }, 3000)
    } else if (enemy.gameboard.areAllShipsSunk() === true) {
      this.display.displayWinner(player)
      setTimeout(() => {
        this.player = new Player(player.name)
        this.startGame()
      }, 3000)
    } else {
      return false
    }
    return true
  }
}

export { GameControl }
