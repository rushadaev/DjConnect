import { App } from 'vue'
import { io, Socket } from 'socket.io-client'

// Create the Socket.IO client instance
const socket: Socket = io('https://dj-connect.xyz', {
  path: '/socket.io/', // Path must match your NGINX proxy settings
  transports: ['websocket', 'polling'], // Ensure WebSocket and polling are enabled
})

export default {
  install: (app: App) => {
    app.config.globalProperties.$socket = socket

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server')
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server')
    })
    socket.onAny((eventName, ...args) => {
        console.log(`Received event: ${eventName}`, args)
    })

  },
}

export { socket } // Export the socket instance directly