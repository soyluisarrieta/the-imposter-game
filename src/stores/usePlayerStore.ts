import type { Player } from "@/types/Player";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PlayerStore {
  player: Player | null
  setPlayer: (player: Player) => void
  clearPlayer: () => void
}

export const usePlayerStore = create<PlayerStore>()(
  persist((set) => (
    {
      player: null,

      setPlayer: (player) => set({ player }),
      clearPlayer: () => set({ player: null })
    }
  ), { name: 'player-storage' })
)