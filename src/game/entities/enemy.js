class Enemy extends Player{
    constructor(health, damage, speed) {
        super(health, damage, speed, true)
        this.playerX = 0
        this.playerY = 0
    }

    updatePlayerPosition(x, y) {
        const yValid = y > 0 && y < this.mapMatrix.length
        if (!yValid) {
            return this
        }

        const xValid = x > 0 && y < this.mapMatrix[y].length
        if (!xValid) {
            return this
        }

        this.playerX = x
        this.playerY = y

        this.checkPlayer()
        return this
    }

    checkPlayer() {
        for (let Tile of this.getAdgacentTiles()) {
            if (Tile.hasEntity && !Tile.Entity.isNPC) {
                this.attack()
            }
        }
    }

    die() {
        super.die()
        Gamer.unsubscribe(this)
    }
}