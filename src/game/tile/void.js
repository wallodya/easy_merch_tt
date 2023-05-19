class Void extends Tile {
    constructor(Parent, container) {
        super(true, "", container)
        this.Parent = Parent
        this.hasPotion = false
        this.hasSword = false
        this.hasEntity = false

        this.Entity = null

        this.healthBar = null
    }

    placePotion() {
        this.hasPotion = true
        this.DOMElement.addClass("tileHP")
        return this
    }
    removePotion() {
        this.hasPotion = false
        this.DOMElement.removeClass("tileHP")
        return this
    }

    placeSword() {
        this.hasSword = true
        this.DOMElement.addClass("tileSW")
        return this
    }
    removeSword() {
        this.hasSword = false
        this.DOMElement.removeClass("tileSW")
        return this
    }

    placeEntity(Entity) {
        this.hasEntity = true
        this.Entity = Entity

        const healthPerc = Math.round(Entity.health / Entity.maxHealth  * 100)
        this.healthBar = $("<div/>").addClass("health").attr("style", `width: ${healthPerc}% `)
        Entity.healthBar = this.healthBar
        this.DOMElement.append(this.healthBar)

        if (Entity instanceof Hero) {
            this.DOMElement.addClass("tileP")
        } else {
            this.DOMElement.addClass("tileE")
        }
        return this
    }
    removeEntity() {
        this.hasEntity = false

        this.DOMElement.empty()

        this.healthBar = null
        this.Entity = null

        this.DOMElement.removeClass("tileP")
        this.DOMElement.removeClass("tileE")
        return this
    }
}