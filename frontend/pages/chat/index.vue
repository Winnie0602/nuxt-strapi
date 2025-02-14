<script lang="ts" setup>
import { io, type Socket } from 'socket.io-client'

definePageMeta({
  layout: 'full-screen',
})

type Message = { message: string; sender: string; socketId: string }

const { data: auth, status } = useAuth()

const chatContainer = ref<HTMLElement | null>(null) // 指向聊天視窗容器

const username =
  status.value === 'unauthenticated' ? 'passer' : auth.value?.user.username

const socket = io('http://localhost:1337') // 替換為你的後端 URL
const roomId = ref('1') // 目前房號

const inputMessage = ref('') // input訊息框框
const messages = ref<Message[]>([]) // 訊息陣列
const userCount = ref(0) // socket room人數

let socketId = '' // 該視窗socket ID

// 監聽房間人數變化
socket.on('roomSize', (size: number) => {
  userCount.value = size
})

// 發送訊息給socket server
const submitMessage = () => {
  if (inputMessage.value.trim()) {
    socket.emit('message', {
      roomId: roomId.value,
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

onMounted(() => {
  socket.on('connect', () => {
    socketId = socket.id || ''
  })

  // 接收訊息，並放到前端訊息陣列
  socket.on(
    'message',
    (data: { sender: string; message: string; socketId: string }) => {
      messages.value.push(data)
      scrollToBottom()
    },
  )

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })

  joinRoom()
})

const joinRoom = () => {
  if (roomId.value.trim()) {
    socket.emit('join_room', roomId.value)
    console.log(`Joined room: ${roomId.value}`)
  }
}
</script>

<template>
  <div
    class="flex h-[calc(100dvh-56px-64px)] w-full rounded-md border-[1px] border-black bg-slate-50"
  >
    <div class="w-[30%] border-r-[1px] border-black px-6 py-5">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="sm"
        color="white"
        :trailing="false"
        placeholder="Search..."
        class="w-full"
      />
      <div class="mt-6 space-y-4">
        <div class="border-b-[1px] border-gray-200 pb-3">
          <div class="text-xl font-bold">第一個聊天室</div>
          <div class="text-sm text-gray-900">第一個聊天室的敘述</div>
        </div>
        <div class="border-b-[1px] border-gray-200 pb-3">
          <div class="text-xl font-bold">第二個聊天室</div>
          <div class="text-sm text-gray-900">第二個聊天室的敘述</div>
        </div>
        <div class="border-b-[1px] border-gray-200 pb-3">
          <div class="text-xl font-bold">第三個聊天室</div>
          <div class="text-sm text-gray-900">第三個聊天室的敘述</div>
        </div>
        <div class="border-b-[1px] border-gray-200 pb-3">
          <div class="text-xl font-bold">第4個聊天室</div>
          <div class="text-sm text-gray-900">第4個聊天室的敘述</div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div
        class="flex h-16 w-full items-center justify-between bg-slate-300 px-6 text-xl font-medium"
      >
        第一個聊天室（{{ userCount }}）
        <div class="flex items-center">
          <Icon name="icon:search" mode="svg" class="h-6 w-6" />
          <Icon name="icon:dot-menu" mode="svg" class="h-6 w-6" />
        </div>
      </div>
      <div
        ref="chatContainer"
        class="flex h-[calc(100%-64px-72px)] flex-col space-y-3 overflow-y-auto px-8 py-5"
      >
        <div
          v-for="(message, index) in messages"
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
          <div class="rounded border-[1px] border-gray-500 bg-white px-3 py-1">
            {{ message.message }}
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
