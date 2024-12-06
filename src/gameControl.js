import { Player } from './player.js'
import { GameDisplay } from './gameDisplay.js'

class GameControl {
  constructor(player = new Player('Mystery Player'), enemy = new Player('Computer')) {
    this.player = player
    this.enemy = enemy
    this.display = new GameDisplay()
  }
  startGame() {
    this.enemy.gameboard.board = this.enemy.gameboard.createBoard()
    this.player.gameboard.getRandomShips()
    this.enemy.gameboard.getRandomShips()
    this.display.displayBoard(this.player, this.enemy)
    console.log(this.enemy.gameboard)
  }
  createPlayer() {
    const newPlayer = document.querySelector('#newPlayer')
    const dialog = document.querySelector('dialog')
    const form = document.querySelector('form')
    const saveBtn = document.querySelector('#saveBtn')
    const cancelBtn = document.querySelector('#cancelBtn')
    window.addEventListener('load', () => {
    //   this.display.makePlayerDialog()
      dialog.showModal()
    })
    newPlayer.addEventListener('click', () => {
    //   this.display.makePlayerDialog()
      dialog.showModal()
    })
    cancelBtn.addEventListener('click', () => {
      dialog.close()
      form.reset()
    })
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault()
      let playerName = document.querySelector('#playerName').value
      dialog.close()
      form.reset()
      this.player = new Player(playerName)
      this.startGame()
    //   this.enemy.gameboard.board = this.enemy.gameboard.createBoard()
    //   this.player.gameboard.getRandomShips()
    //   this.enemy.gameboard.getRandomShips()
    //   this.display.displayBoard(this.player, this.enemy)
    })
  }
  placeShips() {
    const placeShips = document.querySelector('#placeShips')
    placeShips.addEventListener('click', () => {
      this.player.gameboard.board = this.player.gameboard.createBoard()
      this.player.gameboard.getRandomShips()
      this.display.updateDisplay(this.player, this.enemy)
    })
  }
  newGame() {
    const newGame = document.querySelector('#newGame')
    newGame.addEventListener('click', () => {
      this.player.gameboard.board = this.player.gameboard.createBoard()
      this.startGame()
    //   this.enemy.gameboard.board = this.enemy.gameboard.createBoard()
    //   this.player.gameboard.getRandomShips()
    //   this.enemy.gameboard.getRandomShips()
    //   this.display.displayBoard(this.player, this.enemy)
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
  // Why does it return to 'Mystery Player's Game?
    if (player.gameboard.areAllShipsSunk() === true) {
      // Add promise or async / await so that new game doesn't start until winner modal has been closed
      this.winnerModal(enemy)
      this.player = new Player(player.name)
      this.startGame()
    } else if (enemy.gameboard.areAllShipsSunk() === true) {
      this.winnerModal(player)
      this.player = new Player(player.name)
      this.startGame()
    } else {
      return false
    }
  }
  // Modal not showing
  winnerModal(winner) {
    this.display.endGameModal(winner)
    const winnerModal = document.querySelector('#winnerModal')
    const closeModal = document.querySelector('.closeModal')
    winnerModal.style.display = 'block'
    closeModal.onclick = () => {
      winnerModal.style.display = 'none'
    }
    window.onclick = (e) => {
      if (e.target == winnerModal) {
        winnerModal.style.display = 'none'           
      }
    }
  }    
}

export { GameControl }
