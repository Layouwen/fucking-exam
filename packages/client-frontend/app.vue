<template>
  <n-message-provider>
    <NuxtPage />
  </n-message-provider>
</template>

<script lang="ts" setup>
// TODO 移除 naive-ui
import { NMessageProvider } from "naive-ui";
import "~/assets/styles/main.less";
</script>
