<template>
  <questionnaire-render
    :type="QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE"
    :data="data"
    :answers="answers"
  />
  <n-button block type="primary" @click="router.push('/')">返回</n-button>
</template>

<script lang="ts" setup>
import { getQuestionnaireResponseApi } from "~/api";
import { QuestionnaireRender, QuestionnaireRenderType } from "~/components";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { NButton } from "naive-ui";

const route = useRoute();
const router = useRouter();

const data = ref<Record<string, any>>();
const answers = ref<Record<string, string[] | string>>();

onMounted(async () => {
  const { id } = route.params as { id: string };
  const {
    data: { questions, questionnaire, answers: _answers },
  } = await getQuestionnaireResponseApi(id);
  answers.value = _answers as Record<string, string | string[]>;
  data.value = {
    paperName: questionnaire.paperName,
    questions,
    settings: questionnaire.settings,
  };
});
</script>
