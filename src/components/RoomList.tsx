import type { Room } from "@/types/Room"
import { InboxIcon } from "lucide-react"
import RoomCard from "./RoomCard"

const rooms: Room[] = [
  { 
    id: 1,
    name: "Sala de 'Luis'",
    
    isStarted: false,
    ownerId: 1,

    joindedPlayers: [
      { id: 1, name: "Jugador 1", color: 0 },
      { id: 2, name: "Jugador 2", color: 1 },
    ]
  },
  { 
    id: 2,
    name: "Sala de 'Jessy'",
    
    isStarted: true,
    ownerId: 1,

    joindedPlayers: [
      { id: 1, name: "Jugador 1", color: 0 },
      { id: 2, name: "Jugador 2", color: 1 },
      { id: 3, name: "Jugador 3", color: 2 },
    ]
  },
  { 
    id: 3,
    name: "Sala de 'Sebas'",
    
    isStarted: false,
    password: '12345',
    ownerId: 1,

    joindedPlayers: [
      { id: 1, name: "Jugador 1", color: 0 }
    ]
  },
]

export default function RoomList() {

  if (!rooms) return (
    <div className="p-10 text-xl text-muted flex flex-col justify-center items-center">
      <InboxIcon className="size-16" strokeWidth={0.6} />
      <p className="max-w-60 text-center">No hay ninguna sala disponible</p>
    </div>
  )
  
  return (
    <div className="grid grid-cols-2 gap-2">
      {rooms.map(room => <RoomCard key={room.id} room={room} />)}
    </div>
  )
}
