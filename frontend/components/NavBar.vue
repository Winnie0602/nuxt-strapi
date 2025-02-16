<script setup lang="ts">
const { signOut, data } = useAuth()

const user = data.value?.user

const menuitems = [
  { label: `Hi, ${user?.username}` },
  { divider: true },
  { title: '個人檔案(待開發)', icon: 'ph:user' },
  {
    title: '我的收藏',
    icon: 'ph:heart',
    items: [
      { title: '單字', path: '/my/favorites' },
      // { title: '文章', path: '/my/favorites' },
      // { title: '對話', path: '/my/favorites' },
      { divider: true },
      { title: 'More', icon: 'ph:plus-circle' },
    ],
  },
  { title: '新增內容(待開發)', icon: 'ph:plus-circle' },
  { title: '語速調整(待開發)', icon: 'ph:gear' },
  { divider: true },
  {
    title: 'Github',
    icon: 'ph:github-logo',
    path: 'https://github.com/Winnie0602?tab=repositories',
  },
]
</script>

<template>
  <div>
    <UiNavbar>
      <UiContainer
        class="flex h-20 flex-col items-end justify-center sm:h-14 sm:flex-row sm:items-center sm:justify-between"
      >
        <NuxtLink to="/" class="font-semibold">
          Winnie Learning &#x1F34F; &#x1F352; &#x1F347;
        </NuxtLink>
        <nav class="flex items-center gap-5">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger>
              <div
                to="/learning/vocabulary"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                開始學習
              </div>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-15">
              <UiDropdownMenuItem>
                <NuxtLink to="/learning/vocabulary">單字</NuxtLink>
              </UiDropdownMenuItem>
              <!-- <UiDropdownMenuItem>
                <NuxtLink to="/">對話</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/">文章</NuxtLink>
              </UiDropdownMenuItem> -->
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem>
                <NuxtLink to="/learning/time">日文日期發音</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/chat">多國聊天室</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/learning/time">時間副詞(待開發)</NuxtLink>
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <UiDropdownMenu>
            <UiDropdownMenuTrigger>
              <div
                to="/learning/vocabulary"
                class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                開始測驗
              </div>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-15">
              <UiDropdownMenuItem>
                <NuxtLink to="/test/spell">拼字測驗</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/">單字測驗(待開發)</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/">聽力測驗(待開發)</NuxtLink>
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>

          <div v-if="data" class="flex items-center">
            <UiDropdownMenu>
              <UiDropdownMenuTrigger>
                <UiAvatar
                  :fallback="user?.username.charAt(0)"
                  class="cursor-pointer"
                />
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent class="w-56">
                <template v-for="(item, i) in menuitems" :key="i">
                  <UiDropdownMenuLabel v-if="item.label" :label="item.label" />
                  <UiDropdownMenuSeparator v-else-if="item.divider" />
                  <NuxtLink
                    v-else-if="item.title && !item.items"
                    :to="item.path"
                  >
                    <UiDropdownMenuItem :title="item.title" :icon="item.icon" />
                  </NuxtLink>

                  <UiDropdownMenuSub v-else-if="item.title && item.items">
                    <UiDropdownMenuSubTrigger
                      :title="item.title"
                      :icon="item.icon"
                    />
                    <UiDropdownMenuSubContent>
                      <NuxtLink
                        v-for="(child, k) in item.items"
                        :key="`child-${k}`"
                        :to="child.path"
                      >
                        <UiDropdownMenuSeparator v-if="child.divider" />
                        <UiDropdownMenuItem
                          v-else
                          :title="child.title"
                          :icon="child.icon"
                        />
                      </NuxtLink>
                    </UiDropdownMenuSubContent>
                  </UiDropdownMenuSub>
                </template>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
          <button
            v-if="data"
            class="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-400"
            @click="signOut()"
          >
            登出
          </button>

          <NuxtLink
            v-else
            to="/login"
            class="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-400"
          >
            登入
          </NuxtLink>
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>
