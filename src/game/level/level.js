class Level {
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
        Gamer.setFieldMatrix(this.gameFieldMatrix)
        for (let i = 0; i < this.enemiesAmount; i++) {
            const enemyHealth = Math.round(200 + 400 * Math.random())
            const enemyDamage = Math.round( 50 + 100 * Math.random())
            const enemySpeed = Math.round((enemyHealth + enemyDamage) / 2 + 150)

            const Mob = new Enemy(enemyHealth, enemyDamage, enemySpeed).setFieldMatrix(this.gameFieldMatrix)
            this.enemies.push(Mob)
            Gamer.subscribe(Mob)
        }
        this.Map.setGenerator(this.MapGenerator).init().render(this.container)
    }
}