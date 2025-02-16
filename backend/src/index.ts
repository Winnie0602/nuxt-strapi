import { Server } from 'socket.io'

// 聊天室列表
const roomsInfo = new Map<string, { roomName: string; roomDescription: string; userCount: number }>()

// 每個房間的歷史訊息
const roomsMessages = new Map<
  string,
  { sender: string; message: string; socketId: string; translatedMessage?: string; targetLang: string }[]
>()

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

        // 更新聊天室列表並廣播給所有人
        broadcastRooms()
      })

      // 接收訊息並廣播到該聊天室
      socket.on('message', async ({ roomId, message, username, sourceLang, targetLang }) => {
        // 呼叫 Google Translate API 進行翻譯
        const translatedMessage = await translateMessage(message, sourceLang, targetLang)

        // 儲存訊息至歷史紀錄
        await saveMessageToHistory(roomId, message, username, socket.id, translatedMessage, targetLang)

        // 廣播訊息到該聊天室
        broadcastMessage(roomId, message, username, socket.id, translatedMessage, targetLang)
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

    // **儲存訊息至歷史紀錄**
    async function saveMessageToHistory(
      roomId: string,
      message: string,
      username: string,
      socketId: string,
      translatedMessage: string,
      targetLang: string
    ) {
      // 記錄原始訊息
      if (!roomsMessages.has(roomId)) {
        roomsMessages.set(roomId, [])
      }
      const history = roomsMessages.get(roomId)

      history.push({ sender: username, message, socketId, translatedMessage, targetLang })
    }

    // **廣播訊息到該聊天室**
    function broadcastMessage(
      roomId: string,
      message: string,
      username: string,
      socketId: string,
      translatedMessage: string,
      targetLang: string
    ) {
      io.to(roomId).emit('message', { socketId, message, sender: username, translatedMessage, targetLang })
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

    // **Google Translate API 返回資料的型別**
    interface TranslateResponse {
      data: {
        translations: Array<{
          translatedText: string
        }>
      }
    }

    // **使用 Google Translate API 進行翻譯**
    async function translateMessage(message: string, sourceLang: string, targetLang: string): Promise<string> {
      const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: message,
          source: sourceLang,
          target: targetLang,
        }),
      })

      // 檢查 API 請求是否成功
      if (!response.ok) {
        return message // 若翻譯失敗，返回原訊息
      }

      const data = (await response.json()) as TranslateResponse
      // 解碼返回的翻譯結果，移除HTML實體符號
      const translatedText = data.data?.translations?.[0]?.translatedText || message
      return translatedText.replace(/&#39;/g, "'") // 手動處理常見的實體符號
    }

    strapi.io = io // 儲存 io 實例，便於後續使用
  },
}
