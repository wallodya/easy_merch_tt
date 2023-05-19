import { Wall } from "../tile/wall.js"
import { Void } from "../tile/void.js"

export class Level {
    constructor(container, LevelMap, MapGenerator) {
        this.container = container
        this.height = 24
        this.length = 40
        this.swordsAmount = 2
        this.poutionsAmount = 10
        this.Map = new LevelMap(container)
        this.MapGenerator = new MapGenerator(
            this.length,
            this.height,
            this.swordsAmount,
            this.poutionsAmount,
            Wall,
            Void,
            this.container
        )
    }

    init()  {
        console.log("initialising Level...")
        this.Map.setGenerator(this.MapGenerator).init().render(this.container)
    }
}