import { Tile } from "./tile.js";

export class Wall extends  Tile {
    constructor(container) {
        super(false, "tileW", container)
    }
}