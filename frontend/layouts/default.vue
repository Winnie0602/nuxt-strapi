<template>
  <div data-theme="pastel">
    <NavBar class="" />
    <div class="flex w-full justify-center">
      <div class="min-h-[calc(100vh-68px)] w-[70vw] bg-white">
        <slot />
      </div>
    </div>
    <!-- <GoTop />
    <Footer />
    <MobileDownloadApp /> -->
  </div>
</template>
