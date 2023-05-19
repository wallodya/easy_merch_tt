import { MapGenerator } from "./level/generator.js"
import { Level } from "./level/level.js"
import  { LevelMap } from "./level/map.js"

export class Game {
    constructor(containerId) {
        this.container = containerId
        this.Level = new Level(this.container, LevelMap, MapGenerator)
    }

    init() {
        console.log("initializing game...")
        this.Level.init()
    }
}