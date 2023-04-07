<template>
  <n-tabs type="line" animated>
    <n-tab-pane name="aaaa" tab="文本模式"></n-tab-pane>
    <n-tab-pane name="bbbb" tab=""></n-tab-pane>
  </n-tabs>
  <div v-if="EditMode.TEXT === mode">
    <div>
      <NButton @click="onClearInputText">清空文本</NButton>
    </div>
    <div class="flex">
      <div class="w-[50%]">
        <NInput v-model:value="inputText" type="textarea" placeholder="基本的 Textarea" />
      </div>
      <div class="w-[50%] flex-shrink">
        <div>{{ questionnaire.paperName }}</div>
        <div v-for="i in questionnaire.questions">
          {{ i.subject }}
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="EditMode.VISUALIZATION === mode">1</div>
</template>

<script lang="ts" setup>
enum EditMode {
  TEXT,
  VISUALIZATION,
}

import { ref } from 'vue';
import { NInput, NButton, NTabPane, NTabs } from 'naive-ui';
import { questionnaire } from '@fucking-exam/template-data';

const mode = ref<EditMode>(EditMode.TEXT);
const inputText = ref('');

const onClearInputText = () => {
  console.log(inputText.value);
  inputText.value = '';

  mode.value = EditMode.VISUALIZATION;
};
</script>
