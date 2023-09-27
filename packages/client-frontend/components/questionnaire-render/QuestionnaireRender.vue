<script lang="ts" setup>
import {
  QuestionnairePaperName,
  QuestionnaireQuestionItem,
  QuestionnaireRenderType,
  ResultDisplay,
} from "../index";
import "@wangeditor/editor/dist/css/style.css";

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
</script>

<template>
  <div class="px-6">
    <questionnaire-paper-name :paper-name="data.paperName" />
    <result-display
      v-if="type === QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE"
      :data="data"
      :answers="answers"
    />
    <questionnaire-question-item
      v-for="(question, index) in data.questions"
      :index="+index"
      :key="question.subject"
      :data="data"
      :question="question"
      :result="result"
      :type="type"
      :answers="answers"
    />
  </div>
</template>
