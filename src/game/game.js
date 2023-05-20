function Game(containerId) {
    this.container = containerId;
    this.Level = new Level(this.container, LevelMap, MapGenerator);
}
Game.prototype.init = function() {
    this.Level.init();
}