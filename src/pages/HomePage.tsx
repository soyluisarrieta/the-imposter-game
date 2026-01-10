import { Button } from "@/components/ui/button"
import PlayerForm from "@/components/PlayerForm"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { InboxIcon, PlusIcon, SettingsIcon } from "lucide-react"

export default function HomePage() {
  const { player, clearPlayer } = usePlayerStore()

  if (!player) return <PlayerForm />

  return (
    <>
      <header className="p-4 flex justify-between">
        <p className="text-3xl">
          Hola {player.name}
        </p>
        <Button variant='ghost' size='icon-lg' onClick={() => clearPlayer()}>
          <SettingsIcon className="size-6" />
        </Button>
      </header>
      
      <main className="p-4">
        <div className="p-10 text-xl text-muted flex flex-col justify-center items-center">
          <InboxIcon className="size-16" strokeWidth={0.6} />
          <p className="max-w-60 text-center">No hay ninguna sala disponible</p>
        </div>
      </main>

      <div className="fixed bottom-0 right-0 p-4">
        <Button>
          <PlusIcon />
          Crear sala
        </Button>
      </div>
    </>
  )
}
