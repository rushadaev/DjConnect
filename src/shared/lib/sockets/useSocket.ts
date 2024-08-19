import { ref } from 'vue'
import { socket } from '@/app/plugins/socket'

export function useSocket(eventName: string) {
  const data = ref<any>(null)

  const handleEvent = (payload: any) => {
    data.value = payload
  }

  socket.on(eventName, handleEvent)

  const unmount = () => {
    socket.off(eventName, handleEvent)
  }

  return { data, unmount }
}