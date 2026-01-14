import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'
import { usePlayerStore } from '@/stores/usePlayerStore'
import type { Player } from '@/types/player.types'

const ROOM_PRESENCE_KEY = (roomId: number) => ['roomPresence', roomId]

export function useRoomPresence(roomId: number) {
  const { player } = usePlayerStore()
  const queryClient = useQueryClient()

  const { data = [] } = useQuery<Player[]>({
    queryKey: ROOM_PRESENCE_KEY(roomId),
    queryFn: () => [],
    enabled: false
  })

  useEffect(() => {
    if (!player || !roomId) return

    const channel = supabase.channel(`room-presence-${roomId}`, {
      config: {
        presence: {
          key: player.id.toString()
        }
      }
    })

    const syncPresence = () => {
      const state = channel.presenceState<Player>()
      const players: Player[] = []

      Object.entries(state).forEach(([key, presences]) => {
        if (!(presences.length > 0)) return

        const playerId = parseInt(key)
        const presence = presences[0]

        players.push({
          id: playerId,
          name: presence.name
        })
      })

      queryClient.setQueryData(
        ROOM_PRESENCE_KEY(roomId),
        players
      )
    }

    channel.on('presence', { event: 'sync' }, syncPresence)

    channel.subscribe(status => {
      if (status === 'SUBSCRIBED') {
        channel.track({ 
          id: player.id,
          name: player.name
        })
      }
    })

    return () => {
      supabase.removeChannel(channel)
      queryClient.removeQueries({
        queryKey: ROOM_PRESENCE_KEY(roomId)
      })
    }
  }, [player, roomId, queryClient])

  return data
}
