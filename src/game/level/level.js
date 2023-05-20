function Level(container, LevelMap, MapGenerator) {
        this.container = container
        this.height = 24
        this.length = 40
        this.swordsAmount = 2
        this.potionsAmount = 10
        this.enemiesAmount = 5
        // this.enemiesAmount = 10
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

Level.prototype.init = function() {
    Gamer.setFieldMatrix(this.gameFieldMatrix)
    for (var i = 0; i < this.enemiesAmount; i++) {
        var enemyHealth = Math.round(200 + 400 * Math.random());
        var enemyDamage = Math.round( 50 + 100 * Math.random());
        var enemySpeed = Math.round((enemyHealth + enemyDamage) / 2 + 150);

        var Mob = new Enemy(enemyHealth, enemyDamage, enemySpeed);
        Mob.setFieldMatrix(this.gameFieldMatrix);
        this.enemies.push(Mob);
        Gamer.subscribe(Mob);
    }
    this.Map.setGenerator(this.MapGenerator).init().render(this.container)
}