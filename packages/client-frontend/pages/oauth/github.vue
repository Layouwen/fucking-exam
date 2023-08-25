<template></template>

<script lang="ts" setup>
import { postOauthGithubLoginApi } from '~/api'

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const { code } = route.query

  if (code) {
    router.replace({ path: '/oauth/github' })
    showLoadingToast({
      message: 'github授权中...',
      duration: 0,
      forbidClick: true,
    })

    const res = await postOauthGithubLoginApi(code as string)

    if (res.code === 200) {
      localStorage.setItem('token', res.data.token)
      showSuccessToast('登录成功')
    } else {
      showFailToast('登录失败')
    }

    closeToast()

    setTimeout(() => {
      router.push('/')
    }, 1000)
  } else {
    router.push('/')
  }
})
</script>
