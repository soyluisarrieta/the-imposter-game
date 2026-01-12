import { useRoom } from "@/hooks/useRoom"
import { LoaderIcon } from "lucide-react"
import { useParams } from "react-router"

export default function RoomPage() {
  const { roomId } = useParams()
  
  const parsedRoomId = roomId ? Number(roomId) : null
  const { room, isLoading } = useRoom(parsedRoomId)

  if (isLoading) {
    return (
      <div className="p-10 text-xl text-muted-foreground flex flex-col justify-center items-center">
        <LoaderIcon className="size-16 animate-spin" strokeWidth={0.5} />
      </div>
    )
  }
  
  if (!room) {
    return <div>Sala no disponible.</div>
  }
  
  return (
    <main>
      room: {room.name}
    </main>
  )
}
