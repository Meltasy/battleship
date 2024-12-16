import { Player } from '../src/player.js'
import { Gameboard } from "../src/gameboard";
import { Carrier, Battleship, Cruiser, Submarine, Destroyer } from '../src/ship.js'

let player
let enemy
let gameboard
let ship
beforeAll(() => {
  player = new Player('Willy')
  enemy = new Player('Computer')
  gameboard = new Gameboard(player)

})

describe('create gameboard', () => {
  test('if board has been created', () => {
    gameboard.board[5][9] = 'Hit'
    expect(gameboard.board[5][9]).toEqual('Hit')
    expect(gameboard.board[2][5]).toBe('Empty')
    expect(gameboard.board[9][9]).toBeTruthy()
  })
})

describe('place ships', () => {
  test('if ship has been placed horizontally', () => {
    ship = new Destroyer('Destroyer')
    gameboard.placeShips(player, ship, 9, 0, 'horizontal')
    expect(gameboard.board[9][0].name).toMatch('Destroyer')
    expect(gameboard.board[9][1].name).toBe('Destroyer')
  })
  test('if ship has been placed vertically', () => {
    ship = new Battleship('Battleship')
    gameboard.placeShips(player, ship, 3, 5, 'vertical')
    expect(gameboard.board[3][5].name).toMatch('Battleship')
    expect(gameboard.board[6][5].name).toEqual('Battleship')
  })
})

describe('unable to place ships', () => {
  test('if ship returns false when placed horizontally', () => {
    ship = new Submarine('Submarine')
    expect(gameboard.placeShips(player, ship, 2, 9, 'horizontal')).toBeFalsy()
  })
  test('if ship returns false when placed vertically', () => {
    ship = new Carrier('Carrier')
    expect(gameboard.placeShips(player, ship, 9, 0, 'vertical')).toBeFalsy()
  })
})

describe('receive attack', () => {
  test('change cell to miss when empty', () => {
    gameboard.receiveAttack(player, 4, 4)
    expect(gameboard.board[4][4]).toEqual('Miss')
  })
  test('change cell to hit when ship present', () => {
    ship = new Submarine('Submarine')
    gameboard.placeShips(player, ship, 2, 7, 'vertical')
    gameboard.receiveAttack(player, 3, 7)
    expect(gameboard.board[3][7]).toMatch('Hit')
  })
  test('increase number of hits on ship', () => {
    ship = new Cruiser('Cruiser')
    gameboard.placeShips(player, ship, 6, 1, 'horizontal')
    gameboard.receiveAttack(player, 6, 3)
    expect(ship.hits).toBe(1)
  })
  test('sink ship when final hit received', () => {
    ship = new Carrier('Carrier')
    gameboard.placeShips(player, ship, 0, 2, 'horizontal')
    gameboard.receiveAttack(player, 0, 2)
    gameboard.receiveAttack(player, 0, 3)
    gameboard.receiveAttack(player, 0, 4)
    gameboard.receiveAttack(player, 0, 5)
    gameboard.receiveAttack(player, 0, 6)
    expect(ship.isSunk()).toBeTruthy()
  })
})

describe('are all ships sunk', () => {
  beforeEach(() => {
    ship = new Submarine('Submarine')
    gameboard.placeShips(player, ship, 8, 6, 'horizontal')
    gameboard.receiveAttack(enemy, 8, 6)
    gameboard.receiveAttack(enemy, 8, 7)
    ship = new Destroyer('Destroyer')
    gameboard.placeShips(player, ship, 1, 8, 'vertical')
    gameboard.receiveAttack(enemy, 1, 8)
  })
  test('all ships are sunk', () => {
    gameboard.receiveAttack(enemy, 8, 8)
    gameboard.receiveAttack(enemy, 2, 8)
    expect(ship.isSunk()).toBeTruthy()
  })
  test('ships are hit, but not sunk', () => {
    expect(ship.isSunk()).toBeFalsy()
  })
})
