<script lang="ts" setup>
import { io } from 'socket.io-client'
import type { Language, RoomInfo, Message } from '~/types/type'
import { VoiceLanguage, GoogleLanguage } from '~/types/type'
import VoiceSpeak from '~/components/global/VoiceSpeak.vue'

const voiceSpeakRef = ref<InstanceType<typeof VoiceSpeak>[] | null>(null)
const runtimeConfig = useRuntimeConfig()

definePageMeta({
  layout: 'full-screen',
})

const { data: auth, status } = useAuth()

const chatContainer = ref<HTMLElement | null>(null) // 指向聊天視窗容器

const username =
  status.value === 'unauthenticated' ? 'passer' : auth.value?.user.username

const socket = io(runtimeConfig.public.backendUrl) // 後端 URL

const nowRoomInfo = ref<RoomInfo>()

const inputMessage = ref('') // input訊息框框
const messages = ref<{ [roomId: string]: Message[] }>({})

const isVolumeOpen = ref(true)

let socketId = '' // 該視窗socket ID

const roomsList = ref<RoomInfo[]>([])

const language = ref<Language>({
  googleSourceLanguage: GoogleLanguage.TraditionalChinese,
  googleTargetLanguage: GoogleLanguage.English,
  voiceLanguage: VoiceLanguage.English,
})

// 發送訊息給socket server
const submitMessage = () => {
  if (inputMessage.value.trim()) {
    socket.emit('message', {
      roomId: nowRoomInfo.value?.roomId,
      message: inputMessage.value,
      username,
      sourceLang: language.value.googleSourceLanguage, // 設定原語言，例：中文
      targetLang: language.value.googleTargetLanguage, // 設定目標語言，例：日文
    })
  }

  inputMessage.value = ''
}

// 滾動到底部功能
const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// 新增emoji到input
const addUnicodeSymbol = (symbol: string) => {
  // 十六進位的部分並轉換為 Unicode 符號
  inputMessage.value += String.fromCodePoint(
    parseInt(symbol.replace('&#x', '').replace(';', ''), 16),
  )
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
  socket.on('message', async (data: Message) => {
    const roomId = nowRoomInfo.value?.roomId
    if (roomId) {
      messages.value[roomId].push(data)

      await nextTick() // 確保 DOM 更新後再滾動

      scrollToBottom()

      if (voiceSpeakRef.value) {
        voiceSpeakRef.value[messages.value[roomId].length - 1]?.playWord()
      }
    }
  })

  // 監聽歷史訊息
  socket.on(
    'history',
    async (data: { roomId: string; messages: Message[] }) => {
      messages.value[data.roomId] = data.messages

      await nextTick() // 確保 DOM 更新後再滾動

      scrollToBottom()
    },
  )

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
      class="hidden md:block"
      @new-chatroom="(roomInfo: RoomInfo) => (nowRoomInfo = roomInfo)"
    />
    <div class="w-full">
      <div
        class="flex h-16 w-full items-center justify-between rounded-t-md bg-slate-300 px-6 text-xl font-medium"
      >
        <div class="flex items-center">
          {{
            nowRoomInfo
              ? `${nowRoomInfo?.roomName} ( ${roomsList.filter((e) => e.roomId === nowRoomInfo?.roomId)[0]?.userCount} )`
              : '尚未加入聊天室'
          }}
          <div v-if="nowRoomInfo" class="ml-2">
            <Icon
              :name="`icon:${isVolumeOpen ? 'volume' : 'mute'}`"
              mode="svg"
              class="h-5 w-5 cursor-pointer"
              @click="isVolumeOpen = !isVolumeOpen"
            />
          </div>
        </div>
        <div class="flex items-center md:hidden">
          <UPopover :popper="{ arrow: true, placement: 'bottom-start' }">
            <UButton
              color="white"
              trailing-icon="i-heroicons-chevron-down-20-solid"
            />

            <template #panel="{ close }">
              <div class="h-[60vh] p-4">
                <ChatRoomList
                  v-model="nowRoomInfo"
                  :rooms-list="roomsList"
                  @new-chatroom="
                    (roomInfo: RoomInfo) => (nowRoomInfo = roomInfo)
                  "
                  @enter-room="close()"
                />
              </div>
            </template>
          </UPopover>
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
            :class="
              message.socketId === socketId ||
              message.sender === auth?.user.username
                ? 'self-end'
                : 'self-start'
            "
          >
            <div
              class="mb-1 flex text-sm"
              :class="{
                'justify-end':
                  message.socketId === socketId ||
                  message.sender === auth?.user.username,
              }"
            >
              <div class="flex space-x-2">
                <VoiceSpeak
                  v-if="isVolumeOpen"
                  ref="voiceSpeakRef"
                  :word="
                    message.translatedMessage.replace(
                      /[\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu,
                      '',
                    )
                  "
                  :lang="message.targetLang"
                  :index="index"
                />
                {{
                  message.socketId === socketId ||
                  message.sender === auth?.user.username
                    ? 'You'
                    : message.sender
                }}
              </div>
            </div>
            <div class="rounded border-[1px] border-gray-500 bg-white">
              <div class="px-3 py-1">{{ message.message }}</div>
              <div
                class="rounded-b border-t-[1px] border-gray-500 bg-indigo-200 px-3 py-1"
              >
                {{ message.translatedMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full px-5 py-4">
        <ChatLanguageButton
          :disabled="nowRoomInfo === undefined"
          :language="language"
          @change-lang="(copy: Language) => (language = copy)"
        />
        <ChatEmojiButton
          :disabled="nowRoomInfo === undefined"
          @select-emoji="(emoji: string) => addUnicodeSymbol(emoji)"
        />
        <UInput
          v-model="inputMessage"
          color="white"
          variant="outline"
          :disabled="nowRoomInfo === undefined"
          placeholder="Text Something..."
          class="h-10 w-full"
          @keyup.enter="submitMessage"
        />
      </div>
    </div>
  </div>
</template>
