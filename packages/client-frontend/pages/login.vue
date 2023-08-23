<template>
  <div class="px-10 pt-32">
    <n-form ref="formRef" :model="formValue" label-width="60" labelPlacement="left">
      <n-form-item label="邮箱:" path="email">
        <n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
      </n-form-item>
      <n-form-item label="密码:" path="password">
        <n-input v-model:value="formValue.password" placeholder="输入密码" />
      </n-form-item>
      <n-form-item>
        <div class="space-y-2 w-full">
          <n-button block type="primary" @click="onSubmit">登录</n-button>
          <n-button block @click="onBack">返回</n-button>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
// TODO 移除 naive-ui
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '~/api'

const router = useRouter()

const formValue = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  if (!formValue.email) {
    showFailToast('请输入邮箱')
    return
  }
  if (!formValue.password) {
    showFailToast('请输入密码')
    return
  }

  Object.keys(formValue).forEach(
    key => (formValue[key as keyof typeof formValue] = formValue[key as keyof typeof formValue].trim())
  )

  const res = await loginApi(formValue)

  if (res.code === 200) {
    localStorage.setItem('token', res.data.token)

    setTimeout(() => {
      router.push('/')
    }, 1000)

    showSuccessToast('登录成功')
  } else {
    showFailToast('登录失败')
  }
}

const onBack = () => {
  router.push('/')
}
</script>
