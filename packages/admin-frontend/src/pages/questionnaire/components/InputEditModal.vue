<template>
  <t-dialog :visible="visible" :header="header" @close="$emit('close')" @confirm="onConfirm" :destroyOnClose="true">
    <template #body>
      <t-input v-if="type === 'input'" v-model:value="inputValue" :placeholder="computedPlaceholder" />
      <t-textarea
        v-if="type === 'textarea'"
        :autosize="autosize"
        v-model:value="inputValue"
        :placeholder="computedPlaceholder"
      />
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
import { ref, defineProps, defineEmits, watch, PropType, computed } from 'vue';

const emits = defineEmits(['close', 'confirm']);

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  inputValueDefault: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    require: false,
    default: false,
  },
  type: {
    type: String as PropType<'input' | 'textarea'>,
    require: false,
    default: 'input',
  },
});

const autosize = ref<any>({
  minRows: 5,
  maxRows: 5,
});

const computedPlaceholder = computed(() => {
  return props.placeholder || `请输入${props.header}`;
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
