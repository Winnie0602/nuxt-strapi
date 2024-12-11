<script setup lang="ts">
const { signOut, data } = useAuth()

const user = data.value?.user

// <li>
//                 <a>我的收藏</a>
//               </li>
//               <li><a>個人檔案</a></li>
//               <li><a>新增內容</a></li>
//               <li><a>新增內容</a></li>
//               <li><a>調整語速</a></li>
</script>

<template>
  <div>
    <UiNavbar>
      <UiContainer class="flex h-14 items-center justify-between">
        <NuxtLink to="/" class="font-semibold">My JP Learning</NuxtLink>
        <nav class="hidden items-center gap-5 sm:flex">
          <div v-if="data" class="flex items-center">
            Hi~~ {{ user?.username }}
          </div>
          <NuxtLink
            to="/learning/vocabulary"
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            開始學習
          </NuxtLink>

          <button
            v-if="data"
            class="btn btn-outline btn-error"
            @click="signOut()"
          >
            登出
          </button>

          <div v-else class="text-center">
            <UiButton @click="navigateTo('/login')">登入 / 註冊</UiButton>
          </div>
        </nav>
      </UiContainer>
    </UiNavbar>
  </div>
</template>
