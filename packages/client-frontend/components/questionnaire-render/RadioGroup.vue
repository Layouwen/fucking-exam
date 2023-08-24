<template>
  <t-radio-group
    class="space-y-3 flex flex-col !items-start border-[1px] border-[#e3e3e3] border-solid !w-full !gap-0"
    :value="value"
    @change="onChange"
  >
    <t-radio
      :class="[
        '!p-3 !m-0 w-full border-b-[1px] border-t-0 border-l-0 border-r-0 border-[#e3e3e3] border-solid last:border-b-0',
        {
          'disabled-un-highlight': disabled,
        },
      ]"
      v-for="radio in options"
      :key="radio.value"
      :value="radio.value"
    >
      {{ radio.label }}
    </t-radio>
  </t-radio-group>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, PropType } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<{ label: string; value: string }[]>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{ (e: 'update:value', value: string): void }>()

const onChange = (value: string) => {
  if (props.disabled) return
  emit('update:value', value)
}
</script>

<style lang="less">
.disabled-un-highlight:not(.t-is-checked):hover .t-radio__input {
  border-color: var(--td-border-level-2-color);
}
</style>
