import { Gameboard } from "../src/gameboard";
import { Carrier, Battleship, Cruiser, Submarine, Destroyer } from '../src/ship.js'

let gameboard
let ship
beforeAll(() => {
  gameboard = new Gameboard('Willy')
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
    ship = new Destroyer('destroyer')
    gameboard.placeShips(ship, 9, 0, 'horizontal')
    expect(gameboard.board[9][0].name).toMatch('destroyer')
    expect(gameboard.board[9][1].name).toBe('destroyer')
  })
  test('if ship has been placed vertically', () => {
    ship = new Battleship('battleship')
    gameboard.placeShips(ship, 3, 5, 'vertical')
    expect(gameboard.board[3][5].name).toMatch('battleship')
    expect(gameboard.board[6][5].name).toEqual('battleship')
  })
})

describe('unable to place ships', () => {
  test('if ship throws when placed horizontally', () => {
    ship = new Submarine('submarine')
    expect(() => {gameboard.placeShips(ship, 2, 9, 'horizontal')}).toThrow()
  })
  test('if ship throws when placed vertically', () => {
    ship = new Carrier('carrier')
    expect(() => {gameboard.placeShips(ship, 9, 4, 'vertical')}).toThrow()
  })
})

describe('receive attack', () => {
  test('change cell to miss when empty', () => {
    gameboard.receiveAttack(4, 4)
    expect(gameboard.board[4][4]).toEqual('Miss')
  })
  test('change cell to hit when ship present', () => {
    ship = new Submarine('submarine')
    gameboard.placeShips(ship, 2, 7, 'vertical')
    gameboard.receiveAttack(3, 7)
    expect(gameboard.board[3][7]).toMatch('Hit')
  })
  test('increase number of hits on ship', () => {
    ship = new Cruiser('cruiser')
    gameboard.placeShips(ship, 6, 1, 'horizontal')
    gameboard.receiveAttack(6, 3)
    expect(ship.hits).toBe(1)
  })
  test('sink ship when final hit received', () => {
    ship = new Carrier('carrier')
    gameboard.placeShips(ship, 0, 2, 'horizontal')
    gameboard.receiveAttack(0, 2)
    gameboard.receiveAttack(0, 3)
    gameboard.receiveAttack(0, 4)
    gameboard.receiveAttack(0, 5)
    gameboard.receiveAttack(0, 6)
    expect(ship.isSunk()).toBeTruthy()
  })
})

describe('are all ships sunk', () => {
  beforeEach(() => {
    ship = new Submarine('submarine')
    gameboard.placeShips(ship, 8, 4, 'horizontal')
    gameboard.receiveAttack(8, 4)
    gameboard.receiveAttack(8, 5)
    ship = new Destroyer('destroyer')
    gameboard.placeShips(ship, 1, 8, 'vertical')
    gameboard.receiveAttack(1, 8)
  })
  test('all ships are sunk', () => {
    gameboard.receiveAttack(8, 6)
    gameboard.receiveAttack(2, 8)
    expect(ship.isSunk()).toBeTruthy()
  })
  test('ships are hit, but not sunk', () => {
    expect(ship.isSunk()).toBeFalsy()
  })
})
