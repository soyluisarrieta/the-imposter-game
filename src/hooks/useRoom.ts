import { getRoomById } from '@/services/room.services'
import { useQuery } from '@tanstack/react-query'

export function useRoom(roomId: number) {
  const query = useQuery({
    queryKey: ['room', roomId],
    queryFn: () => getRoomById(roomId),
    enabled: !!roomId,
  })

  return query
}
