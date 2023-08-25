<template>
  <van-form class="mt-32 px-4 space-y-3" @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="formValue.email"
        name="邮箱"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[{ required: true, message: '请输入邮箱' }]"
      />
      <van-field
        v-model="formValue.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <van-field v-model="formValue.code" center clearable label="验证码" placeholder="请输入验证码">
        <template #button>
          <van-button size="small" type="primary" :disabled="codeDisabled" @click="onPostCode">
            {{ codeText }}
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-button round block type="primary" native-type="submit">注册</van-button>
    <van-button round block @click="onBack">返回</van-button>
  </van-form>
</template>

<script lang="ts" setup>
import { showSuccessToast, showFailToast } from 'vant'
import { sendEmailCodeApi } from '~/api'
import { useAuthStore } from '~/stores'

const authStore = useAuthStore()
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

  const res = await authStore.register(formValue)

  if (res.code === 200) {
    showSuccessToast('注册成功')

    setTimeout(() => {
      navigateTo('/mine')
    }, 1000)
  }
}

const onBack = () => {
  router.back()
}
</script>
