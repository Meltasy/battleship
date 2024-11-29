import './styles.css'
import { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer } from './ship.js'
import { Cell, Gameboard } from './gameboard.js'
import { player } from './player.js'

console.log(player)

let game = new Gameboard('Willy')
let ship1 = new Destroyer('destroyer')
game.placeShips(ship1, 9, 0, 'horizontal')
let ship2 = new Battleship('battleship')
game.placeShips(ship2, 3, 5, 'vertical')
let ship3 = new Submarine('submarine')
game.placeShips(ship3, 2, 7, 'vertical')
let ship4 = new Cruiser('cruiser')
game.placeShips(ship4, 6, 1, 'horizontal')

console.log(ship1)
console.log(ship2)
console.log(ship3)
console.log(ship4)
console.log(game.receiveAttack(3,5))
console.log(game.receiveAttack(3,4))
console.log(game.receiveAttack(3,3))
console.log(game.receiveAttack(3, 7))
console.log(game.receiveAttack(6, 1))
console.log(game.receiveAttack(6, 2))
console.log(game.receiveAttack(6, 3))
console.log(game.board)
console.log(ship1)
console.log(ship2)
console.log(ship3)
console.log(ship4)
