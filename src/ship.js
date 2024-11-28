class Ship {
  constructor(name, length) {
    this.name = name
    this.length = length
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
  }
}

export { Ship }
