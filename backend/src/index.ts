import { Server } from 'socket.io'

// 聊天室列表
const roomsInfo = new Map<string, { roomName: string; roomDescription: string; userCount: number }>()

// 每個房間的歷史訊息
const roomsMessages = new Map<string, { sender: string; message: string; socketId: string }[]>()

export default {
  bootstrap({ strapi }: { strapi: any }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: '*', // 允許所有來源的請求
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      // 用戶加入聊天室
      socket.on('join_room', ({ roomId, roomName, roomDescription }) => {
        socket.join(roomId)

        // 發送房間歷史訊息
        sendRoomHistory(socket, roomId)

        // 更新房間資訊或初始化
        handleRoomInfo(roomId, roomName, roomDescription)

        // 廣播房間人數
        broadcastRoomSize(roomId)

        // 更新聊天室列表並廣播給所有人
        broadcastRooms()
      })

      // 接收訊息並廣播到該聊天室
      socket.on('message', ({ roomId, message, username }) => {
        // 儲存訊息至歷史紀錄
        saveMessageToHistory(roomId, message, username, socket.id)

        // 廣播訊息到該聊天室
        broadcastMessage(roomId, message, username, socket.id)
      })

      // 當用戶斷線時，更新房間資訊並清理
      socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id)
        setTimeout(() => {
          // 清理無人房間
          cleanupEmptyRooms()

          broadcastRooms()
        }, 1000)
      })
    })

    // **發送房間歷史訊息**
    function sendRoomHistory(socket: any, roomId: string) {
      const history = roomsMessages.get(roomId) || []
      socket.emit('history', { roomId, messages: history })
    }

    // **處理房間資訊**
    function handleRoomInfo(roomId: string, roomName: string, roomDescription: string) {
      if (!roomsInfo.has(roomId)) {
        roomsInfo.set(roomId, { roomName, roomDescription, userCount: 0 })
      }

      // 更新房間人數
      const room = roomsInfo.get(roomId)
      if (room) {
        room.userCount = io.sockets.adapter.rooms.get(roomId)?.size || 0
      }
    }

    // **廣播房間人數**
    function broadcastRoomSize(roomId: string) {
      const room = roomsInfo.get(roomId)
      io.to(roomId).emit('roomSize', room?.userCount || 0)
    }

    // **儲存訊息至歷史紀錄**
    function saveMessageToHistory(roomId: string, message: string, username: string, socketId: string) {
      if (!roomsMessages.has(roomId)) {
        roomsMessages.set(roomId, [])
      }
      const history = roomsMessages.get(roomId)
      history.push({ sender: username, message, socketId })
    }

    // **廣播訊息到該聊天室**
    function broadcastMessage(roomId: string, message: string, username: string, socketId: string) {
      io.to(roomId).emit('message', { socketId, message, sender: username })
    }

    // **清理無人房間**
    function cleanupEmptyRooms() {
      roomsInfo.forEach((room, roomId) => {
        const userCount = io.sockets.adapter.rooms.get(roomId)?.size || 0
        if (userCount === 0) {
          roomsInfo.delete(roomId) // 如果房間沒人，則移除
        } else {
          room.userCount = userCount
        }
      })
    }

    // **廣播所有聊天室資訊**
    function broadcastRooms() {
      const rooms = Array.from(roomsInfo.entries()).map(([roomId, room]) => ({
        roomId,
        roomName: room.roomName,
        roomDescription: room.roomDescription,
        userCount: room.userCount,
      }))
      io.emit('room_list', rooms) // 廣播給所有連線的客戶端
    }

    strapi.io = io // 儲存 io 實例，便於後續使用
  },
}
