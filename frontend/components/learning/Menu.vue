<template>
  <div class="h-full rounded-md bg-gray-200 px-2 py-3 lg:w-[200px]">
    <div class="flex items-center justify-center">
      <UiCollapsible class="w-full space-y-2" default-open>
        <div class="flex items-center justify-between space-x-4 px-2">
          <h4 class="text-sm font-semibold">Learning</h4>
          <UiCollapsibleTrigger as-child>
            <UiButton variant="ghost" size="sm" class="w-9 p-0">
              <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
              <span class="sr-only">Toggle</span>
            </UiButton>
          </UiCollapsibleTrigger>
        </div>
        <UiCollapsibleContent class="space-y-2">
          <NuxtLink
            to="/learning/vocabulary"
            class="block rounded-md border px-4 py-3 font-mono text-sm hover:bg-gray-100"
          >
            單字
          </NuxtLink>
          <NuxtLink
            to="/chat"
            class="block rounded-md border px-4 py-3 font-mono text-sm hover:bg-gray-100"
          >
            多國聊天室
          </NuxtLink>
          <!-- <NuxtLink
            :to="'/learning/vocabulary'"
            class="block rounded-md border px-4 py-3 font-mono text-sm hover:bg-gray-100"
          >
            對話
          </NuxtLink> -->
        </UiCollapsibleContent>
      </UiCollapsible>
    </div>
    <div class="flex items-center justify-center">
      <UiCollapsible class="w-full space-y-2" default-open>
        <div class="flex items-center justify-between space-x-4 px-2">
          <h4 class="text-sm font-semibold">Testing</h4>
          <UiCollapsibleTrigger as-child>
            <UiButton variant="ghost" size="sm" class="w-9 p-0">
              <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
              <span class="sr-only">Toggle</span>
            </UiButton>
          </UiCollapsibleTrigger>
        </div>
        <UiCollapsibleContent class="space-y-2">
          <NuxtLink
            to="/test/spell"
            class="block rounded-md border px-4 py-3 font-mono text-sm hover:bg-gray-100"
          >
            拼字測驗
          </NuxtLink>
          <NuxtLink
            to="/test/match"
            class="block rounded-md border px-4 py-3 font-mono text-sm hover:bg-gray-100"
          >
            單字配對測驗
          </NuxtLink>
        </UiCollapsibleContent>
      </UiCollapsible>
    </div>
    <div class="flex items-center justify-center">
      <UiCollapsible class="w-full space-y-2" default-open>
        <div class="flex items-center justify-between space-x-4 px-2">
          <h4 class="text-sm font-semibold">Other</h4>
          <UiCollapsibleTrigger as-child>
            <UiButton variant="ghost" size="sm" class="w-9 p-0">
              <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
              <span class="sr-only">Toggle</span>
            </UiButton>
          </UiCollapsibleTrigger>
        </div>
        <UiCollapsibleContent class="space-y-2">
          <NuxtLink
            to="/learning/time"
            class="block rounded-md border px-4 py-3 font-mono text-sm hover:bg-gray-100"
          >
            日文日期發音
          </NuxtLink>
        </UiCollapsibleContent>
      </UiCollapsible>
    </div>
    <div class="flex items-center justify-center">
      <UiCollapsible class="w-full space-y-2" default-open>
        <div class="flex items-center justify-between space-x-4 px-2">
          <h4 class="text-sm font-semibold">My</h4>
          <UiCollapsibleTrigger as-child>
            <UiButton variant="ghost" size="sm" class="w-9 p-0">
              <Icon name="lucide:chevrons-up-down" class="h-4 w-4" />
              <span class="sr-only">Toggle</span>
            </UiButton>
          </UiCollapsibleTrigger>
        </div>
        <UiCollapsibleContent class="space-y-2">
          <NuxtLink
            :to="'/my/favorites'"
            class="block rounded-md border px-4 py-3 font-mono text-sm hover:bg-gray-100"
          >
            我的收藏單字
          </NuxtLink>
        </UiCollapsibleContent>
      </UiCollapsible>
    </div>
  </div>
</template>
