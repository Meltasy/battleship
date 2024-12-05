import './styles.css'
import 'boxicons'
import { GameControl } from './gameControl.js'

let newGame = new GameControl()
newGame.startGame()
newGame.createPlayer()
newGame.placeShips()
