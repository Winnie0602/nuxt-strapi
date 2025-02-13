<script lang="ts" setup>
import { io } from "socket.io-client";
import { ref } from "vue";

const socket = io("http://localhost:1337"); // 替換為你的後端地址
const roomId = ref("");
const message = ref("");
const messages = ref<{ sender: string; original: string; translated: string }[]>([]);

const joinRoom = () => {
  if (roomId.value) {
    socket.emit("join_room", roomId.value);
  }
};

const sendMessage = async () => {
  if (message.value.trim()) {
    const translatedMessage = await translateMessage(message.value);
    socket.emit("send_message", {
      roomId: roomId.value,
      message: message.value,
      sender: "You",
    });
    messages.value.push({ sender: "You", original: message.value, translated: translatedMessage });
    message.value = ""; // 清空輸入框
  }
};

socket.on("receive_message", (data) => {
  if (data.sender !== "You") {
    messages.value.push({ sender: data.sender, original: data.message, translated: "" });
  }
});

async function translateMessage(text: string): Promise<string> {
  const isChinese = /[\u4e00-\u9fa5]/.test(text);
  if (!isChinese) return text;

  // 這裡使用 Google Translation API 進行翻譯
  // const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     q: text,
  //     target: "en",
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const result = await response.json();
  // return result.data.translations[0].translatedText;
  return 'trans'
}
</script>

<template>
  <div class="chat-container">
    <input v-model="roomId" placeholder="Enter Room ID" />
    <button @click="joinRoom">Join Room</button>

    <div class="messages">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="{'message-right': msg.sender === 'You', 'message-left': msg.sender !== 'You'}"
      >
        <p><strong>{{ msg.sender }}:</strong> {{ msg.original }}</p>
        <p v-if="msg.original !== msg.translated"><em>Translated: {{ msg.translated }}</em></p>
      </div>
    </div>

    <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
}
.messages {
  height: 300px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}
.message-left {
  text-align: left;
}
.message-right {
  text-align: right;
}
</style>
