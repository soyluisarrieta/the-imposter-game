import type { Room } from "@/types/room.types";

export const rooms: Room[] = [
  { 
    id: 1,
    name: "Sala de 'Luis'",
    isStarted: false,
    isPrivate: false,
    ownerId: 1,
    joindedPlayers: [
      { id: 1, color: 0 },
      { id: 2, color: 1 },
    ]
  },
  { 
    id: 2,
    name: "Sala de 'Jessy'",
    isStarted: true,
    isPrivate: false,
    ownerId: 1,
    joindedPlayers: [
      { id: 1, color: 0 },
      { id: 2, color: 1 },
      { id: 3, color: 2 },
    ]
  },
  { 
    id: 3,
    name: "Sala de 'Sebas'",
    isStarted: false,
    isPrivate: true,
    ownerId: 1,
    joindedPlayers: [
      { id: 1, color: 0 }
    ]
  },
]