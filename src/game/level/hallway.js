export class Hallway {
    constructor(HallwayTile, isVertical, position, container) {
        this.Tile = HallwayTile
        this.isVertical = isVertical
        this.position = position
        this.container = container
    }

    placeSelf(mapMatrix, voidTiles) {
        if (this.isVertical) {

            for (let y = 0; y < mapMatrix.length; y++) {
                const VoidTile = new this.Tile(this, this.container).setCoords(this.position + 1, y + 1)
                mapMatrix[y][this.position] = VoidTile
                voidTiles.push(VoidTile)
            }
            
            return this
        } else {
            for (let x = 0; x < mapMatrix[this.position].length; x++) {
                const VoidTile = new this.Tile(this, this.container).setCoords(x + 1, this.position + 1)
                mapMatrix[this.position][x] = VoidTile
                voidTiles.push(VoidTile)
            }

            return this
        }
    }
}