import { Server } from 'socket.io'

const roomsInfo = new Map<string, { roomName: string; roomDescription: string; userCount: number }>()

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

    // 儲存每個房間的歷史訊息
    const roomsMessages = new Map()

    io.on('connection', (socket) => {
      console.log('A user connected: ' + socket.id)

      // 用戶加入聊天室
      socket.on('join_room', ({ roomId, roomName, roomDescription }) => {
        // 讓用戶離開所有已加入的房間，避免錯亂
        const rooms = Array.from(socket.rooms)

        socket.join(roomId)

        // 發送房間歷史訊息
        const history = roomsMessages.get(roomId) || []
        socket.emit('history', { roomId, messages: history })

        // 如果房間不存在，新增房間資訊
        if (!roomsInfo.has(roomId)) {
          roomsInfo.set(roomId, { roomName, roomDescription, userCount: 0 })
        }

        // 更新房間人數
        const room = roomsInfo.get(roomId)
        if (room) {
          room.userCount = io.sockets.adapter.rooms.get(roomId)?.size || 0
        }

        // 廣播該聊天室內的人數
        io.to(roomId).emit('roomSize', room?.userCount || 0)

        // 更新聊天室列表並廣播給所有人
        broadcastRooms()
      })

      // 接收訊息並只廣播到該聊天室
      socket.on('message', ({ roomId, message, username }) => {
        // 儲存訊息至歷史紀錄
        if (!roomsMessages.has(roomId)) {
          roomsMessages.set(roomId, [])
        }
        const history = roomsMessages.get(roomId)
        history.push({ sender: username, message, socketId: socket.id })

        // 廣播訊息到該聊天室
        io.to(roomId).emit('message', { socketId: socket.id, message, sender: username })
      })

      // 當用戶斷線時，檢查房間是否仍然存在
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id)
        setTimeout(() => {
          // 更新所有房間人數
          roomsInfo.forEach((room, roomId) => {
            const userCount = io.sockets.adapter.rooms.get(roomId)?.size || 0
            if (userCount === 0) {
              roomsInfo.delete(roomId) // 如果房間沒人，則移除
            } else {
              room.userCount = userCount
            }
          })

          broadcastRooms()
        }, 1000) // 等待一秒後再廣播，以確保房間數據已更新
      })
    })

    // **廣播所有聊天室資訊**
    function broadcastRooms() {
      const rooms = Array.from(roomsInfo.entries()).map(([roomId, room]) => ({
        id: roomId,
        roomName: room.roomName,
        roomDescription: room.roomDescription,
        userCount: room.userCount,
      }))
      io.emit('room_list', rooms) // 廣播給所有連線的客戶端
    }

    strapi.io = io // 儲存 io 實例，便於後續使用
  },
}
