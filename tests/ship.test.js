import { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer } from '../src/ship.js'

// Don't test private methods -- or only test them during dev and delete them when you move to prod

describe('ship is hit', () => {
  let ship
  beforeEach(() => {
    // ship = new Ship('carrier', 5)
    ship = new Carrier('carrier')
  })
  test('if ship hit, number of hits increases by 1', () => {
    ship.hit()
    expect(ship.hits).toBe(1)
  })
  test('ship hit to be less than ship length', () => {
    for (let i = 0; i < 10; i++) {
      ship.hit()
    }
    expect(ship.hits).toBe(5)
    expect(ship.hits).toBeLessThanOrEqual(ship.length)
  })
})

describe('ship is sunk', () => {
  let ship
  beforeEach(() => {
    // ship = new Ship('cruiser', 3)
    ship = new Cruiser('cruiser')
  })
  test('ship is sunk', () => {
    for (let i = 0; i < 3; i++) {
      ship.hit()
    }
    expect(ship.isSunk()).toBeTruthy()
    expect(ship.sunk).toBeTruthy()
  })
  test('ship is not sunk', () => {
    ship.hit()
    expect(ship.isSunk()).toBeFalsy()
    expect(ship.sunk).toBeFalsy()
  })
})
