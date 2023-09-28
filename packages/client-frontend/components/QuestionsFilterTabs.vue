<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["update:isOnlyErrorQuestions"]);

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  isOnlyErrorQuestions: {
    type: Boolean,
    default: false,
  },
});

const onChange = (e: any) => {
  emit("update:isOnlyErrorQuestions", !props.isOnlyErrorQuestions);
};
</script>

<template>
  <div>
    <div>查看答题解析</div>
    <div>
      <div>答题解析</div>
      <div>
        <t-checkbox :checked="isOnlyErrorQuestions" @click="onChange"
          >基础多选框
        </t-checkbox>
      </div>
    </div>
  </div>
</template>
