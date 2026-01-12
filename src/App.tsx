import HomePage from "@/pages/HomePage.tsx"
import { Route, Routes, Navigate, Link } from "react-router"
import PlayerPage from "./pages/PlayerPage"
import RoomPage from "./pages/RoomPage"
import { Button } from "./components/ui/button"

export default function App() {
  return (
    <div className="min-h-dvh max-w-xl relative mx-auto bg-background text-foreground">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jugador" element={<PlayerPage />} />
        
        <Route path="/sala/:roomId" element={<RoomPage />} />
        <Route path="/sala" element={<Navigate to="/" replace />} />

        <Route path="*" element={
          <div className="px-4 py-10 text-center">
            <h1 className="text-3xl font-medium">404 - Página no encontrada</h1>
            <p className="text-muted-foreground mb-6">La página que estás buscando no existe.</p>
            <Link to="/">
              <Button>Ir a Inicio</Button>
            </Link>
          </div>
        } />
      </Routes>
    </div>
  )
}
