<template>
  <div data-theme="pastel">
    <NavBar class="" />
    <div class="flex w-full justify-center">
      <div
        class="flex min-h-[calc(100vh-68px)] w-full justify-center bg-white py-8"
      >
        <slot />
      </div>
    </div>
    <!-- <GoTop />
    <Footer />
    <MobileDownloadApp /> -->
  </div>
</template>
