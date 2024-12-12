<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications
      :ui="{
        strategy: 'override',
        position: 'top-0 end-0',
        width: 'w-full sm:w-[420px]',
      }"
    />
  </div>
</template>
