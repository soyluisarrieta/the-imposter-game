import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'
import type { Player } from '@/types/player.types'

const ONLINE_PLAYERS_KEY = ['onlinePlayers']

export function useOnlinePlayers(player: Player | null) {
  const queryClient = useQueryClient()

  const { data = 0 } = useQuery({
    queryKey: ONLINE_PLAYERS_KEY,
    queryFn: () => 0,
    enabled: false
  })

  useEffect(() => {
    if (!player) {
      queryClient.setQueryData(ONLINE_PLAYERS_KEY, 0)
      return
    }

    const channel = supabase.channel('online-players', {
      config: {
        presence: { key: player.id.toString() }
      }
    })

    const updateCount = () => {
      const state = channel.presenceState()
      const onlineCount = Object
        .keys(state)
        .filter(key => key !== player.id.toString())
        .length
      
      queryClient.setQueryData(
        ONLINE_PLAYERS_KEY,
        onlineCount + 1 // +1 to include self
      )
    }

    channel.on('presence', { event: 'sync' }, updateCount)

    channel.subscribe(status => {
      if (status === 'SUBSCRIBED') {
        channel.track({ name: player.name })
      }
    })

    return () => {
      supabase.removeChannel(channel)
      queryClient.setQueryData(ONLINE_PLAYERS_KEY, 0)
    }
  }, [player, queryClient])

  return data
}
