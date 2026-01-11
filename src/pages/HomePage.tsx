import { Button } from "@/components/ui/button"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Loader2Icon, PlusIcon, SettingsIcon } from "lucide-react"
import { useOnlinePlayers } from "@/hooks/useOnlinePlayers"
import { disconnectPlayer } from "@/services/player.services"
import { Navigate } from "react-router"
import RoomList from "@/components/RoomList"

export default function HomePage() {
  const { player, clearPlayer } = usePlayerStore()
  const onlinePlayers = useOnlinePlayers(player)

  if (!player) return (
    <Navigate to="/jugador" replace />
  )

  const handleDisconnect = async () => {
    clearPlayer()
    await disconnectPlayer(player.id)
  }

  return (
    <>
      <header className="p-4 flex justify-between">
        <p className="text-3xl">
          Hola {player.name}
        </p>
        <Button variant='ghost' size='icon-lg' onClick={handleDisconnect}>
          <SettingsIcon className="size-6" />
        </Button>
      </header>

      <main className="p-4">
        <RoomList />
      </main>

      <div className="w-full max-w-xl mx-auto fixed bottom-0 left-1/2 -translate-x-1/2 p-4 flex justify-between items-center bg-linear-to-t from-background via-background/70 via-60% to-background/0">
        <p>
          En linea: {
            onlinePlayers 
              ? onlinePlayers 
              : <Loader2Icon className="size-4 inline-block animate-spin text-muted-foreground -ml-1 mb-1" />
          }
        </p>
        <Button variant='outline' size='sm'>
          <PlusIcon />
          Crear sala
        </Button>
      </div>
    </>
  )
}
