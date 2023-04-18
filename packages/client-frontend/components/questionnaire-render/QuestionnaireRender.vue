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
import { defineProps, PropType } from "vue";

const props = defineProps({
  data: {
    // @ts-ignore
    type: Object as PropType<any>,
    require: true,
  },
  result: {
    type: Object as PropType<any>,
    require: true,
  },
});
</script>
