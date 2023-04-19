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
        :disabled="QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE === type"
      >
        <NCheckbox
          :class="[
            borderClass(index, question.options.length),
            {
              error: errorClass(question.id, option.value, question.answers),
              right: rightClass(question.id, option.value, question.answers),
            },
          ]"
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
        :disabled="QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE === type"
      >
        <NRadio
          :class="[
            borderClass(index, question.options.length),
            {
              error: errorClass(question.id, option.value, question.answers),
              right: rightClass(question.id, option.value, question.answers),
            },
          ]"
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
import { QuestionnaireRenderType } from "./type";
import { defineProps, computed } from "vue";
import { NRadio, NCheckbox, NCheckboxGroup, NRadioGroup } from "naive-ui";

const props = withDefaults(
  defineProps<{
    data: any;
    question: any;
    result: any;
    type?: QuestionnaireRenderType;
    index: number;
    answers?: Record<string, string[]>;
  }>(),
  {
    type: QuestionnaireRenderType.QUESTIONNAIRE,
    answers: {},
  }
);

const displayOrder = computed(() => {
  return props.data.settings.isDisplayOrder ? `${props.index! + 1}、` : "";
});

const borderClass = (index: number, length: number) => {
  const borderBottom = index === length - 1 ? "border-b-0 " : "border-b-[1px]";
  return `${borderBottom} border-t-0 border-l-0 border-r-0 border-solid p-3 border-[#e3e3e3]`;
};

const rightClass = (id: number, value: string, answer: string) => {
  if(props.type === QuestionnaireRenderType.QUESTIONNAIRE) return false;
  return answer.includes(value);
};

const errorClass = (id: number, value: string, answer: string) => {
  if(props.type === QuestionnaireRenderType.QUESTIONNAIRE) return false;

  const answers = props.answers![id];
  if (typeof answers === "string") {
    if (answers !== answer[0] && answers === value) {
      return true;
    }
  } else if (Array.isArray(answers)) {
    // answers [2,3,4]
    // answer [1,2,3]
    if (!answer.includes(value) && answers.includes(value)) {
      return true;
    }
  }
  return false;
};
</script>

<style scoped lang="less">
.right {
  :deep {
    .n-checkbox__label,
    .n-radio__label {
      color: #00a870;
    }
  }
}

.error {
  :deep {
    .n-checkbox__label,
    .n-radio__label {
      color: #ff4d4f;
    }
  }
}
</style>
