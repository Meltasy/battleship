import { Carrier, Cruiser } from '../src/ship.js'

describe('ship is hit', () => {
  let ship
  beforeEach(() => {
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
    ship = new Cruiser('cruiser')
  })
  test('ship is sunk', () => {
    for (let i = 0; i < 3; i++) {
      ship.hit()
    }
    expect(ship.isSunk()).toBeTruthy()
  })
  test('ship is not sunk', () => {
    ship.hit()
    expect(ship.isSunk()).toBeFalsy()
  })
})
