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
    </van-cell-group>
    <div class="flex">
      <span class="ml-auto text-[12px] underline text-[#577df6] cursor-pointer" @click="onGoRegister">没有账号? 点击注册</span>
    </div>
    <van-button round block type="primary" native-type="submit">登录</van-button>
    <van-button round block @click="onBack">返回</van-button>
  </van-form>
</template>

<script lang="ts" setup>
import { showFailToast, showSuccessToast } from 'vant'
import { useAuthStore } from '~/stores'

const authStore = useAuthStore()
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

  const res = await authStore.login(formValue)
  if (res.code === 200) {
    setTimeout(() => {
      router.back()
    }, 1000)

    showSuccessToast('登录成功')
  } else {
    showFailToast('登录失败')
  }
}

const onBack = () => {
  router.back()
}

const onGoRegister = () => {
  navigateTo('/register')
}
</script>
