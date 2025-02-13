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
      console.log('22222A user connected: ' + socket.id)

      // 當收到訊息時，將訊息廣播回所有用戶
      socket.on('message', async (data) => {
        try {
          const a = await strapi.service('api::message.message').create({
            data: {
              content: data,
            },
          })
          console.log({ abcdf: a })
        } catch (e) {
          console.log(e, 12313131213)
        }

        console.log('Message received:', data)
        io.emit('message', `Echo: ${data}`) // 廣播回傳訊息
      })

      // 監聽斷開連接事件
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id)
      })
    })

    // 儲存 io 實例，便於後續使用
    strapi.io = io
  },
}
