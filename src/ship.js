class Ship {
  constructor(name) {
    this.name = name
    this.hits = 0
    // Do I need this? If not, delete and use isSunk() only
    this.sunk = false
  }
  hit() {
    if (this.hits < this.length) {
      this.hits += 1
    }
  }
  isSunk() {
    if (this.length === this.hits) {
      this.sunk = true
      return true
    }
    return false
  }
}

class Carrier extends Ship {
  constructor(name) {
    super(name)
    this.length = 5
  }
}

class Battleship extends Ship {
  constructor(name) {
    super(name)
    this.length = 4
  }

}

class Cruiser extends Ship {
  constructor(name) {
    super(name)
    this.length = 3
  }
}

class Submarine extends Ship {
  constructor(name) {
    super(name)
    this.length = 3
  }
}

class Destroyer extends Ship {
  constructor(name) {
    super(name)
    this.length = 2
  }
}

export { Ship, Carrier, Battleship, Cruiser, Submarine, Destroyer }
