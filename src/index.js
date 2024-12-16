import './styles.css'
import 'boxicons'
import { GameControl } from './gameControl.js'

let game = new GameControl()
game.newGame()
game.createPlayer()

// Change to webpack mode: 'production' and assess issues
