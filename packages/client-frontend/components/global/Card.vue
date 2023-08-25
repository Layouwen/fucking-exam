<template>
  <div
    class="rounded-[var(--van-radius-lg)] px-[var(--van-cell-vertical-padding)] py-[var(--van-cell-horizontal-padding)]"
    :style="{
      background: ghost ? 'transparent' : '#fff',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  ghost: {
    type: Boolean,
    default: false,
  },
})
</script>
