import './styles.css'
import 'boxicons'
import { GameControl } from './gameControl.js'

let game = new GameControl()
game.newGame()
game.createPlayer()

// Add an await async for fetching the boxicons?
// Run tests and fix whatever is broken