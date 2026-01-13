import { useRoom } from "@/hooks/useRoom"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { LoaderIcon } from "lucide-react"
import { useParams } from "react-router"

export default function RoomPage() {
  const { player } = usePlayerStore()
  const params = useParams()
  const roomId = Number(params.roomId)

  const { 
    data: room,
    isPending,
    isError
  } = useRoom(roomId)

  if (!roomId) {
    return <div>Sala no disponible.</div>
  }
  
  if (isPending) {
    return (
      <div className="p-10 text-xl text-muted-foreground flex flex-col justify-center items-center">
        <LoaderIcon className="size-16 animate-spin" strokeWidth={0.5} />
      </div>
    )
  }

  if (isError || !room) {
    return <div>Sala no disponible.</div>
  }

  console.log(room);

  return (
    <main>
      <div>room: {room.name}</div>
      <h1 className="flex items-center gap-1.5">
        <span className="size-4 rounded-full" /* style={{backgroundColor: hexColor}} */ />
        <span>{player?.name}</span>
      </h1>
      <div >
        {/* Jugadores: {room.joindedPlayers.length} */}
      </div>
      {/* {JSON.stringify(players)} */}
    </main>
  )
}
