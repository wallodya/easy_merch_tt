class Enemy extends Player{
    constructor(health, damage, speed) {
        super(health, damage, speed, true)
        this.playerX = 0
        this.playerY = 0
        this.updatePostionInterval = null
        this.hasMoved = false
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
            this.attack()
        }
        return this
    }

    setUpdatePositionInterval() {
        this.updatePostionInterval = setInterval(() => {
            this.hasMoved = false
            this.move()
        }, this.speed)
    }
    
    move() {        
        if (!this.hasMoved && this.playerY > this.y) {
            this.down()
        }

        if (!this.hasMoved && this.playerY < this.y) {
            this.up()
        }
        
        
        if (!this.hasMoved && this.playerX < this.x) {
            this.left()
        }
    
        if (!this.hasMoved && this.playerX > this.x) {
            this.right()
        }
    
        if (this.checkPlayer()) {
            this.attack()
        }
        return this
    }

    up(){
        if (super.up()) {
            this.hasMoved = true
        }
        return this
    }
    down(){
        if (super.down()) {
            this.hasMoved = true
        }

        return this
    }
    left(){
        if (super.left()) {
            this.hasMoved = true
        }

        return this
    }
    right(){
        if (super.right()) {
            this.hasMoved = true
        }
        return this
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