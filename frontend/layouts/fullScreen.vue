<template>
  <div data-theme="pastel" class="h-[100dvh] bg-gray-600">
    <NavBar class="" />
    <div
      class="mx-auto h-[calc(100dvh-56px)] w-full max-w-[1280px] px-5 py-10 md:space-x-10"
    >
      <slot />
    </div>
  </div>
</template>
