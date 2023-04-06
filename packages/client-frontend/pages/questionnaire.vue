<template>
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
        <div class="flex flex-col" v-else-if="question.type === 'singleChoice'">
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
</template>

<script lang="ts" setup>
import { NButton, NRadio, NCheckbox, NCheckboxGroup } from "naive-ui";
import axios from "axios";

const answer = ref({});

const data = {
  paperName: "测试试卷",
  config: {
    isQuestionRandom: true,
    isQuestionOptionRandom: true,
  },
  questions: [
    {
      id: "111",
      type: "multipleChoice",
      subject: "vue的作者是谁？",
      options: [
        {
          label: "尤雨溪",
          value: "A",
        },
        {
          label: "Avan",
          value: "B",
        },
        {
          label: "Yqq",
          value: "C",
        },
        {
          label: "VanYu",
          value: "D",
        },
      ],
      answers: ["A", "B"],
    },
    {
      id: "222",
      type: "singleChoice",
      subject: "谁是世界上最美的人？",
      options: [
        {
          label: "尤雨溪",
          value: "A",
        },
        {
          label: "Avan",
          value: "B",
        },
        {
          label: "Yqq",
          value: "C",
        },
        {
          label: "VanYu",
          value: "D",
        },
      ],
      answer: "C",
    },
  ],
};

const onSelectChoice = (id: string, value: string) => {
  answer.value[id] = [value];
};

const onSubmit = async () => {
  console.log(answer.value);
  const res = await axios.get("https://github.com/login/oauth/authorize");
  console.log(res);
};
</script>
