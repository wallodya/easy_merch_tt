import { Player } from "./player.js";

export class Enemy extends Player{
    constructor(health, damage, speed) {
        super(health, damage, speed)
    }
}