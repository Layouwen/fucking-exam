<template>
  <t-popconfirm
    v-if="isConfirm"
    :visible="visible"
    content="确认删除吗"
    @confirm="$emit('click')"
  >
    <t-button @click="visible = true" :disabled="disabled" :size="size">{{ slots.default?.()[0].children || '' }}</t-button>
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
import { defineProps, useSlots, ref } from 'vue';

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
    type: String,
    required: false,
    default: 'small',
  },
});

const visible = ref(false);
</script>
