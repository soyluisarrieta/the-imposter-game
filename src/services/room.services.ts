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
    .maybeSingle()

  if (error) throw error
  if (!data) return null
  
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

interface CreateRoomParams {
  name: string
  isPrivate: boolean
  password?: string | null
}

export async function createRoom(
  playerId: number,
  params: CreateRoomParams
) {
  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .insert({
      name: params.name,
      owner_id: playerId,
      is_private: params.isPrivate,
      password: params.isPrivate ? params.password : null,
      is_started: false
    })
    .select()
    .single()

  if (roomError) throw roomError

  const { error: roomPlayerError } = await supabase
    .from('room_players')
    .insert({
      room_id: room.id,
      player_id: playerId,
      color: 0
    })

  if (roomPlayerError) throw roomPlayerError

  const createdRoom: Room = {
    id: room.id,
    name: room.name,
    isStarted: room.is_started,
    isPrivate: room.is_private,
    ownerId: room.owner_id,
    joindedPlayers: [{
      id: playerId,
      color: 0
    }]
  }

  return createdRoom
}
