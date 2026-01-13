import { useEffect, useState } from 'react'
import { useCreateRoom } from '@/hooks/useCreateRoom'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CheckCircleIcon, LoaderIcon } from 'lucide-react'
import { usePlayerStore } from '@/stores/usePlayerStore'

export function RoomForm() {
  const [roomName, setRoomName] = useState('')
  const { player } = usePlayerStore()

  useEffect(() => {
    const defaultRoomName = player 
      ? `Sala de '${player.name}'` 
      : 'Mi sala'
    setRoomName(defaultRoomName)
  }, [])

  const {
    mutate: createRoom,
    isPending,
    reset,
    isError,
    isSuccess
  } = useCreateRoom()

  const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createRoom({ name: roomName }, {
      onError: () => {
        const input = document.getElementById('room-name')
        input?.focus()
      }
    })
  }

  return (
    <form onSubmit={handleCreateRoom}>
      <div className="mb-2">
        <input
          id="room-name"
          className={cn(
            "w-full pb-1 border-b text-2xl placeholder:text-foreground/50 focus:outline-none",
            isError && "border-destructive/70"
          )}
          placeholder={roomName}
          value={roomName}
          required
          onChange={(e) => {
            setRoomName(e.target.value)
            isError && reset()
          }}
        />

        <small
          className={cn(
            "h-8 text-destructive",
            !isError && "invisible"
          )}
        >
          El nombre de la sala ya existe o es inválido. Por favor, elige otro.
        </small>
      </div>

      <Button className='w-full' type="submit" disabled={isPending || isSuccess}>
        {
          !isPending && !isSuccess ? "Crear sala" : isSuccess
            ? <><CheckCircleIcon /> Sala creada</>
            : <><LoaderIcon className="animate-spin" /> Creando...</>
        }
      </Button>
    </form>
  )
}
