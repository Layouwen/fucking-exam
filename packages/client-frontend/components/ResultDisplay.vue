<script setup lang="ts">
import { defineProps, computed, PropType } from "vue";
import { AnswersType } from "~/components/questionnaire-render/QuestionnaireRender.vue";
import { isRightByQuestion } from "@fucking-exam/shared";

type DataType = any;

const props = defineProps({
  data: {
    type: Object as PropType<DataType>,
    required: true,
  },
  answers: {
    type: Object as PropType<AnswersType>,
    required: true,
  },
});

const calcQuestionTotalNum = (data: DataType) => {
  return data.questions.length;
};

type Question = any;

const calcCorrectNum = (data: DataType) => {
  return data.questions.reduce((pre: number, cur: any) => {
    return isRightByQuestion(cur, props.answers) ? pre + 1 : pre;
  }, 0);
};

const statistics = computed(() => {
  const _statistics = {
    correctNum: 0,
    questionTotalNum: 0,
    score: 0,
  };

  if (!props.data) return _statistics;

  _statistics.correctNum = calcCorrectNum(props.data);
  _statistics.questionTotalNum = calcQuestionTotalNum(props.data);
  _statistics.score = Math.floor(
    (_statistics.correctNum / _statistics.questionTotalNum) * 100
  );

  return _statistics;
});
</script>

<template>
  <div
    class="flex border-[1px] border-solid border-[#efefef] text-[12px] h-[122px]"
  >
    <div
      class="flex flex-grow justify-center items-center flex-col border-r-[#efefef] border-solid border-0 border-r-[1px]"
    >
      <div
        class="text-[40px] flex-grow flex justify-center items-center text-[#ff6a00]"
      >
        {{ statistics.score }}
      </div>
      <div
        class="py-2 w-full text-center flex-shrink bg-[#f7f7f7] text-[#b3b3b3]"
      >
        总分100
      </div>
    </div>
    <div class="flex flex-grow justify-center items-center flex-col">
      <div
        class="flex justify-center items-center flex-col flex-grow space-y-2"
      >
        <div class="text-[20px]">{{ statistics.correctNum }}</div>
        <div class="text-[#999]">答对</div>
      </div>
      <div
        class="py-2 w-full text-center flex-shrink bg-[#f7f7f7] text-[#b3b3b3]"
      >
        共{{ statistics.questionTotalNum }}题
      </div>
    </div>
  </div>
</template>
