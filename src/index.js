import './styles.css'
import 'boxicons'
import { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer } from './ship.js'
import { Gameboard } from './gameboard.js'
import { Player } from './player.js'
import { displayGameboard } from './gameDisplay.js'

displayGameboard()

// 1 addEventListeners on each cell for attacks

// const newGameBtn = document.querySelector('#newGame')
// newGameBtn.addEventListener('click', () => {
//     let player = new Player('Loulou')
//     let enemy = new Player('Computer')
//     displayGameboard(player, enemy)
// })

// How do you get cell coordinates?

// const cell = document.querySelector('.cell')








// 2 addEventListeners on each cell for ships

// 3 Create ships and direction button to change layout

// Testing

// let player = new Player('Nutty')
// let game = player.gameboard

// console.log(game.ships)

// let ship1 = new Destroyer('destroyer')
// game.placeShips(ship1, 9, 0, 'horizontal')
// let ship2 = new Battleship('battleship')
// game.placeShips(ship2, 3, 5, 'vertical')
// let ship3 = new Submarine('submarine')
// game.placeShips(ship3, 2, 7, 'vertical')
// let ship4 = new Cruiser('cruiser')
// game.placeShips(ship4, 6, 1, 'horizontal')
// let ship5 = new Carrier('carrier')
// game.placeShips(ship5, 6, 1, 'horizontal')

// console.log(ship1)
// console.log(ship2)
// console.log(ship3)
// console.log(ship4)
// console.log(ship5)
// console.log(game.receiveAttack(3,5))
// console.log(game.receiveAttack(3,4))
// console.log(game.receiveAttack(3,3))
// console.log(game.receiveAttack(3, 7))
// console.log(game.receiveAttack(6, 1))
// console.log(game.receiveAttack(6, 2))
// console.log(game.receiveAttack(6, 3))
// console.log(game.board)
// console.log(ship1)
// console.log(ship2)
// console.log(ship3)
// console.log(ship4)
// console.log(ship5)
// console.log(game.areAllShipsSunk())
