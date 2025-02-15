<script lang="ts" setup>
import { io } from 'socket.io-client'

definePageMeta({
  layout: 'full-screen',
})

type RoomInfo = {
  roomId: string
  roomName: string
  roomDescription: string
  roomPassword?: string
  userCount: number
}

type Message = { message: string; sender: string; socketId: string }

const { data: auth, status } = useAuth()

const chatContainer = ref<HTMLElement | null>(null) // 指向聊天視窗容器

const username =
  status.value === 'unauthenticated' ? 'passer' : auth.value?.user.username

const socket = io('http://localhost:1337') // 替換為你的後端 URL

const nowRoomInfo = ref<RoomInfo>()

const inputMessage = ref('') // input訊息框框
const messages = ref<{ [roomId: string]: Message[] }>({})
const userCount = ref(0) // socket room人數

let socketId = '' // 該視窗socket ID

const roomsList = ref<RoomInfo[]>([])

// 監聽房間人數變化
socket.on('roomSize', (size: number) => {
  userCount.value = size
})

// 發送訊息給socket server
const submitMessage = () => {
  if (inputMessage.value.trim()) {
    socket.emit('message', {
      roomId: nowRoomInfo.value?.roomId,
      message: inputMessage.value,
      username,
    })
  }

  inputMessage.value = ''
}

// 滾動到底部功能
const scrollToBottom = async () => {
  await nextTick() // 確保 DOM 更新後再滾動
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(nowRoomInfo, () => {
  // 清空當前聊天室訊息
  if (nowRoomInfo.value?.roomId) {
    // 發送加入聊天室的請求，後端會回傳歷史訊息
    socket.emit('join_room', nowRoomInfo.value)
  }
})

onMounted(() => {
  socket.on('connect', () => {
    socketId = socket.id || ''
  })

  // 接收訊息，並放到前端訊息陣列
  socket.on('message', (data: Message) => {
    const roomId = nowRoomInfo.value?.roomId
    if (roomId) {
      messages.value[roomId].push(data)
    }
    scrollToBottom()
  })

  // 監聽歷史訊息
  socket.on('history', (data: { roomId: string; messages: Message[] }) => {
    messages.value[data.roomId] = data.messages
  })

  socket.on('room_list', (updatedRooms: RoomInfo[]) => {
    roomsList.value = updatedRooms
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })
})

onUnmounted(() => {
  socket.off('room_list')
})
</script>

<template>
  <div
    class="flex h-[calc(100dvh-56px-64px)] w-full rounded-md border-[1px] border-black bg-slate-50"
  >
    <ChatRoomList
      v-model="nowRoomInfo"
      :rooms-list="roomsList"
      @new-chatroom="(roomInfo: RoomInfo) => (nowRoomInfo = roomInfo)"
    />
    <div class="w-full">
      <div
        class="flex h-16 w-full items-center justify-between bg-slate-300 px-6 text-xl font-medium"
      >
        {{
          nowRoomInfo
            ? `${nowRoomInfo?.roomName} (${userCount})`
            : '尚未加入聊天室'
        }}
        <div class="flex items-center">
          <Icon name="icon:search" mode="svg" class="h-6 w-6" />
          <Icon name="icon:dot-menu" mode="svg" class="h-6 w-6" />
        </div>
      </div>
      <div
        ref="chatContainer"
        class="h-[calc(100%-64px-72px)] overflow-y-auto px-8 py-5"
      >
        <div v-if="!nowRoomInfo">請先建立聊天室</div>
        <div v-else class="flex flex-col space-y-3">
          <div
            v-for="(message, index) in messages[nowRoomInfo?.roomId]"
            :key="index"
            class="inline-block"
            :class="message.socketId === socketId ? 'self-end' : 'self-start'"
          >
            <div
              class="mb-1 text-sm"
              :class="{ 'text-right': message.socketId === socketId }"
            >
              {{ message.socketId === socketId ? 'You' : message.sender }}
            </div>
            <div
              class="rounded border-[1px] border-gray-500 bg-white px-3 py-1"
            >
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
      <div class="w-full px-5 py-4">
        <UInput
          v-model="inputMessage"
          color="white"
          variant="outline"
          placeholder="Search..."
          class="h-10 w-full"
          @keyup.enter="submitMessage"
        />
      </div>
    </div>
  </div>
</template>
