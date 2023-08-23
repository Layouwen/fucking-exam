<template>
  <div class="flex flex-col border-solid border-[1px] border-[#e3e3e3]">
    <t-checkbox
      class="border-t-0 border-l-0 border-r-0 border-b-[1px] border-solid !p-3 border-[#e3e3e3] last:border-b-0"
      v-for="option in options"
      :key="option.value"
      :checked="isCheck(option.value)"
      :value="isCheck(option.value)"
      :label="option.label"
      @change="onChange(option.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: Array as PropType<string[]>,
    required: true,
    default: () => [],
  },
  options: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
    default: () => [],
  },
})

const emit = defineEmits(['update:value'])

const isCheck = (value: string) => props.value.includes(value)

const onChange = (value: string) => {
  if (props.disabled) return
  const updateValue = isCheck(value) ? props.value.filter(item => item !== value) : [...props.value, value]
  emit('update:value', updateValue)
}
</script>
