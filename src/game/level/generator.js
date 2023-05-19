class MapGenerator {
    constructor(
        mapLength,
        mapHeight,
        swordsAmount,
        potionsAmount,
        enemiesAmount,
        WallTile,
        VoidTile,
        container
    ) {
        this.container = container
        this.Wall = WallTile
        this.Void = VoidTile

        this.mapLength = mapLength
        this.mapHeight = mapHeight
        this.areaLeft = this.mapHeight * this.mapLength
        this.mapMatrix = null

        this.swordsAmount = swordsAmount
        this.potionsAmount = potionsAmount
        this.enemiesAmount = enemiesAmount
        this.roomsAmount = Math.round(10 + Math.random() * 5)
        this.verticalHallwaysAmount = Math.round(3 + Math.random() * 2)
        this.horizontalHallwaysAmount = Math.round(3 + Math.random() * 2)

        this.rooms = []
        this.verticalHallways = []
        this.horizontalHallways = []

        this.voidTiles = []
    }

    generateLevelMap(emptyMatrix) {

        this.mapMatrix = emptyMatrix
        for (let y = 0; y < this.mapHeight; y++) {
            this.mapMatrix[y] = this.mapMatrix[y].map((_, xIndex) => {
                const tile = new this.Wall(this.container).setCoords(xIndex + 1, y + 1)
                return tile
            })
        }
        return this
    }

    generateRooms() {
        for (let i = 0; i < this.roomsAmount; i++) {
            const room = new Room(this.Void, this.container)
            this.rooms.push(room)
        }
        return this
    }

    placeRooms() {
        if (!this.mapMatrix) {
            throw new Error("Can't place rooms before map is generated")
        }

        for (let Room of this.rooms) {
            Room.placeSelf(this.mapMatrix, this.voidTiles)
        }
        return this
    }




    placeHallways() {

        for (let i = 0; i < this.verticalHallwaysAmount; i++) {
            let hallwayPlaced = false
            while (!hallwayPlaced) {
                const colIndex = Math.round((this.mapLength - 1) * Math.random())

                const hasHallway = this.verticalHallways.some(
                    Hallway => Hallway.position === colIndex
                )

                if (!hasHallway) {
                    const VerticalHallway = new Hallway(this.Void, true, colIndex, this.container)
                        .placeSelf(this.mapMatrix, this.voidTiles)

                    this.verticalHallways.push(VerticalHallway)
                    hallwayPlaced = true
                }
            }
        }

        for (let i = 0; i < this.horizontalHallwaysAmount; i++) {
            let hallwayPlaced = false

            while (!hallwayPlaced) {
                const rowIndex = Math.round((this.mapHeight - 1) * Math.random())

                const hasHallway = this.horizontalHallways.some(
                    Hallway => Hallway.position === rowIndex
                )

                if (!hasHallway) {
                    const HorizontalHallway = new Hallway(this.Void, false, rowIndex, this.container)
                        .placeSelf(this.mapMatrix, this.voidTiles)

                    this.horizontalHallways.push(HorizontalHallway)
                    hallwayPlaced = true
                }
            }
        }

        return this
    }

    placePotions() {
        if (!this.mapMatrix) {
            throw new Error("Can't place postions before map is generated")
        }

        const voidTilesAmount = this.voidTiles.length

        for (let i = 0; i <this.potionsAmount; i++) {
            let potionPlaced = false
            while (!potionPlaced) {
                const potionTileIndex = Math.round((voidTilesAmount - 1) * Math.random())
    
                const Tile = this.voidTiles[potionTileIndex]
    
                if (!Tile.hasPotion && !Tile.hasSword && !Tile.hasEnemy && !Tile.hasHero) {
                    Tile.placePotion()
                }
                potionPlaced = true
            }
        }

        return this
    }

    placeSwords() {
        if (!this.mapMatrix) {
            throw new Error("Can't place swords before map is generated")
        }

        const voidTilesAmount = this.voidTiles.length

        for (let i = 0; i <this.swordsAmount; i++) {
            let swordPlaced = false
            while (!swordPlaced) {
                const swordTileIndex = Math.round((voidTilesAmount - 1) * Math.random())
    
                const Tile = this.voidTiles[swordTileIndex]
    
                if (!Tile.hasPotion && !Tile.hasSword && !Tile.hasEnemy && !Tile.hasHero) {
                    Tile.placeSword()
                }
                swordPlaced = true
            }
        }   

        return this
    }

    placeEnemies(enemies) {
        if (!this.mapMatrix) {
            throw new Error("Can't place enemies before map is generated")
        }

        const voidTilesAmount = this.voidTiles.length

        for (let i = 0; i <enemies.length; i++) {
            let enemyPlaced = false

            const Mob = enemies[i]

            while (!enemyPlaced) {
                const enemyTileIndex = Math.round((voidTilesAmount - 1) * Math.random())
    
                const Tile = this.voidTiles[enemyTileIndex]
    
                if (!Tile.hasPotion && !Tile.hasSword && !Tile.hasEnemy && !Tile.hasHero) {
                    Tile.placeEntity(Mob)
                    Mob.place(Tile, Tile.x - 1, Tile.y - 1)
                }
                enemyPlaced = true
            }
        } 

        return this
    }

    placeHero() {
        if (!this.mapMatrix) {
            throw new Error("Can't place hero before map is generated")
        }

        const voidTilesAmount = this.voidTiles.length

        let playerPlaced = false

        while (!playerPlaced) {
            const playerTileIndex = Math.round((voidTilesAmount - 1) * Math.random())

            const Tile = this.voidTiles[playerTileIndex]

            if (!Tile.hasPotion && !Tile.hasSword && !Tile.hasEnemy && !Tile.hasHero) {
                Tile.placeEntity(Gamer)
                Gamer.place(Tile, Tile.x - 1, Tile.y - 1)
            }
            playerPlaced = true
        }

        return this
    }
}