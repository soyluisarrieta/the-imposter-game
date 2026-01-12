import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabaseClient"
import { getRoomById } from "@/services/room.services"

export const useRoom = (roomId: number | null) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomById(roomId!),
    enabled: roomId != null,
  })

  useEffect(() => {
    if (!roomId) return

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
        () => {
          queryClient.invalidateQueries({
            queryKey: ['room', roomId],
          })
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ['room', roomId],
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId, queryClient])

  return query
}
