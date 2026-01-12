import type { Player } from "./player.types";

type JoindedPlayer = {
    id: Player["id"],
    color: number
}

export interface Room {
    id: number
    name: string
    isStarted: boolean
    isPrivate: boolean
    ownerId: Player["id"]
    joindedPlayers: JoindedPlayer[]
}