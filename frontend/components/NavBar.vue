<template>
  <div class="flex justify-center">
    <div class="navbar w-full bg-base-100 xl:w-[1280px]">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <NuxtLink to="/learning/vocabulary" class="mr-2">
              開始學習
            </NuxtLink>
          </li>
        </ul>

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
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
