import { Player } from "./player.js";

export class Hero extends Player {
    constructor(){
        super(1000, 100, 500)
    }
}

const Gamer = new Hero()

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case ("ArrowUp"): {
            event.preventDefault()
            Gamer.up()
            break
        }
        case ("ArrowDown"): {
            event.preventDefault()
            Gamer.down()
            break
        }
        case ("ArrowLeft"): {
            event.preventDefault()
            Gamer.left()
            break
        }
        case ("ArrowRight"): {
            event.preventDefault()
            Gamer.right()
            break
        }
        case ("w"): {
            event.preventDefault()
            Gamer.up()
            break
        }
        case ("s"): {
            event.preventDefault()
            Gamer.down()
            break
        }
        case ("a"): {
            event.preventDefault()
            Gamer.left()
            break
        }
        case ("d"): {
            event.preventDefault()
            Gamer.right()
            break
        }
        case (" "): {
            event.preventDefault()
            Gamer.attack()
            break
        }
    }
})

export default Gamer
