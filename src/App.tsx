import HomePage from "@/pages/HomePage.tsx"
import { Route, Routes } from "react-router"
import PlayerPage from "./pages/PlayerPage"

export default function App() {
  return (
    <div className="min-h-dvh max-w-xl relative mx-auto bg-background text-foreground">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jugador" element={<PlayerPage />} />
      </Routes>
    </div>
  )
}
