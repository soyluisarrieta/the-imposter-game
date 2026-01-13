import { createRoom } from '@/services/room.services'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export function useCreateRoom() {
  const { player } = usePlayerStore()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: ({ name }: { name: string }) => {
      if (!player) throw new Error('Player not available')
      return createRoom(player.id, { name, isPrivate: false })
    },

    onSuccess: (room) => {
      queryClient.setQueryData(['room', room.id], room)
      setTimeout(() => {
        navigate(`/sala/${room.id}`)
      }, 500);
    }
  })

  return mutation
}
