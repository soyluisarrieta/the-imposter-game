import { Button } from "@/components/ui/button"
import { useUserStore } from "@/stores/useUserStore"

export default function HomePage() {
  const { setUsername } = useUserStore()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const username = formData.get("username")?.toString().trim()
    if (!username) return

    setUsername(username)
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
          name="username"
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
