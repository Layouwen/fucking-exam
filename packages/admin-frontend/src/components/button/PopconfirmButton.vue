<template>
  <t-popconfirm
    v-if="isConfirm"
    :visible="visible"
    content="确认删除吗"
    @confirm="$emit('click')"
  >
    <t-button :size="size" :disabled="disabled" @click="visible = true">{{
      slots.default?.()[0].children || 'default'
    }}</t-button>
  </t-popconfirm>
  <t-button v-else :disabled="disabled" :size="size" @click="$emit('click')"
    >{{ slots.default?.()[0].children || '' }}
  </t-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PopconfirmButton',
});
</script>

<script setup lang="ts">
import { defineProps, useSlots, ref, PropType } from 'vue';
import { SizeEnum } from 'tdesign-vue-next/es/common';

const slots = useSlots();

defineProps({
  isConfirm: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  default: {
    type: Object,
    required: false,
  },
  size: {
    type: String as PropType<SizeEnum>,
    required: false,
    default: 'small',
  },
});

const visible = ref(false);
</script>
