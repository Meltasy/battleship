import { Gameboard } from "../src/gameboard";

// Don't test private methods -- or only test them during dev and delete them when you move to prod

describe('create gameboard', () => {
  let gameboard
  beforeEach(() => {
    gameboard = new Gameboard()
  })
  test('if board has been created', () => {
    gameboard.createBoard()
    gameboard.board[5][9] = 'Hello'
    expect(gameboard.board[5][9]).toEqual('Hello')
    expect(gameboard.board[2][5]).toBe(0)
  })
})

describe('place ships', () => {
  let gameboard
  beforeEach(() => {
    gameboard = new Gameboard()
    gameboard.createBoard()
  })
  test('if ship has been placed horizontally', () => {
    gameboard.placeShips('destroyer', 9, 0, 'horizontal')
    expect(gameboard.board[9][0]).toMatch('destroyer')
    expect(gameboard.board[9][1]).toBe('destroyer')
  })
  test('if ship has been placed vertically', () => {
    gameboard.placeShips('battleship', 3, 5, 'vertical')
    expect(gameboard.board[3][5]).toMatch('battleship')
    expect(gameboard.board[6][5]).toEqual('battleship')
  })
})
