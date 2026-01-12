import { useMutation } from '@tanstack/react-query'
import { createPlayer } from '@/services/player.services'
import { usePlayerStore } from '@/stores/usePlayerStore'
import { useNavigate } from 'react-router'

export const usePlayer = () => {
  const { setPlayer } = usePlayerStore()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (name: string) => createPlayer(name),
    onSuccess: (player) => {
      setPlayer(player)
      navigate('/', { replace: true })
    }
  })

  return mutation
}
