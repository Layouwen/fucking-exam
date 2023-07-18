<template>
  <div class="h-[50px] w-full flex items-center fixed top-0 left-0 bg-[#fff] z-10">
    <div class="w-[70px] text-center">
      <span v-if="!isHome" @click="onGoHome">主页</span>
    </div>
    <span class="flex-grow text-center">问卷列表</span>
    <div class="w-[70px] text-center">
      <span v-if="isLogin()">我的</span>
      <span v-else @click="onOpenOptionModal">登录</span>
    </div>
  </div>
  <van-action-sheet v-model:show="showModal" :actions="actions" @select="onSelect" close-on-click-action />
</template>

<script lang="ts" setup>
import { isLogin } from '@fucking-exam/shared'
import config from '~/config'

const isHome = computed(() => {
  if (process.client) return window.location.pathname === '/'
  return false
})

const actions = [{ name: '邮箱登录' }, { name: 'Github登录' }, { name: '注册' }, { name: '取消' }]

const onSelect = (item: { name: string }) => {
  switch (item.name) {
    case 'Github登录':
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${window.location.origin}/oauth/github&scope=user&response_type=token`
      return
    case '邮箱登录':
      return navigateTo('/login')
    case '注册':
      return navigateTo('/register')
  }
}

const onGoHome = () => {
  navigateTo('/')
}

const showModal = ref(false)
const onOpenOptionModal = () => {
  showModal.value = true
}
</script>
