class Hero extends Player {
    constructor(){
        super(1000, 100, 500, false)
        this.listeners = []
    }

    takeDamage(damage) {
        super.takeDamage(damage)
    }

    up(){
        super.up()
        this.checkPotion()
        this.checkSword()
        for (let Mob of this.listeners) {
            Mob.updatePlayerPosition(this.x, this.y)
        }
    }

    down(){
        super.down()
        this.checkPotion()
        this.checkSword()
        for (let Mob of this.listeners) {
            Mob.updatePlayerPosition(this.x, this.y)
        }
    }

    left(){
        super.left()
        this.checkPotion()
        this.checkSword()
        for (let Mob of this.listeners) {
            Mob.updatePlayerPosition(this.x, this.y)
        }
    }

    right(){
        super.right()
        this.checkPotion()
        this.checkSword()
        for (let Mob of this.listeners) {
            Mob.updatePlayerPosition(this.x, this.y)
        }
    }

    checkPotion() {
        if (this.CurrentTile.hasPotion) {
            this.health = this.maxHealth
            this.CurrentTile.removePotion()
        }
        return this
    }
    
    checkSword() {
        if (this.CurrentTile.hasSword) {
            this.damage += (100 + Math.round(100 * Math.random()))
            this.CurrentTile.removeSword()
        }
        return this
    }

    die() {
        super.die()
        window.location.reload()
    }

    subscribe(Mob) {
        this.listeners.push(Mob)
        return this
    }

    unsubscribe(Mob) {
        this.listeners = this.listeners.filter(Entity => Entity !== Mob)
        return this
    }
}

const Gamer = new Hero()

window.addEventListener("keydown", (event) => {
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

