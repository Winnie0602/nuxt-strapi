<script setup lang="ts">
definePageMeta({ layout: 'full-screen' })
</script>

<template>
  <div class="flex justify-center">
    <UiContainer
      class="scrollbar max-h-[calc(100vh-160px)] max-w-[560px] overflow-y-scroll rounded-md bg-white p-8"
    >
      <div class="h-full w-full flex-col items-start justify-center rounded-md">
        <div
          class="text-meduim flex w-full items-center justify-center space-x-1.5 text-lg"
        >
          <div
            v-for="text in ['作', '品', '介', '紹']"
            :key="text"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-center text-white"
          >
            {{ text }}
          </div>
        </div>
        <div class="mt-3 w-full text-center">日文學習網站</div>
        <div class="mt-3 space-y-5">
          <div class="space-y-2">
            <div>1. 頁面介紹：</div>
            <div class="text-sm">
              ( 1 ) 學習頁面：單字表格（不需登入）
              <br />
              <div class="">
                功能 - 顯示/隱藏中文解釋 & 平假名 &
                漢語、收藏單字(需登入)、朗讀單字
              </div>
            </div>
            <div class="text-sm">
              ( 2 ) 學習頁面：日文日期發音（不需登入）
              <br />
              <div class="">
                功能 -
                日期月曆(套件)及年月日的input框，彼此互相綁定，朗讀年月日發音
              </div>
            </div>
            <div class="text-sm">
              ( 3 ) 學習頁面：多國聊天室（不需登入）
              <br />
              <div class="">
                功能 -
                創建聊天室、加入現有聊天室、即時發送訊息、即時翻譯語言、即時朗讀訊息、發送emoji、選擇翻譯語言
                <br />
                使用場景 - 不同國家的人交談用
              </div>
            </div>
            <div class="text-sm">
              ( 4 ) 個人頁面：收藏單字（需登入）
              <br />
              <div class="">
                功能 - 檢視收藏單字、新增/刪除收藏的單字，表格與學習單字表格共用
              </div>
            </div>
            <div class="text-sm">
              ( 5 ) 測驗頁面：單字拼字、單字配對（不需登入）
              <br />
              <div class="">
                功能(單字拼字) -
                一次有五道題目（從單字表隨機抽），需要把平假名拼出來，錯誤的答案會在測驗結果hilight
              </div>
              <div class="">
                功能(單字配對) -
                配對中日單字，可自行設定測驗秒數，有三次失敗的機會，若其中一項失敗則遊戲結束
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <div>2. 技術功能介紹：</div>
            <div class="text-sm">
              主要使用技術：Nuxt(負責前端) + Typescript + UI Thing / Nuxt UI /
              Tailwindcss(頁面樣式開發) + Strapi(CMS、提供API) +
              Postgres(存資料)
            </div>
            <div class="text-sm">
              其他技術：
              <br />
              vee-validate(用於登入頁面表格認證)
              <br />
              socket.io(多國聊天室即時收發訊息)
              <br />
              sidebase/nuxt-auth(身份認證、區分登入頁＆訪客頁)
              <br />
              embla-carousel(輪播套件，用於製作測驗小卡)
            </div>
          </div>
          <div class="space-y-2">
            <div>3. 測試用登入帳密：</div>
            <div class="text-sm">
              帳號：test123@mail.com
              <br />
              密碼：Test123@mail.com
            </div>
          </div>
          <div class="space-y-2">
            <div>4. Github source code</div>
            <div class="text-sm">
              <NuxtLink
                to="https://github.com/Winnie0602/nuxt-strapi/tree/main"
                target="blank"
                class="rounded-md border-[1px] border-gray-900 px-2 py-1 hover:bg-gray-900 hover:text-white"
              >
                Click me!
              </NuxtLink>
            </div>
          </div>
          <div class="space-y-2 pb-8">
            <div>5. 未來預計加入功能：</div>
            <div class="text-sm">
              頁面加入國際語言(i18n)、聽力測驗、聊天室列表存入資料庫、語速調整、前端新增單字至後台
            </div>
          </div>
        </div>
      </div>
    </UiContainer>
  </div>
</template>
