import { Wall } from "../tile/wall.js"
import { Void } from "../tile/void.js"
import Hero from "../entities/hero.js"

export class Level {
    constructor(container, LevelMap, MapGenerator) {
        this.container = container
        this.height = 24
        this.length = 40
        this.swordsAmount = 2
        this.potionsAmount = 10
        this.enemiesAmount = 10
        this.gameFieldMatrix = Array(this.height).fill(Array(this.length).fill())
        this.Map = new LevelMap(container, this.gameFieldMatrix)
        this.MapGenerator = new MapGenerator(
            this.length,
            this.height,
            this.swordsAmount,
            this.potionsAmount,
            this.enemiesAmount,
            Wall,
            Void,
            this.container
        )
    }

    init()  {
        console.log("initialising Level...")
        Hero.setFieldMatrix(this.gameFieldMatrix)
        this.Map.setGenerator(this.MapGenerator).init().render(this.container)
    }
}