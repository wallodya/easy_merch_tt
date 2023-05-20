function Hero() {
    Player.call(this, 1000, 100, 500, false)
    this.listeners = []
}

Hero.prototype = Object.create(Player.prototype)

Hero.prototype.constructor = Player

Hero.prototype.takeDamage = function(damage) {
    Player.prototype.takeDamage.call(this, damage)
}
Hero.prototype.up = function() {
    Player.prototype.up.call(this)
    this.checkPotion()
    this.checkSword()
    for (let Mob of this.listeners) {
        Mob.updatePlayerPosition(this.x, this.y)
    }
}


Hero.prototype.down = function() {
    Player.prototype.down.call(this)
    this.checkPotion()
    this.checkSword()
    for (let Mob of this.listeners) {
        Mob.updatePlayerPosition(this.x, this.y)
    }
}

Hero.prototype.left = function () {
    Player.prototype.left.call(this)
    this.checkPotion()
    this.checkSword()
    for (let Mob of this.listeners) {
        Mob.updatePlayerPosition(this.x, this.y)
    }
}

Hero.prototype.right = function () {
    Player.prototype.right.call(this)
    this.checkPotion()
    this.checkSword()
    for (let Mob of this.listeners) {
        Mob.updatePlayerPosition(this.x, this.y)
    }
}

Hero.prototype.checkPotion = function () {
    if (this.CurrentTile.hasPotion) {
        this.health = this.maxHealth
        this.CurrentTile.removePotion()
    }
    return this
}

Hero.prototype.checkSword = function () {
    if (this.CurrentTile.hasSword) {
        this.damage += (100 + Math.round(100 * Math.random()))
        this.CurrentTile.removeSword()
    }
    return this
}

Hero.prototype.die = function () {
    Player.prototype.die.call(this)
    window.location.reload()
}

Hero.prototype.subscribe = function (Mob) {
    this.listeners.push(Mob)
    return this
}

Hero.prototype.unsubscribe = function (Mob) {
    this.listeners = this.listeners.filter(Entity => Entity !== Mob)
    return this
}

var Gamer = new Hero()

window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case ("ArrowUp"): {
            event.preventDefault()
            Gamer.up()
            break
        }
        case ("ArrowDown"): {
            event.preventDefault()
            Gamer.down()
            break
        }
        case ("ArrowLeft"): {
            event.preventDefault()
            Gamer.left()
            break
        }
        case ("ArrowRight"): {
            event.preventDefault()
            Gamer.right()
            break
        }
        case ("w"): {
            event.preventDefault()
            Gamer.up()
            break
        }
        case ("s"): {
            event.preventDefault()
            Gamer.down()
            break
        }
        case ("a"): {
            event.preventDefault()
            Gamer.left()
            break
        }
        case ("d"): {
            event.preventDefault()
            Gamer.right()
            break
        }
        case (" "): {
            event.preventDefault()
            Gamer.attack()
            break
        }
    }
})

