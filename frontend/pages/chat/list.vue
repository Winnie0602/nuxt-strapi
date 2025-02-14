<script lang="ts" setup>
import { io, type Socket } from 'socket.io-client'
import { ref, onMounted } from 'vue'

const socket = io('http://localhost:1337') // 替換為你的後端 URL
const roomId = ref('')
const message = ref('')
const messages = ref<{ sender: string; message: string; socketId: string }[]>(
  [],
)
const joined = ref(false)
let socketId = ''

const { data: auth, status } = useAuth()

const username =
  status.value === 'unauthenticated' ? 'passer' : auth.value?.user.username

onMounted(() => {
  socket.on('connect', () => {
    socketId = socket.id || ''
    console.log('Connected with socket id:', socketId)
  })

  socket.on('message', (data: { sender: string; message: string; socketId: string }) => {
    messages.value.push(data)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })
})

const joinRoom = () => {
  if (roomId.value.trim()) {
    socket.emit('join_room', roomId.value)
    joined.value = true
    console.log(`Joined room: ${roomId.value}`)
  }
}

const sendMessage = () => {
  if (message.value.trim()) {
    socket.emit('message', {
      roomId: roomId.value,
      message: message.value,
      username,
    })
    message.value = '' // 清空輸入框
  }
}
</script>

<template>
  <div>
    <h1>WebSocket Chat</h1>
    <input v-model="roomId" placeholder="Enter Room ID" />
    <button @click="joinRoom">Join Room</button>

    <div v-if="joined">
      <input
        v-model="message"
        placeholder="Type a message and press enter"
        @keydown.enter="sendMessage"
      />
      <ul>
        <li
          v-for="(msg, index) in messages"
          :key="index"
          :class="{
            'message-right': msg.socketId === socketId,
            'message-left': msg.socketId !== socketId,
          }"
        >
          <strong>{{ msg.socketId === socketId ? 'You' : msg.sender }}:</strong>
          {{ msg.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.message-left {
  text-align: left;
}
.message-right {
  text-align: right;
  color: blue;
}
</style>
