<template>
  <div class="px-6">
    <questionnaire-paper-name :paper-name="data.paperName" />
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "QuestionnaireRender",
});
</script>

<script lang="ts" setup>
import { QuestionnairePaperName, QuestionnaireQuestionItem } from "./index";
import { QuestionnaireRenderType } from "./type";
import { defineProps, withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    data: any;
    result?: Record<string, string[]>;
    type?: QuestionnaireRenderType;
    answers?: Record<string, string[]>;
  }>(),
  {
    data: "",
    type: QuestionnaireRenderType.QUESTIONNAIRE,
    result: {},
    answers: {},
  }
);
</script>
