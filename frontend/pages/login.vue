<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, min, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

const { login } = useStrapiAuth()

// 建立規則
defineRule('required', required)
defineRule('min_value', min)
defineRule('email', email)

// 多國語系規則
configure({
  generateMessage: localize('ch', {
    messages: {
      required: '必填項目',
      min_value: '最少{params}個字 ',
      email: '請輸入正確格式',
    },
  }),
})

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
    <div class="card mx-4 w-full bg-white text-neutral-content md:mx-0 md:w-96">
      <div class="card-body items-center text-center">
        <h2 class="card-title mb-5">Login</h2>
        <Form class="" @submit="onSubmit">
          <label
            class="input input-bordered flex max-w-[300px] items-center gap-5"
          >
            Name
            <Field
              name="name"
              placeholder="3個字以上"
              rules="required|min_value:3"
              type="name"
            />
          </label>
          <div class="mb-5 pl-4 text-left text-sm text-red-600">
            <ErrorMessage name="name" />
          </div>

          <label
            class="input input-bordered flex max-w-[300px] items-center gap-5"
          >
            Email
            <Field
              name="email"
              rules="required|email|min_value:6"
              type="email"
              placeholder="6個字以上"
            />
          </label>
          <div class="mb-5 pl-4 text-left text-sm text-red-600">
            <ErrorMessage name="email" />
          </div>
          <label
            class="input input-bordered flex max-w-[300px] items-center gap-5"
          >
            Password
            <Field
              name="password"
              rules="required|min_value:6"
              type="password"
              placeholder="6個字以上"
              autocomplete="on"
            />
          </label>

          <div class="pl-4 text-left text-sm text-red-600">
            <ErrorMessage name="password" />
          </div>
          <div class="card-actions mt-5 justify-center">
            <button type="submit" class="btn btn-primary">登入</button>
            <button class="btn btn-ghost">直接註冊</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
