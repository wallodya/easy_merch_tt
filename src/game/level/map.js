function LevelMap(container, matrix, enemies) {
        this.height = 24
        this.length = 40
        this.container = container
        this.matrix = matrix
        this.Generator = null
        this.isMapGenerated = false
        this.enemies = enemies
}

LevelMap.prototype.init = function() {
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

    for (let Enemy of this.enemies) {
        Enemy.updatePlayerPosition(Gamer.x, Gamer.y)
        Enemy.setUpdatePositionInterval()
    }

    this.isMapGenerated = true

    return this
}



LevelMap.prototype.setGenerator = function(MapGenerator) {
    this.Generator = MapGenerator
    return this
}

LevelMap.prototype.render = function() {
    if (!this.isMapGenerated) {
        throw new Error("Map was not generated")
    }
    this.matrix.flat().forEach(function (tile) { tile.render() })
}