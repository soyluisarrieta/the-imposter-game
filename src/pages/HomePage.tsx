import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  
  return (
    <div className="min-h-dvh p-12 text-center flex flex-col">
      <div>
        <h1 className="text-3xl font-medium mb-2">¿Cómo te llamas?</h1>
        <p className="text-muted-foreground text-sm">Este es el nombre que aparecerá en el juego</p>
      </div>
      <div className="grow flex items-center justify-center">
        <input 
          className="w-full border-b text-4xl placeholder:text-foreground/50 focus:outline-none text-center font-bold"
          name="username"
          placeholder="Tu nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </div>
      
      <Button 
        disabled={!username}
        onClick={() => navigate('/game')}
      >
        Continuar
      </Button>
    </div>
  )
}
