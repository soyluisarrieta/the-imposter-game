import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Player } from '@/types/player.types'

export function useOnlinePlayers(player: Player | null) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!player) {
      setCount(0)
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

      setCount(onlineCount + 1) // +1 to include self
    }

    channel.on('presence', { event: 'sync' }, updateCount)

    channel.subscribe(status => {
      if (status === 'SUBSCRIBED') {
        channel.track({ name: player.name })
      }
    })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [player])

  return count
}
