<script setup lang="ts">
const { signOut, data } = useAuth()

const user = data.value?.user
</script>

<template>
  <div class="flex justify-center">
    <div class="navbar w-full bg-base-100 xl:w-[1280px]">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <NuxtLink to="/learning/vocabulary" class="mr-2">開始學習</NuxtLink>
          </li>
        </ul>
        <div v-if="data" class="flex items-center">
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="avatar btn btn-circle btn-ghost"
            >
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabindex="0"
              class="menu dropdown-content menu-sm z-[1] mt-3 w-[150px] rounded-box bg-base-100 p-2 text-center shadow"
            >
              <li>
                <a>我的收藏</a>
              </li>
              <li><a>個人檔案</a></li>
              <li><a>新增內容</a></li>
              <li><a>新增內容</a></li>
              <li><a>調整語速</a></li>
            </ul>
          </div>
          Hi~~ {{ user.username }}
        </div>

        <button
          v-if="data"
          class="btn btn-outline btn-error"
          @click="signOut()"
        >
          登出
        </button>

        <NuxtLink
          v-else
          to="/login"
          class="h-8 rounded-md border-[1px] border-error bg-error px-[10px] py-[6px] text-sm text-white hover:bg-white hover:text-error"
        >
          登入 / 註冊
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
