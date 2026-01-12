import { supabase } from "@/lib/supabaseClient"
import type { Room } from "@/types/room.types"

export const getRooms = async () => {
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      id,
      is_started,
      name,
      owner_id,
      is_private,
      room_players(player_id, color)
    `)

  if (error) throw error

  const rooms: Room[] = data.map(({ room_players, ...room }) => ({
    id: room.id,
    name: room.name,
    isStarted: room.is_started,
    isPrivate: room.is_private,
    ownerId: room.owner_id,
    joindedPlayers: room_players.map(({ player_id, color }) => ({
      id: player_id,
      color
    }))
  }))

  return rooms
}

export const getRoomById = async (roomId: number) => {
  const { data, error } = await supabase
    .from('rooms')
    .select(`
      id,
      is_started,
      name,
      owner_id,
      is_private,
      room_players(player_id, color)
    `)
    .eq('id', roomId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null // No rows found
    throw error
  }
  
  const room: Room = {
    id: data.id,
    name: data.name,
    isStarted: data.is_started,
    isPrivate: data.is_private,
    ownerId: data.owner_id,
    joindedPlayers: data.room_players.map(({ player_id, color }) => ({
      id: player_id,
      color
    }))
  }
  
  return room
}