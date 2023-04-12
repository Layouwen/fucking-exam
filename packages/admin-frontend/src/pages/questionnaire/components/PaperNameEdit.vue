<template>
  <t-dialog :visible="visible" header="修改标题" @close="$emit('close')" @confirm="onConfirm" :destroyOnClose="true">
    <template #body>
      <t-input v-model:value="inputValue" placeholder="请输入标题" />
    </template>
  </t-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PaperNameEdit',
});
</script>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const emits = defineEmits(['close', 'confirm']);

const props = defineProps({
  inputValueDefault: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    require: false,
    default: false,
  },
});

const inputValue = ref('');

watch(
  () => props.visible,
  (newValue) => {
    if (newValue) {
      inputValue.value = props.inputValueDefault;
    }
  },
);

const onConfirm = () => {
  emits('confirm', inputValue.value);
  emits('close');
};
</script>
