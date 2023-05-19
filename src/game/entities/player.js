export class Player {
    constructor(maxHealth, damage, speed) {
        this.x = 0
        this.y = 0
        this.mapMatrix = null
        this.CurrentTile = null
        this.maxHealth = maxHealth
        this.health = maxHealth
        this.damage = damage
        this.speed = speed
    }


    attack() {
        console.log("attack")
        return this
    }

    moveTo(Tile) {
        this.CurrentTile.removeEntity()

        Tile.placeEntity(this)
        
        this.CurrentTile = Tile

        return this
    }

    up() {
        if (this.y === 0) {
            return this
        }

        const DestTile = this.mapMatrix[this.y - 1][this.x]

        const tileAvailable = DestTile.isVoid && !DestTile.hasEntity

        if (tileAvailable) {
            this.y--
            this.moveTo(DestTile)
        }

        return this
    }
    down() {
        if (this.y === this.mapMatrix.length) {
            return this
        }

        const DestTile = this.mapMatrix[this.y + 1][this.x]

        const tileAvailable = DestTile.isVoid && !DestTile.hasEntity

        if (tileAvailable) {
            this.y++
            this.moveTo(DestTile)
        }

        return this
    }

    left() {
        if (this.x === 0) {
            return this
        }

        const DestTile = this.mapMatrix[this.y][this.x - 1]

        const tileAvailable = DestTile.isVoid && !DestTile.hasEntity

        if (tileAvailable) {
            this.x--
            this.moveTo(DestTile)
        }

        return this
    }

    right() {
        if (this.x === this.mapMatrix[this.y].length - 1) {
            return this
        }

        const DestTile = this.mapMatrix[this.y][this.x + 1]

        const tileAvailable = DestTile.isVoid && !DestTile.hasEntity

        if (tileAvailable) {
            this.x++
            this.moveTo(DestTile)
        }

        return this
    }

    place(Tile, newX, newY) {
        this.CurrentTile = Tile
        this.x = newX
        this.y = newY
        return this
    }

    setFieldMatrix(matrix) {
        this.mapMatrix = matrix
        return this
    }
}