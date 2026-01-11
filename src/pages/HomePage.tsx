import { Button } from "@/components/ui/button"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { InboxIcon, Loader2Icon, PlusIcon, SettingsIcon } from "lucide-react"
import { useOnlinePlayers } from "@/hooks/useOnlinePlayers"
import { disconnectPlayer } from "@/services/player.services"
import { Navigate } from "react-router"

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
        <div className="p-10 text-xl text-muted flex flex-col justify-center items-center">
          <InboxIcon className="size-16" strokeWidth={0.6} />
          <p className="max-w-60 text-center">No hay ninguna sala disponible</p>
        </div>
      </main>

      <div className="w-full fixed bottom-0 p-4 flex justify-between items-center">
        <p>En linea: {onlinePlayers ? onlinePlayers : <Loader2Icon className="size-4 inline-block animate-spin text-muted-foreground -ml-1 mb-1" />}</p>
        <Button variant='outline' size='sm'>
          <PlusIcon />
          Crear sala
        </Button>
      </div>
    </>
  )
}
