function Void(Parent, container){
        Tile.apply(this, [true, "", container])
        this.Parent = Parent
        this.hasPotion = false
        this.hasSword = false
        this.hasEntity = false

        this.Entity = null

        this.healthBar = null
}

Void.prototype = Object.create(Tile.prototype)

Void.prototype.constructor = Tile

Void.prototype.placePotion = function () {
    this.hasPotion = true
    this.DOMElement.addClass("tileHP")
    return this
}
Void.prototype.removePotion = function () {
    this.hasPotion = false
    this.DOMElement.removeClass("tileHP")
    return this
}

Void.prototype.placeSword = function () {
    this.hasSword = true
    this.DOMElement.addClass("tileSW")
    return this
}
Void.prototype.removeSword = function () {
    this.hasSword = false
    this.DOMElement.removeClass("tileSW")
    return this
}

Void.prototype.placeEntity = function (Entity) {
    this.hasEntity = true
    this.Entity = Entity

    const healthPerc = Math.round(Entity.health / Entity.maxHealth * 100)
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
Void.prototype.removeEntity = function () {
    this.hasEntity = false

    this.DOMElement.empty()

    this.healthBar = null
    this.Entity = null

    this.DOMElement.removeClass("tileP")
    this.DOMElement.removeClass("tileE")
    return this
}
