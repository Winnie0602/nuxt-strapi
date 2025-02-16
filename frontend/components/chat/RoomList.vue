<script setup lang="ts">
import type { RoomInfo } from '~/types/type'

const emit = defineEmits(['newChatroom'])

const props = defineProps<{ roomsList: RoomInfo[] }>()

const nowRoomInfo = defineModel<RoomInfo>()

const search = ref('')

const isModalOpen = ref(false)

const modalType = ref<'newRoom' | 'enterRoom'>('newRoom')

const openModal = () => {
  isModalOpen.value = true
}

const roomName = ref('')
const roomDescription = ref('')

const newChatroom = (type: 'new' | 'exsist') => {
  if (type === 'new') {
    const hasSameName = props.roomsList.find(
      (e) => e.roomName === roomName.value,
    )
    if (hasSameName) {
      showToast('已有相同名稱的聊天室', '')

      return
    }
  }

  emit('newChatroom', {
    roomId: roomName.value,
    roomName: roomName.value,
    roomDescription: roomDescription.value,
  })

  isModalOpen.value = false

  roomName.value = ''
  roomDescription.value = ''
}

const enterRoom = (room: RoomInfo) => {
  nowRoomInfo.value = { ...room, roomId: room.roomName }
}
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
          class="button text-sm font-normal md:text-base"
          @click="() => (openModal(), (modalType = 'enterRoom'))"
        >
          加入聊天室
        </button>
        <button
          class="button text-sm font-normal md:text-base"
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
              {{ modalType === 'newRoom' ? '創建聊天室' : '加入聊天室' }}
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
          <div class="mb-2 text-sm">
            {{
              modalType === 'newRoom'
                ? '聊天室名稱：'
                : '請輸入要進入的聊天室名稱：'
            }}
          </div>
          <UInput
            v-model="roomName"
            color="gray"
            variant="outline"
            placeholder="Default Name"
            class="mb-5"
          />
          <div v-if="modalType === 'newRoom'" class="mb-2 text-sm">
            聊天室描述：
          </div>
          <UInput
            v-if="modalType === 'newRoom'"
            v-model="roomDescription"
            color="gray"
            variant="outline"
            placeholder="Default Description"
            class="mb-5"
          />

          <button
            class="button"
            @click="newChatroom(modalType === 'newRoom' ? 'new' : 'exsist')"
          >
            {{ modalType === 'newRoom' ? '創建聊天室！' : '加入聊天室' }}
          </button>
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
