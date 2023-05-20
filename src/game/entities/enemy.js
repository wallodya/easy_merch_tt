function Enemy(health, damage, speed) {
    Player.call(this, health, damage, speed, true)
    this.playerX = 0
    this.playerY = 0
    this.updatePostionInterval = null
    this.hasMoved = false

    return this
}

Enemy.prototype = Object.create(Player.prototype)

Enemy.prototype.constructor = Player

Enemy.prototype.updatePlayerPosition = function (x, y) {
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

Enemy.prototype.setUpdatePositionInterval = function () {
    this.updatePostionInterval = setInterval(() => {
        this.hasMoved = false
        this.move()
    }, this.speed)
}

Enemy.prototype.move = function () {
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

Enemy.prototype.up = function () {
    if (Player.prototype.up.call(this)) {
        this.hasMoved = true
    }
    return this
}
Enemy.prototype.down = function () {
    if (Player.prototype.down.call(this)) {
        this.hasMoved = true
    }

    return this
}
Enemy.prototype.left = function () {
    if (Player.prototype.left.call(this)) {
        this.hasMoved = true
    }

    return this
}
Enemy.prototype.right = function () {
    if (Player.prototype.right.call(this)) {
        this.hasMoved = true
    }
    return this
}

Enemy.prototype.checkPlayer = function () {
    return this.getAdgacentTiles().some(function (Tile) {
        return Tile.hasEntity && !Tile.Entity.isNPC
    })
}

Enemy.prototype.die = function () {
    clearInterval(this.updatePostionInterval)
    Player.prototype.die.call(this)
    Gamer.unsubscribe(this)
}
