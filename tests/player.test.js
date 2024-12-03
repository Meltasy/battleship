import { Player } from '../src/player.js'

let player
let gameboard

describe('create player gameboard', () => {
  player = new Player('Loulou')
  gameboard = player.gameboard.board
  test('if board has been created', () => {
    gameboard[3][6] = 'Hit'
    expect(gameboard[3][6]).toEqual('Hit')
    expect(gameboard[7][4]).toBe('Empty')
    expect(gameboard[9][9]).toBeTruthy()
  })
})
