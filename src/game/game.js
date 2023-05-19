class Game {
    constructor(containerId) {
        this.container = containerId
        this.Level = new Level(this.container, LevelMap, MapGenerator)
    }

    init() {
        this.Level.init()
    }
}