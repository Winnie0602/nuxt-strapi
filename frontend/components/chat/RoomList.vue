<script setup lang="ts">
const emit = defineEmits(['newChatroom'])

defineProps<{ roomsList: RoomInfo[] }>()

type RoomInfo = {
  roomId: string
  roomName: string
  roomDescription: string
  roomPassword?: string
}

const nowRoomInfo = defineModel<RoomInfo>()

const isModalOpen = ref(false)

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
</script>

<template>
  <div class="h-full w-[30%] border-r-[1px] border-black px-6 py-5">
    <UInput
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
          v-for="room in roomsList"
          :key="room.roomId"
          class="cursor-pointer border-b-[1px] border-gray-200 pb-3"
          @click="nowRoomInfo = { ...room, roomId: room.roomName }"
        >
          <div class="text-xl font-bold">{{ room.roomName }}</div>
          <div class="text-sm text-gray-900">{{ room.roomDescription }}</div>
        </div>
      </div>
      <div class="flex space-x-4">
        <button class="button" @click="openModal()">新增聊天室</button>
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
              創建聊天室
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

        <div>
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
      </UCard>
    </UModal>
  </div>
</template>

<style lang="postcss" scoped>
.button {
  @apply w-full rounded border-[2px] border-zinc-900 bg-indigo-400 py-2 hover:bg-indigo-700 hover:text-white;
}
</style>
