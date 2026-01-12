import { useEffect, useState, useCallback } from 'react'
import { getRooms } from '@/services/room.services'
import { supabase } from '@/lib/supabaseClient'
import type { Room } from '@/types/room.types'

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadRooms = useCallback(async () => {
    try {
      const data = await getRooms()
      setRooms(data)
    } catch (err) {
      console.error('Error fetching rooms:', err)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      await loadRooms()
      setIsLoading(false)
    }

    init()

    const channel = supabase
      .channel('rooms-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'rooms' },
        loadRooms
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'room_players' },
        loadRooms
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [loadRooms])

  return { rooms, isLoading }
}
