<template>
  <div class="mt-14 hidden w-[230px] flex-none md:block xl:w-[320px]">
    <ul class="menu w-full rounded-box bg-base-200">
      <li><a>文章</a></li>
      <li><a>對話</a></li>
      <li>
        <NuxtLink to="/learning/vocabulary" active-class="active-navbar">
          單字
        </NuxtLink>
      </li>
      <li>
        <details open>
          <summary><NuxtLink to="/">其他</NuxtLink></summary>
          <ul>
            <li>
              <NuxtLink to="/" active-class="active">xxx</NuxtLink>
            </li>
            <li><NuxtLink to="/">Youtube</NuxtLink></li>
            <li>
              <details open>
                <summary>副詞</summary>
                <ul>
                  <li><a>時間副詞</a></li>
                  <li><a>地點副詞</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</template>

<style lang="postcss" scoped>
.active-navbar {
  @apply bg-gray-300 hover:bg-gray-300;
}
</style>
