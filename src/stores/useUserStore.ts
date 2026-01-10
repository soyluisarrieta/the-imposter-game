import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  username: string | null
  setUsername: (username: string) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      username: '',
      setUsername: (username) => set({username})
    }),

    { name: 'user-storage' }
  )
)