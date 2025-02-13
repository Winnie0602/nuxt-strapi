<template>
  <div>
    <h1>WebSocket Chat</h1>
    <input
      v-model="message"
      placeholder="Type a message and press enter"
      @keydown.enter="sendMessage"
    />
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>

    <button @click="add">add</button>
  </div>
</template>

<script lang="ts" setup>
import { io, type Socket } from 'socket.io-client'

// 建立響應式變數來儲存訊息列表和當前訊息
const messages = ref<string[]>([])
const message = ref<string>('')

const { data: list } = await useFetch('/api/message')

console.log(list.value)

const add = async () => {
  await $fetch('/api/message', {
    method: 'POST',
  })
}
// 宣告一個 socket 變數來儲存 WebSocket 連接
let socket: Socket

onMounted(() => {
  // 建立 WebSocket 連接
  socket = io('http://localhost:1337') // 這是你的後端 WebSocket 伺服器 URL

  // 接收到訊息時，將訊息加入訊息列表
  socket.on('message', (data: string) => {
    messages.value.push(data)
    console.log('Connected with socket id:', socket.id)
  })

  // 監聽錯誤
  socket.on('connect_error', (err: any) => {
    console.error('Socket connection error: ', err)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })
})

// 發送訊息到後端
const sendMessage = () => {
  if (message.value.trim()) {
    socket.emit('message', message.value) // 發送訊息到後端
    message.value = '' // 清空訊息框
  }
}
</script>

<style scoped>
/* 在這裡可以添加一些簡單的樣式 */
</style>
