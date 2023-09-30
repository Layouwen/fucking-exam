<script setup lang="ts">
import {defineProps, defineEmits} from "vue";

const emit = defineEmits({
  "update:is-only-error-questions": (value: boolean) => null,
  "update:is-show": (value: boolean) => null
});

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

const onToggleShow = () => {
  emit('update:is-show', !props.isShow);
}

const onChange = (e: any) => {
  emit("update:is-only-error-questions", !props.isOnlyErrorQuestions);
};
</script>

<template>
  <div>
    <div v-if="!isShow" class="flex justify-center items-centet">
      <div @click="onToggleShow" class="p-3 m-3 border-[1px] border-solid border-[#f7f7f7]">查看答题解析</div>
    </div>
    <div v-else class="flex justify-between items-center mt-3">
      <div @click="onToggleShow">答题解析</div>
      <div>
        <t-checkbox :checked="isOnlyErrorQuestions" @click.prevent="onChange"
        >仅看错题
        </t-checkbox>
      </div>
    </div>
  </div>
</template>
