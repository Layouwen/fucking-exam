<template>
  <div class="px-10 pt-32">
    <n-form ref="formRef" :model="formValue" label-width="60" labelPlacement="left">
      <n-form-item label="邮箱:" path="email">
        <n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
      </n-form-item>
      <n-form-item label="密码:" path="password">
        <n-input v-model:value="formValue.password" placeholder="输入密码" />
      </n-form-item>
      <n-form-item label="验证码:" path="phone">
        <n-input v-model:value="formValue.code" placeholder="请输入验证码" />
        <n-button class="ml-2" :disabled="codeDisabled" @click="onPostCode">{{ codeText }}</n-button>
      </n-form-item>
      <n-form-item>
        <div class="space-y-2 w-full">
          <n-button block type="primary" @click="onSubmit">注册</n-button>
          <n-button block @click="onBack">返回</n-button>
        </div>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts" setup>
// TODO 移除 naive-ui
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { showSuccessToast, showFailToast } from 'vant'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { registerApi, sendEmailCodeApi } from '~/api'

const router = useRouter()

const formValue = reactive({
  email: '',
  password: '',
  code: '',
})
const codeStatus = reactive({
  time: 0,
})

const codeDisabled = computed(() => codeStatus.time > 0)

const codeText = computed(() => {
  if (codeStatus.time > 0) {
    return `${codeStatus.time}秒后重发`
  }
  return '发送验证码'
})

const onPostCode = async () => {
  if (!formValue.email) {
    showFailToast('请输入邮箱')
    return
  }
  if (codeStatus.time > 0) {
    return
  }
  const res = await sendEmailCodeApi(formValue.email)

  if (res.code === 200) {
    codeStatus.time = 30
    const timer = setInterval(() => {
      codeStatus.time--
      if (codeStatus.time <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    showSuccessToast('发送成功')
  } else {
    showFailToast('发送失败')
  }
}

const onSubmit = async () => {
  if (!formValue.email) {
    showFailToast('请输入邮箱')
    return
  }
  if (!formValue.code) {
    showFailToast('请输入验证码')
    return
  }
  if (!formValue.password) {
    showFailToast('请输入密码')
    return
  }

  const res = await registerApi(formValue)

  if (res.code === 200) {
    localStorage.setItem('token', res.data.token)

    showSuccessToast('注册成功')
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }
}

const onBack = () => {
  router.push('/')
}
</script>
