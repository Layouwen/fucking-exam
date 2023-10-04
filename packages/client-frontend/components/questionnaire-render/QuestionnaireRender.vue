<script lang="ts" setup>
import {
  QuestionnairePaperName,
  QuestionnaireQuestionItem,
  ResultDisplay,
  QuestionsFilterTabs,
  QuestionnaireController,
} from "../index";
import { QuestionnaireRenderType } from "./type";
import "@wangeditor/editor/dist/css/style.css";
import { isRightByQuestion, Question } from "@fucking-exam/shared";

export type AnswersType = Record<string, string[]>;

let Editor;
if (process.client) {
  !(async () => {
    const a = await import("@wangeditor/editor-for-vue");
    Editor = a.Editor;
  })();
}

const props = withDefaults(
  defineProps<{
    data: any;
    type?: QuestionnaireRenderType;
    result?: AnswersType;
    answers?: AnswersType;
  }>(),
  {
    data: "",
    type: QuestionnaireRenderType.QUESTIONNAIRE,
    result: {},
    answers: {},
  }
);

const isShowQuestionAnswer = ref(false);
const isOnlyErrorQuestions = ref(false);

const calcOnlyErrorQuestions = (questions: Question[]) => {
  if (!questions?.length) return [];
  if (isOnlyErrorQuestions.value) {
    return questions.filter((question) =>
      !isRightByQuestion(question, props.answers)
    );
  }
  return questions;
};
</script>

<template>
  <div class="px-6">
    <questionnaire-paper-name :paper-name="data.paperName" />
    <result-display
      v-if="type === QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE"
      :data="data"
      :answers="answers"
    />
    <questions-filter-tabs
      v-if="type === QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE"
      v-model:is-show="isShowQuestionAnswer"
      v-model:is-only-error-questions="isOnlyErrorQuestions"
    />
    <template
      v-if="
        isShowQuestionAnswer ||
        type !== QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE
      "
    >
      <questionnaire-question-item
        v-for="(question, index) in calcOnlyErrorQuestions(data.questions)"
        :index="+index"
        :key="question.subject"
        :data="data"
        :question="question"
        :result="result"
        :type="type"
        :answers="answers"
      />
    </template>
    <questionnaire-controller :type="type" :questions="data.questions" :answers="answers" :result="result" />
  </div>
</template>
