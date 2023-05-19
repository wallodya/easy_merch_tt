class Enemy extends Player{
    constructor(health, damage, speed) {
        super(health, damage, speed, true)
        this.playerX = 0
        this.playerY = 0
        this.updatePostionInterval = null
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

        if (this.checkPlayer()) {
            console.log("attack")
            this.attack()
        }
        return this
    }

    setUpdatePositionInterval() {
        this.updatePostionInterval = setInterval(() => {
            let hasMoved = false
            if (!hasMoved && this.playerY < this.y) {
                this.up()
                hasMoved = true
            }
            
            if (!hasMoved && this.playerY > this.y) {
                this.down()
                hasMoved = true
            }
            
            if (!hasMoved && this.playerX < this.x) {
                this.left()
                hasMoved = true
            }

            if (!hasMoved && this.playerX > this.x) {
                this.right()
                hasMoved = true
            }

            if (this.checkPlayer()) {
                this.attack()
            }

        }, this.speed)
    }

    checkPlayer() {
        return this.getAdgacentTiles().some(Tile => Tile.hasEntity && !Tile.Entity.isNPC)
    }

    die() {
        clearInterval(this.updatePostionInterval)
        super.die()
        Gamer.unsubscribe(this)
    }
}