export class Tile {
    constructor(isVoid, classNames, container){
        this.x = 0
        this.y = 0
        this.container = container
        this.isVoid = isVoid
        this.DOMElement = $(`<div/>`).addClass(`tile ${classNames}`)
    }

    setX(newX) {
        this.x = newX
        this.DOMElement.css("grid-column", this.x)
        return this
    }
    setY(newY) {
        this.y = newY
        this.DOMElement.css("grid-row", this.y)
        return this
    }
    setCoords(x, y) {
        this.setX(x)
        this.setY(y)
        return this
    }

    render() {
        $(this.container).append(this.DOMElement)
    }
}