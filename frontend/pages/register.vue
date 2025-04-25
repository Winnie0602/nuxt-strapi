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

const loading = ref(false)

//  註冊
const onSubmit: SubmissionHandler = async (values) => {
  const config = useRuntimeConfig()

  console.log(config.public.strapiBaseUrl)

  try {
    await $fetch(`${config.public.strapiBaseUrl}/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        password: values.password,
        email: values.email,
        username: values.username,
      },
    })
    showToast(`註冊成功，請重新登入`, '')
    navigateTo('/login')
  } catch (error) {
    showToast(`${error.data.error.message}`, '')
    return null
  }
}
</script>

<template>
  <div class="flex h-full w-full items-center justify-center">
    <UiCard
      title="註冊"
      description="請填入註冊必要的資訊"
      class="w-[560px] max-w-sm"
    >
      <template #content>
        <UiCardContent class="flex flex-col gap-4">
          <Form class="" @submit="onSubmit">
            <!-- Email -->
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
            <!-- Username -->
            <Field
              v-slot="{ componentField }"
              name="username"
              rules="required|min_value:3"
              type="text"
              placeholder="Your Username"
            >
              <UiFormItem>
                <UiInput
                  type="username"
                  v-bind="componentField"
                  placeholder="個人名稱"
                />
              </UiFormItem>
            </Field>
            <div class="mb-2 ml-1 text-left text-sm text-red-600">
              <ErrorMessage name="username" />
            </div>
            <!-- Password -->
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
                註冊
              </button>
              <NuxtLink
                to="/login"
                class="text-right text-sm underline hover:text-red-600"
              >
                已有帳號嗎？去登入！
              </NuxtLink>
            </div>
          </Form>
        </UiCardContent>
      </template>
    </UiCard>
  </div>
</template>
