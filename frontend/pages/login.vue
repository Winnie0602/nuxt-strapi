<script setup lang="ts">
const user = useStrapiUser()

console.log(user.value)

const { login } = useStrapiAuth()

const onSubmit = async () => {
  try {
    const a = await login({
      identifier: '',
      password: '',
    })
    console.log(a)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="hero min-h-[calc(100vh-68px)] bg-gray-200">
    <div class="card w-96 bg-white text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title mb-5">Login</h2>
        <form action="">
          <label
            class="input input-bordered mb-3 flex w-[300px] items-center gap-4"
          >
            Name
            <input type="text" class="grow" placeholder="Winnie" />
          </label>
          <label
            class="input input-bordered mb-3 flex w-[300px] items-center gap-4"
          >
            Email
            <input type="text" class="grow" placeholder="winnie@site.com" />
          </label>

          <label class="input input-bordered flex w-[300px] items-center gap-4">
            Password
            <input
              type="password"
              class="grow"
              autocomplete="on"
              placeholder="最少六個字"
            />
          </label>

          <div class="card-actions mt-5 justify-end">
            <button type="submit" class="btn btn-primary">登入</button>
            <button class="btn btn-ghost" @click.prevent="onSubmit">
              直接註冊
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
