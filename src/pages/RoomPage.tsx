import { useRoom } from "@/hooks/useRoom"
import { LoaderIcon } from "lucide-react"
import { useParams } from "react-router"

const parseRoomId = (roomId: string | undefined) => {
  if (!roomId) return null
  const parsed = Number(roomId)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null
}

export default function RoomPage() {
  const { roomId } = useParams()
  const parsedRoomId = parseRoomId(roomId)

  const { data: room, isPending, isError } = useRoom(parsedRoomId)

  if (roomId && !parsedRoomId) {
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

  return (
    <main>
      room: {room.name}
    </main>
  )
}
