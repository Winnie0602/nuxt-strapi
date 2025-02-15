<script setup lang="ts">
const emit = defineEmits(['newChatroom'])

defineProps<{ roomsList: RoomInfo[] }>()

type RoomInfo = {
  roomId: string
  roomName: string
  roomDescription: string
  roomPassword?: string
  userCount?: number
}

const search = ref('')

const nowRoomInfo = defineModel<RoomInfo>()

const isModalOpen = ref(false)

const modalType = ref<'newRoom' | 'enterRoom'>('newRoom')

const openModal = () => {
  isModalOpen.value = true
}

const roomName = ref('')
const roomDescription = ref('')
const roomPassword = ref<string[]>([])

const newChatroom = () => {
  emit('newChatroom', {
    roomId: roomName.value,
    roomName: roomName.value,
    roomDescription: roomDescription.value,
    roomPassword: roomPassword.value.join(''),
  })

  isModalOpen.value = false

  roomName.value = ''
  roomDescription.value = ''
  roomPassword.value.length = 0
}

const enterRoom = (room: RoomInfo) => {
  if (room.roomPassword && room.roomPassword?.length > 0) {
    // 開啟密碼輸入模態框
    isModalOpen.value = true
    modalType.value = 'enterRoom'
  } else {
    // 直接進入聊天室（不需要密碼）
    nowRoomInfo.value = { ...room, roomId: room.roomName }
  }

  nowRoomInfo.value = { ...room, roomId: room.roomName }
}

// 監聽 roomPassword 的變化，當密碼輸入完成後進行檢查
watch(roomPassword, (newPassword) => {
  const currentRoom = nowRoomInfo.value

  if (
    currentRoom?.roomPassword &&
    newPassword.length === currentRoom.roomPassword.length
  ) {
    // 密碼輸入完成，進行比較
    const enteredPassword = newPassword.join('') // 將密碼陣列轉換為字串
    if (enteredPassword === currentRoom.roomPassword) {
      // 密碼正確，進入聊天室
      showToast('密碼正確', '')
      nowRoomInfo.value = { ...currentRoom, roomId: currentRoom.roomName }
      isModalOpen.value = false // 關閉密碼輸入框
    } else {
      // 密碼錯誤，顯示錯誤提示或其他處理
      showToast('密碼錯誤，請再試一次。', '')
    }
  }
})
</script>

<template>
  <div
    class="h-full w-full border-black px-4 py-2 md:w-[30%] md:border-r-[1px] md:px-6 md:py-5"
  >
    <UInput
      v-model="search"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      :trailing="false"
      placeholder="Search..."
      class="w-full"
    />
    <div class="mt-6 flex h-[calc(100%-24px-32px)] flex-col justify-between">
      <div class="block h-[calc(100%)] space-y-4">
        <div
          v-for="room in roomsList.filter((e) => e.roomName.includes(search))"
          :key="room.roomId"
          class="cursor-pointer border-b-[1px] border-gray-200 pb-3"
          @click="enterRoom(room)"
        >
          <div class="flex items-center text-xl font-bold">
            {{ room.roomName }}
            <span class="ml-1 text-sm font-normal">
              ( {{ room.userCount }} )
            </span>
          </div>
          <div class="text-sm text-gray-900">{{ room.roomDescription }}</div>
        </div>
      </div>
      <div class="flex space-x-4">
        <button
          class="button text-base font-normal"
          @click="() => (openModal(), (modalType = 'newRoom'))"
        >
          新增聊天室
        </button>
      </div>
    </div>
    <UModal v-model="isModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {{ modalType === 'newRoom' ? '創建聊天室' : '請輸入聊天室密碼' }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isModalOpen = false"
            />
          </div>
        </template>

        <div v-if="modalType === 'newRoom'">
          <div class="mb-2 text-sm">聊天室名稱：</div>
          <UInput
            v-model="roomName"
            color="gray"
            variant="outline"
            placeholder="Default Name"
            class="mb-5"
          />
          <div class="mb-2 text-sm">聊天室描述：</div>
          <UInput
            v-model="roomDescription"
            color="gray"
            variant="outline"
            placeholder="Default Description"
            class="mb-5"
          />
          <div class="mb-2 text-sm">設定通關密碼(可選)</div>
          <UiPinInput v-model="roomPassword" placeholder="0" class="mb-5" />
          <button class="button" @click="newChatroom">創建聊天室！</button>
        </div>
        <div v-else>
          <UiPinInput
            v-model="roomPassword"
            placeholder="0"
            class="mx-auto mb-5"
          />
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<style lang="postcss" scoped>
.button {
  @apply w-full rounded border-[2px] border-zinc-900 bg-indigo-400 py-2 hover:bg-indigo-700 hover:text-white;
}
</style>
