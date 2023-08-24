<template>
  <div class="border-0 border-b-[1px] border-[#efefef] border-solid fixed top-0 left-0 w-full">
    <van-search
      v-model="_value"
      placeholder="请输入搜索关键词"
      @update:model-value="onInput"
      :clearable="false"
      :show-action="!!_value.trim().length"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

const _value = ref('')

watch(
  () => props.value,
  v => {
    _value.value = v
  }
)

const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

const onInput = (value: string) => {
  emit('update:model-value', value)
}
</script>
