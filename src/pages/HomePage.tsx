import { Button } from "@/components/ui/button"
import PlayerForm from "@/components/PlayerForm"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { InboxIcon, PlusIcon, SettingsIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { getOnlineCount } from "@/services/player.services"

export default function HomePage() {
  const [onlineCount, setOnlineCount] = useState<number | null>()

  const { player, clearPlayer } = usePlayerStore()

  useEffect(() => {
    let isMounted = true
    
    const fetchOnlinePlayers = async () => {
      try {
        const count = await getOnlineCount()
        if (isMounted) setOnlineCount(count)
      } catch (err) {
        console.error('Error retrieving online players:', err)
      }
    }

    fetchOnlinePlayers()

    return () => {
      isMounted = false
    }
  }, [])

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

      <div className="w-full fixed bottom-0 p-4 flex justify-between items-center">
        <p>{onlineCount && `En linea: ${onlineCount}`}</p>
        <Button variant='outline' size='sm'>
          <PlusIcon />
          Crear sala
        </Button>
      </div>
    </>
  )
}
