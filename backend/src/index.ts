import { Server } from 'socket.io'

export default {
  register() {
    console.log('WebSocket register function is running...')
  },

  bootstrap({ strapi }: { strapi: any }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: '*', // 允許所有來源的請求
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      console.log('A user connected: ' + socket.id)

      // 用戶加入指定聊天室
      socket.on('join_room', (roomId) => {
        socket.join(roomId)
        const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0

        console.log(io.sockets.adapter.rooms.get(roomId)?.size, 'io.sockets.adapter.rooms.get(roomId)?.size')
        console.log(`User ${socket.id} joined room: ${roomId}`)

        // 廣播房間人數給該房間的所有人
        io.to(roomId).emit('roomSize', roomSize)
      })

      // 接收訊息並只廣播到該聊天室
      socket.on('message', ({ roomId, message, username }) => {
        console.log(`Message from ${socket.id} in room ${roomId}: ${message}`)
        io.to(roomId).emit('message', { socketId: socket.id, message, sender: username })
      })

      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id)
      })
    })

    strapi.io = io // 儲存 io 實例，便於後續使用
  },
}
