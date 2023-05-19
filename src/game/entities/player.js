class Player {
    constructor(maxHealth, damage, speed, isNPC) {
        this.x = 0
        this.y = 0
        this.mapMatrix = null
        this.CurrentTile = null
        this.maxHealth = maxHealth
        this.health = this.maxHealth
        this.damage = damage
        this.speed = speed
        this.healthBar = null
        this.isNPC = isNPC
    }


    attack() {
        const adgacentTiles = this.getAdgacentTiles()

        for (let Tile of adgacentTiles) {
            if (Tile.isVoid && Tile.hasEntity){
                if (!this.isNPC) {
                    Tile.Entity.takeDamage(this.damage)
                } else if (!Tile.Entity.isNPC) {
                    const takenDamage = this.damage
                    Tile.Entity.takeDamage(this.damage)
                }
            }
        }

        return this
    }

    takeDamage(damage) {
        this.health = this.health - damage
        if (this.health <= 0 ) {
            this.die()
        }
        this.updateHealthBar()
        return this
    }

    die() {
        this.CurrentTile.removeEntity()
        delete this
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
        if (this.y === this.mapMatrix.length - 1) {
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

    updateHealthBar() {
        const healthPerc = Math.round(this.health / this.maxHealth * 100)
        this.healthBar.attr("style", `width: ${healthPerc}% `)
        return this
    }

    place(Tile, newX, newY) {
        this.CurrentTile = Tile
        this.x = newX
        this.y = newY
        return this
    }

    getAdgacentTiles() {
        const AboveTile = this.y > 0 ?  this.mapMatrix[this.y - 1][this.x] : null
        const BelowTile = this.y < this.mapMatrix.length - 1 ?  this.mapMatrix[this.y + 1][this.x] : null
        const LeftTile = this.x > 0 ?  this.mapMatrix[this.y][this.x - 1] : null
        const RightTile = this.x < this.mapMatrix[this.y].length - 1 ?  this.mapMatrix[this.y][this.x + 1] : null

        return [AboveTile, BelowTile, LeftTile, RightTile].filter(Tile => Tile !== null)
    }

    setFieldMatrix(matrix) {
        this.mapMatrix = matrix
        return this
    }
}