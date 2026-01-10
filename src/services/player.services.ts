import { supabase } from "@/lib/supabaseClient";
import type { Player } from "@/types/Player";

export const createPlayer = async (playerName: Player['name']) => {
  const { data, error } = await supabase
    .from('players')
    .insert({ name: playerName })
    .select()
    .single()

  if (error) throw error
  
  return data
}