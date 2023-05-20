function Tile(isVoid, classNames, container) {
    this.x = 0
    this.y = 0
    this.container = container
    this.isVoid = isVoid
    this.DOMElement = $(`<div/>`).addClass(`tile ${classNames}`)
}

Tile.prototype.setX = function (newX) {
    this.x = newX
    this.DOMElement.css("grid-column", this.x)
    return this
}
Tile.prototype.setY = function (newY) {
    this.y = newY
    this.DOMElement.css("grid-row", this.y)
    return this
}
Tile.prototype.setCoords = function (x, y) {
    this.setX(x)
    this.setY(y)
    return this
}

Tile.prototype.render = function () {
    $(this.container).append(this.DOMElement)
}