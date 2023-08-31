<template>
  <van-dropdown-menu class="z-20 top-0 fixed left-0 w-full custom-wrapper">
    <van-dropdown-item
      :model-value="value.value1"
      @update:model-value="onModelValueUpdate('value1', $event)"
      :options="option1"
    />
    <van-dropdown-item
      :model-value="value.value2"
      @update:model-value="onModelValueUpdate('value2', $event)"
      :options="option2"
    />
    <van-dropdown-item
      :model-value="value.tag"
      @update:model-value="onModelValueUpdate('tag', $event)"
      :options="tagOptions"
    />
  </van-dropdown-menu>
</template>

<script setup lang="ts">
import { PropType } from "vue";

export type FilterValue = {
  keyword: string;
  value1: number;
  value2: string;
  tag: number;
};

const option1 = [
  { text: "公开问卷", value: 0 },
  { text: "我的问卷", value: 1 },
];

const option2 = [
  { text: "创建时间降序", value: "a" },
  { text: "创建时间升序", value: "b" },
];

const props = defineProps({
  value: {
    type: Object as PropType<FilterValue>,
    default: () => ({
      keyword: "",
      value1: 0,
      value2: "a",
      tag: -1,
    }),
  },
  tagOptions: {
    type: Array as PropType<{ text: string; value: number }[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  (
    e: "update:value",
    value: {
      keyword: string;
      value1: number;
      value2: string;
    }
  ): void;
}>();

const onModelValueUpdate = (key: string, value: string | number) => {
  emit("update:value", {
    ...props.value,
    [key]: value,
  });
};
</script>

<style lang="less" scoped>
.custom-wrapper :deep(.van-dropdown-menu__bar) {
  box-shadow: none;
}
</style>
