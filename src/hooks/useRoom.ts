import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import type { Room } from "@/types/room.types"
import { getRoomById } from "@/services/room.services"

export const useRoom = (roomId: number | null) => {
  const [room, setRoom] = useState<Room | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadRoom = useCallback(async () => {
    if (!roomId) return

    try {
      setIsLoading(true)
      const data = await getRoomById(roomId)
      setRoom(data)
    } catch (err) {
      console.error('Error fetching room:', err)
    } finally {
      setIsLoading(false)
    }
  }, [roomId])

  useEffect(() => {
    if (roomId == null) {
      setIsLoading(false)
      return
    }

    loadRoom()

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_players',
          filter: `room_id=eq.${roomId}`,
        },
        loadRoom
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomId}`,
        },
        loadRoom
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [loadRoom, roomId])

  return { room, isLoading }
}
