import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createPlayer } from "@/services/player.services"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Loader } from "lucide-react"
import { useState } from "react"

export default function PlayerForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { setPlayer } = usePlayerStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const playerName = formData.get("player-name")?.toString().trim()
    if (!playerName) return

    try {
      setIsLoading(true)
      setError(null)
      const player = await createPlayer(playerName)
      setPlayer(player)
    } catch (err) {
      console.error('Error creating player:', err)
      setError('Hubo un error al crear el jugador')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      className="min-h-dvh p-12 text-center flex flex-col"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-medium mb-2">¿Cómo te llamas?</h1>
      <p className="text-muted-foreground text-sm">Este es el nombre que aparecerá en el juego</p>
      <div className="grow flex flex-col items-center justify-center">
        <input
          className={cn(
            "w-full pb-1 border-b text-4xl placeholder:text-foreground/50 focus:outline-none text-center font-bold",
            error && "border-destructive/70"
          )}
          name="player-name"
          placeholder="Tu nombre"
          onChange={() => error && setError(null)}
          autoFocus
          required
        />
      <small className={cn("h-8 mt-2 text-destructive", !error && "invisible")}>{error}</small>
      </div>

      <Button type="submit" disabled={isLoading}>
        {!isLoading ? "Continuar" : <><Loader className="animate-spin" /> Guardando...</>}
      </Button>
    </form>
  )
}
