import { Button } from "@/components/ui/button"
import UserForm from "@/components/UserForm"
import { useUserStore } from "@/stores/useUserStore"
import { InboxIcon, PlusIcon, SettingsIcon } from "lucide-react"

export default function HomePage() {
  const { username, setUsername } = useUserStore()

  if (!username) return <UserForm />

  return (
    <>
      <header className="p-4 flex justify-between">
        <p className="text-3xl">
          Hola {username}
        </p>
        <Button variant='ghost' size='icon-lg' onClick={() => setUsername('')}>
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
