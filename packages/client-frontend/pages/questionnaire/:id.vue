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
            v-model:value="answer[question.id]"
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
              :checked="answer[question.id]?.[0] === option.value"
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
import { Questionnaire } from "@fucking-exam/shared";
import { NButton, NRadio, NCheckbox, NCheckboxGroup } from "naive-ui";
import axios from "axios";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { getQuestionnaireApi } from "~/api";

const route = useRoute();

const answer = ref({});

const data = ref<Questionnaire>();

onMounted(async () => {
  const { id } = route.params as { id: string };
  const res = await getQuestionnaireApi(id);
  data.value = res.data;
  console.log(res, "layouwen res");
});

const onSelectChoice = (id: string, value: string) => {
  answer.value[id] = [value];
};

const onSubmit = async () => {
  console.log(answer.value);
  const res = await axios.get("https://github.com/login/oauth/authorize");
  console.log(res);
};
</script>
