import type { Player } from "./player.types";

export interface Room {
    id: number
    name: string
    isStarted: boolean
    password?: string
    ownerId: Player["id"]
    joindedPlayers: Array<Player & { color: number }>
}