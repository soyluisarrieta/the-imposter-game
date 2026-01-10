import { supabase } from "@/lib/supabaseClient";
import type { Player } from "@/types/Player";

export const getOnlineCount = async () => {
  const { count, error } = await supabase
    .from('players')
    .select('id', { count: 'exact', head: true })
    .eq('is_online', true)

  if (error) throw error
  return count
}

export const createPlayer = async (playerName: Player['name']) => {
  const { data, error } = await supabase
    .from('players')
    .insert({ name: playerName })
    .select()
    .single()

  if (error) throw error
  return data
}