import type { Room } from "@/types/room.types"
import { Clock3Icon, Gamepad2Icon } from "lucide-react"
import { Link } from "react-router"

interface Props {
    room: Room
}

export default function RoomCard({ room }: Props) {
  return (
    <Link to={`/sala/${room.id}`}>
      <div className="bg-card p-2 border rounded cursor-pointer hover:scale-[1.03] transition-transform">
        <small className="text-muted-foreground">Sala #{room.id}</small>
        <h2 className="line-clamp-1 font-medium mb-2">{room.name}</h2>
        <div className="text-xs text-muted-foreground flex justify-between border-t pt-1.5">
          <span className="flex items-center gap-1">
            {
              room.isStarted 
                ? <><Gamepad2Icon className="inline-block size-3.5 text-blue-400 animate-pulse" /> En curso</>
                : <><Clock3Icon className="inline-block size-3.5 text-green-400" /> En espera</>
              }
          </span>
          <span>
            {room.joindedPlayers.length} jugador{room.joindedPlayers.length !== 1 ? 'es' : ''}
          </span>
        </div>
      </div>
    </Link>
  )
}
