<template>
  <div data-theme="pastel">
    <NavBar class="" />
    <div
      class="mx-auto flex min-h-[calc(100vh-68px)] w-full max-w-[1280px] px-5 py-8 md:space-x-10"
    >
      <LearningMenu class="hidden md:block" />
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
