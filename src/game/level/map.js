export class LevelMap {
    constructor(container) {
        this.height = 24
        this.length = 40
        this.container = container
        this.matrix = Array(this.height).fill(Array(this.length).fill())
        this.Generator = null
        this.isMapGenerated = false
    }

    init() {
        if (!this.Generator) {
            throw new Error("Map generator was not set")
        }
        
        this.Generator.generateLevelMap(this.matrix)
            .generateRooms()
            .placeHallways()
            .placeRooms()

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
        console.log("placing map inside " + this.container + "...")
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