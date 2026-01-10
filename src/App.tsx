import HomePage from "@/pages/HomePage.tsx"
import { Route, Routes } from "react-router"

export default function App() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}
