export class Room {
    constructor(RoomTile, container) {
        this.container = container
        this.Tile = RoomTile

        this.length = Math.round((3 + 5 * Math.random()))
        this.height = Math.round((3 + 5 * Math.random()))
        this.x = Math.round(40 * Math.random())
        this.y = Math.round(24 * Math.random())
        this.isDisconnected = true
    }

    placeSelf(mapMatrix, voidTiles) {
        const yBottom = this.y + this.height
        const xRight = this.x + this.length
        for (let y = this.y; (y < yBottom) && (y < mapMatrix.length); y++) {
            for (let x = this.x; x < xRight && (x < mapMatrix[y].length); x++) {
                this.checkConnected(mapMatrix, x, y)
                const VoidTile = new this.Tile(this, this.container).setCoords(x + 1, y + 1)

                const conflictingTileIndex = voidTiles.findIndex(
                    Tile => Tile.x === VoidTile.x && Tile.y === VoidTile.y
                )

                if (conflictingTileIndex) {
                    voidTiles[conflictingTileIndex] = VoidTile
                } else {
                    voidTiles.push(VoidTile)
                }

                mapMatrix[y][x] = VoidTile
            }
        }
        return this
    }

    checkConnected(mapMatrix, x, y) {
        const tileBelongsToRoom = mapMatrix[y][x].isVoid
        const connectedOnTop = y > 0 ? mapMatrix[y - 1][x].isVoid : false
        const connectedOnBottom = y < mapMatrix.length - 1 ? mapMatrix[y + 1][x].isVoid : false
        const connectedOnLeft = x > 0 ? mapMatrix[y][x - 1].isVoid : false
        const connectedOnRight = x < mapMatrix[y].length - 1 ? mapMatrix[y][x + 1].isVoid : false

        const isConnected = connectedOnBottom || connectedOnTop || connectedOnLeft || connectedOnRight

        if (tileBelongsToRoom || isConnected) {
            this.isDisconnected = false
        }

        return this
    }
}