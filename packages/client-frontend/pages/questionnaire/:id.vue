<template>
  <div v-if="data">
    <h1>{{ data.paperName }}</h1>
    <div>
      <div v-for="question in data.questions" :key="question.subject">
        <div class="text-[17px]">{{ question.subject }}</div>
        <div class="text-[16px]">
          <NCheckboxGroup
            class="flex flex-col"
            v-if="question.type === 'multipleChoice'"
            v-model:value="answers[question.id]"
          >
            <NCheckbox
              class="border-[1px] border-solid p-3"
              v-for="option in question.options"
              :key="option.label"
              :value="option.value"
              :label="option.label"
            />
          </NCheckboxGroup>
          <div
            class="flex flex-col"
            v-else-if="question.type === 'singleChoice'"
          >
            <NRadio
              class="border-[1px] border-solid p-3"
              v-for="option in question.options"
              :key="option.label"
              :checked="answers[question.id]?.[0] === option.value"
              :value="option.value"
              :name="question.subject"
              @change="onSelectChoice(question.id, option.value)"
            >
              {{ option.label }}
            </NRadio>
          </div>
          <div v-else>not support</div>
        </div>
      </div>
    </div>
    <NButton @click="onSubmit">Submit</NButton>
  </div>
  <div v-else>loading...</div>
</template>

<script lang="ts" setup>
import { Questionnaire, randomByArr } from "@fucking-exam/shared";
import { NButton, NRadio, NCheckbox, NCheckboxGroup } from "naive-ui";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getQuestionnaireApi, postQuestionnaireSubmitApi } from "~/api";

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

const onSelectChoice = (id: string, value: string) => {
  answers.value[id] = [value];
};

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
