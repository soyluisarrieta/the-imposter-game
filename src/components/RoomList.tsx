import { InboxIcon, LoaderIcon } from "lucide-react"
import RoomCard from "./RoomCard"
import { useRooms } from "@/hooks/useRooms"

export default function RoomList() {
  const { data: rooms, isPending } = useRooms()

  if (isPending) {
    return (
      <div className="p-10 text-xl text-muted-foreground flex flex-col justify-center items-center">
        <LoaderIcon className="size-16 animate-spin" strokeWidth={0.5} />
      </div>
    )
  }

  if (!rooms?.length) return (
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
