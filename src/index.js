import './styles.css'
import 'boxicons'
import { GameControl } from './gameControl.js'

let game = new GameControl()
game.newGame()
game.createPlayer()
game.choosePlaceShips()

// Add an await async for fetching the boxicons?
