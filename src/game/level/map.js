class LevelMap {
    constructor(container, matrix, enemies) {
        this.height = 24
        this.length = 40
        this.container = container
        this.matrix = matrix
        this.Generator = null
        this.isMapGenerated = false
        this.enemies = enemies
    }

    init() {
        if (!this.Generator) {
            throw new Error("Map generator was not set")
        }
        
        this.Generator.generateLevelMap(this.matrix)
            .generateRooms()
            .placeHallways()
            .placeRooms()
            .placePotions()
            .placeSwords()
            .placeEnemies(this.enemies)
            .placeHero()

        this.isMapGenerated = true

        return this
    }

    setGenerator(MapGenerator) {
        this.Generator = MapGenerator
        return this
    }

    render() {
        if (!this.isMapGenerated) {
            throw new Error("Map was not generated")
        }
        this.matrix.flat().forEach(tile => tile.render())
    }

    getRandomVoid(){}

    checkWall(direction){
        switch(direction) {
            case("top"): {
                return
            }
            case("bottom"): {
                return
            }
            case("left"): {
                return
            }
            case("right"): {
                return
            }
        }
    }
}