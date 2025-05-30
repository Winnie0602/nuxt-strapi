<script setup lang="ts">
import {
  Form,
  Field,
  ErrorMessage,
  defineRule,
  configure,
  type SubmissionHandler,
} from 'vee-validate'
import { required, min, email } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'

definePageMeta({ layout: 'full-screen' })

// 建立表單規則
defineRule('required', required)
defineRule('min_value', min)
defineRule('email', email)

// 多國語系規則
configure({
  generateMessage: localize('ch', {
    messages: {
      required: '必填項目',
      min_value: '最少{params}個字',
      email: '請輸入正確格式',
    },
  }),
})

// nuxt auth signin
const { signIn } = useAuth()

const loading = ref(false)

//  一般帳密登入
const onSubmit: SubmissionHandler = async (values, actions) => {
  loading.value = true

  // https://github.com/sidebase/nuxt-auth/issues/493
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error, url }: any = await signIn('credentials', {
    identifier: values.email,
    password: values.password,
    redirect: false,
    callbackUrl: '/',
  })

  loading.value = false

  if (error) {
    actions.setFieldError('email', '帳號密碼錯誤')
  } else {
    console.log(url)
    return navigateTo(url, { external: true })
  }
}
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <UiCard title="登入帳號" class="w-[560px] max-w-sm">
      <template #content>
        <UiCardContent class="flex flex-col gap-4">
          <Form class="" @submit="onSubmit">
            <Field
              v-slot="{ componentField }"
              name="email"
              rules="required|email|min_value:6"
              type="email"
              placeholder="6個字以上"
            >
              <UiFormItem>
                <UiInput
                  type="email"
                  v-bind="componentField"
                  placeholder="信箱"
                />
              </UiFormItem>
            </Field>
            <div class="mb-2 ml-1 text-left text-sm text-red-600">
              <ErrorMessage name="email" />
            </div>
            <Field
              v-slot="{ componentField }"
              name="password"
              rules="required|min_value:6"
              type="password"
              placeholder="6個字以上"
              autocomplete="on"
            >
              <UiFormItem>
                <UiInput
                  type="password"
                  v-bind="componentField"
                  placeholder="密碼"
                />
              </UiFormItem>
            </Field>
            <div class="mb-2 ml-1 text-left text-sm text-red-600">
              <ErrorMessage name="password" />
            </div>
            <div class="mt-2 flex items-center justify-between">
              <button
                type="submit"
                :disabled="loading"
                class="rounded bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-400"
              >
                登入
              </button>
              <NuxtLink
                to="/register"
                class="text-right text-sm underline hover:text-red-600"
              >
                沒有帳號嗎？去註冊！
              </NuxtLink>
            </div>
          </Form>
        </UiCardContent>
      </template>
    </UiCard>
  </div>
</template>
