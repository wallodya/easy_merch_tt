function Wall (container) {
    Tile.apply(this, [false, "tileW", container])
}

Wall.prototype = Object.create(Tile.prototype)

Wall.prototype.constructor = Tile