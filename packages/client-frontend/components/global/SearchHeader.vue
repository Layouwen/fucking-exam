<template>
  <div class="border-0 border-b-[1px] border-[#efefef] border-solid fixed top-[48px] left-0 w-full">
    <van-search
      :model-value="value"
      placeholder="请输入搜索关键词"
      @update:model-value="onInput"
      :clearable="false"
      :show-action="!!value.trim().length"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

const onInput = (value: string) => {
  emit('update:model-value', value)
}
</script>
