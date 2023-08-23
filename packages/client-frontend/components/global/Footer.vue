<template>
  <div class="bg-[#f9f9f9] text-[14px] py-4 flex items-center justify-center" @click="onSupport">
    <span class="text-[#8c8c8c] mr-2">Avan</span>
    <span class="text-[#bebebe]">提供技术支持</span>
  </div>
</template>

<script lang="ts" setup>
import { isMobile } from '@fucking-exam/shared'
import { showNotify } from 'vant'

const onSupport = () => {
  if (isMobile()) {
    showNotify({ type: 'primary', message: '打开QQ' })
    window.location.href = 'mqq://im/chat?chat_type=wpa&uin=794234293&version=1&src_type=web'
  }
}
</script>
