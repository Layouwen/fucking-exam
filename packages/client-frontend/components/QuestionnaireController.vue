<script setup lang="ts">
import { Question, QuestionType, questionType } from "@fucking-exam/shared";
import { PropType } from "vue";
import { QuestionnaireRenderType } from "~/components/questionnaire-render";

const props = defineProps({
  questions: {
    type: Array as PropType<Question[]>,
    default: () => [],
  },
  answers: {
    type: Object as PropType<any>,
    default: () => {},
  },
  result: {
    type: Object as PropType<any>,
    default: () => {},
  },
  questionItemListRef: {
    type: Array as PropType<any>,
    default: () => [],
  },
  type: {
    type: Number as PropType<QuestionnaireRenderType>,
    required: true,
  },
});

const items = [
  {
    type: "top",
    name: "顶部",
    onClick() {
      window.scrollTo(0, 0);
    },
  },
  {
    type: "next",
    name: "下一个",
    onClick() {
      findNextUnAnswer();
      updateIsShowNext();
    },
  },
];

const isCanAnswerQuestion = (type: QuestionType) => {
  return !([questionType.RICH_TEXT] as QuestionType[]).includes(type);
};

const isAnswerQuestion = (question: Question, answers: any) => {
  return !!answers[question.id];
};

const findNextUnAnswer = () => {
  const answers = props.result || props.answers;
  let question: any;

  if (!answers) {
    question = props.questions.find((question) => {
      return isCanAnswerQuestion(question.type);
    });
  } else {
    question = props.questions.find((question) => {
      if (!isCanAnswerQuestion(question.type)) return false;
      return !isAnswerQuestion(question, answers);
    });
  }

  if (!question) return;

  const findQuestion = document.querySelector(
    `[data-value="question-item-${question.id}"]`
  ) as HTMLDivElement;
  if (findQuestion) {
    scrollTo(0, findQuestion.offsetTop);
  }
};

const isTop = ref(false);

const onScroll = () => {
  if (window.scrollY < 100) {
    isTop.value = true;
  } else {
    isTop.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const isShowNext = ref(false);
const updateIsShowNext = () => {
  if (props.type === QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE) {
    isShowNext.value = false;
    return;
  }
  isShowNext.value = props.questions
    .filter((question) => isCanAnswerQuestion(question.type))
    .some((question) => !isAnswerQuestion(question, props.result));
};

onMounted(() => {
  updateIsShowNext();
});
</script>

<template>
  <div
    class="fixed right-[10px] bottom-1/4 flex flex-col space-y-2 text-[14px]"
  >
    <template v-for="item in items" :key="item.type">
      <template v-if="item.type === 'top'">
        <div
          v-if="!isTop"
          class="w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
          @click="item.onClick"
        >
          {{ item.name }}
        </div>
      </template>
      <template v-else>
        <div
          v-if="isShowNext"
          class="w-[50px] h-[50px] rounded-full bg-[#fff] flex items-center justify-center shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
          @click="item.onClick"
        >
          {{ item.name }}
        </div>
      </template>
    </template>
  </div>
</template>
