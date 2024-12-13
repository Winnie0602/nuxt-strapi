<script setup lang="ts">
const { signOut, data } = useAuth()

const user = data.value?.user

const menuitems = [
  { label: `Hi, ${user?.username}` },
  { divider: true },
  { title: '個人檔案', icon: 'ph:user' },
  {
    title: '我的收藏',
    icon: 'ph:heart',
    items: [
      { title: '單字' },
      { title: '文章' },
      { title: '對話' },
      { divider: true },
      { title: 'More', icon: 'ph:plus-circle' },
    ],
  },
  { title: '新增內容', icon: 'ph:plus-circle' },
  { title: '語速調整', icon: 'ph:gear' },
  { divider: true },
  { title: 'Github', icon: 'ph:github-logo' },
  { divider: true },
  { title: '登出', icon: 'ph:sign-out' },
]
</script>

<template>
  <div>
    <UiNavbar>
      <UiContainer class="flex h-14 items-center justify-between">
        <NuxtLink to="/" class="font-semibold">My JP Learning</NuxtLink>
        <nav class="hidden items-center gap-8 sm:flex">
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
              <UiDropdownMenuItem>
                <NuxtLink to="/">對話</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/">文章</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuItem>
                <NuxtLink to="/">各種副詞</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/learning/time">時間副詞</NuxtLink>
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
                <NuxtLink to="/">單字測驗</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/test">拼字測驗</NuxtLink>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem>
                <NuxtLink to="/">聽力測驗</NuxtLink>
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
                  <UiDropdownMenuItem
                    v-else-if="item.title && !item.items"
                    :title="item.title"
                    :icon="item.icon"
                  />
                  <UiDropdownMenuSub v-else-if="item.title && item.items">
                    <UiDropdownMenuSubTrigger
                      :title="item.title"
                      :icon="item.icon"
                    />
                    <UiDropdownMenuSubContent>
                      <template
                        v-for="(child, k) in item.items"
                        :key="`child-${k}`"
                      >
                        <UiDropdownMenuSeparator v-if="child.divider" />
                        <UiDropdownMenuItem
                          v-else
                          :title="child.title"
                          :icon="child.icon"
                        />
                      </template>
                    </UiDropdownMenuSubContent>
                  </UiDropdownMenuSub>
                </template>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
          <UiButton v-if="data" variant="destructive" @click="signOut()">
            登出
          </UiButton>

          <div v-else class="text-center">
            <UiButton @click="navigateTo('/login')">登入 / 註冊</UiButton>
          </div>
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>
