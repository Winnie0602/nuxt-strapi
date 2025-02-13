import { Server } from 'socket.io'

export default {
  register() {
    console.log('WebSocket register function is running...')
  },

  bootstrap({ strapi }: { strapi: any }) {
    console.log('1111111WebSocket server is starting...')

    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: '*', // 允許所有來源的請求
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      console.log('User connected:', socket.id)

      // 加入指定聊天室
      socket.on('join_room', (roomId) => {
        socket.join(roomId)
        console.log(`User joined room: ${roomId}`)
      })

      // 接收並廣播訊息
      socket.on('send_message', async ({ roomId, message, sender }) => {
        console.log('yes', { roomId, message, sender })
        io.to(roomId).emit('receive_message', { sender, message })
      })

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
      })
    })
  },
}
