import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"
import { usePlayer } from "@/hooks/usePlayer"

export default function PlayerPage() {
  const {
    mutate: createPlayer,
    isPending,
    error,
    reset
  } = usePlayer()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('player-name')?.toString().trim()
    if (!name) return
    createPlayer(name)
  }

  return (
    <form
      className="min-h-dvh p-12 text-center flex flex-col"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-medium mb-2">¿Cómo te llamas?</h1>
      <p className="text-muted-foreground text-sm">
        Este es el nombre que aparecerá en el juego
      </p>
      <div className="grow flex flex-col items-center justify-center">
        <input
          className={cn(
            "w-full pb-1 border-b text-4xl placeholder:text-foreground/50 focus:outline-none text-center font-bold",
            error && "border-destructive/70"
          )}
          name="player-name"
          placeholder="Tu nombre"
          onChange={reset}
          autoFocus
          required
        />

        <small className={cn("h-8 mt-2 text-destructive", !error && "invisible")}>
          Hubo un error al crear el jugador
        </small>
      </div>

      <Button type="submit" disabled={isPending}>
        {!isPending ? "Continuar" : <><Loader className="animate-spin" /> Guardando...</>}
      </Button>
    </form>
  )
}
