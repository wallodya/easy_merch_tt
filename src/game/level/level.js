import { Wall } from "../tile/wall.js"
import { Void } from "../tile/void.js"
import Hero from "../entities/hero.js"
import { Enemy } from "../entities/enemy.js"

export class Level {
    constructor(container, LevelMap, MapGenerator) {
        this.container = container
        this.height = 24
        this.length = 40
        this.swordsAmount = 2
        this.potionsAmount = 10
        this.enemiesAmount = 10
        this.enemies = []
        this.gameFieldMatrix = Array(this.height).fill(Array(this.length).fill())
        this.Map = new LevelMap(container, this.gameFieldMatrix, this.enemies)
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
        for (let i = 0; i < this.enemiesAmount; i++) {
            const enemyHealth = Math.round(400 + 600 * Math.random())
            const enemyDamage = Math.round( 50 + 200 * Math.random())
            const enemySpeed = Math.round(enemyHealth / 2)

            const Mob = new Enemy(enemyHealth, enemyDamage, enemySpeed).setFieldMatrix(this.gameFieldMatrix)
            this.enemies.push(Mob)
            Hero.subscribe(Mob)
        }
        console.log("level enemies: ", this.enemies)
        this.Map.setGenerator(this.MapGenerator).init().render(this.container)
    }
}