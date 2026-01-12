import { useEffect } from 'react'
import { getRooms } from '@/services/room.services'
import { supabase } from '@/lib/supabaseClient'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const ROOMS_QUERY_KEY = ['rooms']

export const useRooms = () => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ROOMS_QUERY_KEY,
    queryFn: getRooms,
    staleTime: 0
  })

  useEffect(() => {
    const channel = supabase
      .channel('rooms-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms' },
        () => queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY })
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_players' },
        () => queryClient.invalidateQueries({ queryKey: ROOMS_QUERY_KEY })
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [queryClient])

  return query
}
