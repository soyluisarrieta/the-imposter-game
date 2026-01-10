import { Button } from "@/components/ui/button"
import { usePlayerStore } from "@/stores/usePlayerStore"

export default function PlayerForm() {
  const { setPlayer } = usePlayerStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const playerName = formData.get("player-name")?.toString().trim()
    if (!playerName) return

    setPlayer({
      id: 0,
      name: playerName
    })
  }
  
  return (
    <form
      className="min-h-dvh p-12 text-center flex flex-col"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-medium mb-2">¿Cómo te llamas?</h1>
      <p className="text-muted-foreground text-sm">Este es el nombre que aparecerá en el juego</p>
      <div className="grow flex items-center justify-center">
        <input
          className="w-full border-b text-4xl placeholder:text-foreground/50 focus:outline-none text-center font-bold"
          name="player-name"
          placeholder="Tu nombre"
          autoFocus
          required
        />
      </div>

      <Button type="submit">
        Continuar
      </Button>
    </form>
  )
}
