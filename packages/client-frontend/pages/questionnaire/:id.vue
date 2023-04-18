<template>
  <div v-if="data">
    <questionnaire-render :data="data" :result="answers" />
    <div class="px-6 pb-6">
      <NButton block size="large" type="info" @click="onSubmit"
        >提交试卷
      </NButton>
    </div>
  </div>
  <div v-else>loading...</div>
</template>

<script lang="ts" setup>
import { Questionnaire, randomByArr } from "@fucking-exam/shared";
import { NButton } from "naive-ui";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getQuestionnaireApi, postQuestionnaireSubmitApi } from "~/api";
import { QuestionnaireRender } from "~/components";

const route = useRoute();
const router = useRouter();

const questionnaireId = ref<string>();
const answers = ref<Record<string, string[]>>({});
const order = ref<number[]>();
const data = ref<Questionnaire>();

onMounted(async () => {
  const { id } = route.params as { id: string };
  if (id) {
    questionnaireId.value = id;

    const { data: questionnaireData } = await getQuestionnaireApi(id);

    if (questionnaireData.settings.randomType === "1") {
      questionnaireData.questions = randomByArr(questionnaireData.questions);
      questionnaireData.questions.forEach((question) => {
        if (questionnaireData.settings.randomType === "1") {
          question.options = randomByArr(question.options);
        }
      });
    }

    order.value = questionnaireData.questions.map((question) => question.id);

    data.value = questionnaireData;
  }
});

const onSubmit = async () => {
  if (!questionnaireId.value || !order.value || !data.value) return;

  try {
    const res = await postQuestionnaireSubmitApi(+questionnaireId.value, {
      order: order.value,
      answers: answers.value,
      questions: data.value.questions,
      questionnaireVersion: data.value.version,
    });
    await router.push(`/questionnaire/response/${res.data.id}`);
  } catch (e) {
    console.log(e);
  }
};
</script>
