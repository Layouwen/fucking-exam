<template>
  <div class="text-[#262626] py-5">
    <div class="text-[17px] font-bold mb-2">
      {{ displayOrder }}{{ question.subject }}
    </div>
    <div class="text-[16px]">
      <NCheckboxGroup
        class="flex flex-col border-solid border-[1px] border-[#e3e3e3]"
        v-if="question.type === 'multipleChoice'"
        v-model:value="result[question.id]"
      >
        <NCheckbox
          :class="borderClass(index, question.options.length)"
          v-for="(option, index) in question.options"
          :key="option.label"
          :value="option.value"
          :label="option.label"
        />
      </NCheckboxGroup>
      <n-radio-group
        class="flex flex-col border-solid border-[1px] border-[#e3e3e3]"
        v-else-if="question.type === 'singleChoice'"
        v-model:value="result[question.id]"
      >
        <NRadio
          :class="borderClass(index, question.options.length)"
          v-for="(option, index) in question.options"
          :key="option.label"
          :value="option.value"
          :name="question.subject"
        >
          {{ option.label }}
        </NRadio>
      </n-radio-group>
      <div v-else>not support</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionnaireQuestionItem",
});
</script>

<script lang="ts" setup>
import { defineProps, PropType, computed } from "vue";
import { NRadio, NCheckbox, NCheckboxGroup, NRadioGroup } from "naive-ui";

const props = defineProps({
  data: {
    // TODO any type
    type: Object as PropType<any>,
    require: true,
  },
  question: {
    // TODO any type
    type: Object as PropType<any>,
    require: true,
  },
  result: {
    type: Object as PropType<any>,
    require: true,
  },
  index: {
    type: Number as PropType<number>,
    require: true,
  },
});

const displayOrder = computed(() => {
  return props.data.settings.isDisplayOrder ? `${props.index! + 1}、` : "";
});

const borderClass = (index: number, length: number) => {
  const borderBottom = index === length - 1 ? "border-b-0 " : "border-b-[1px]";
  return `${borderBottom} border-t-0 border-l-0 border-r-0 border-solid p-3 border-[#e3e3e3]`;
};
</script>
