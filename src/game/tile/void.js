import { Tile } from "./tile.js";

export class Void extends Tile {
    constructor(Parent, container) {
        super(true, "", container)
        this.Parent = Parent
        this.hasPotion = false
        this.hasSword = false
        this.hasHero = false
        this.hasEnemy = false
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
        this.DOMElement.addClass("tileS")
        return this
    }
    removeSword() {
        this.hasSword = false
        this.DOMElement.removeClass("tileS")
        return this
    }

    placeHero() {
        this.hasHero = true
        this.DOMElement.addClass("tileP")
        return this
    }
    removeHero() {
        this.hasHero = false
        this.DOMElement.removeClass("tileP")
        return this
    }

    placeEnemy() {
        this.hasEnemy = true
        this.DOMElement.addClass("tileE")
        return this
    }
    removeEnemy() {
        this.hasEnemy = false
        this.DOMElement.removeClass("tileE")
        return this
    }
}