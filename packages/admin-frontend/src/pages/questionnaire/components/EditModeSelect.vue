<script lang="ts" setup>
import { QuestionnaireEditMode } from '@fucking-exam/shared';
import { defineEmits } from 'vue';

const emits = defineEmits({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars,vue/return-in-emits-validator
  'update:model-value': (mode: QuestionnaireEditMode) => null,
});

const onSetMode = (mode: QuestionnaireEditMode) => {
  emits('update:model-value', mode);
};
</script>

<template>
  <t-row>
    <t-card class="cursor-pointer hover:opacity-70" @click="onSetMode(QuestionnaireEditMode.TEXT)">文本方式创建</t-card>
    <t-card class="cursor-pointer hover:opacity-70" @click="onSetMode(QuestionnaireEditMode.VISUALIZATION)"
      >操作界面创建
    </t-card>
  </t-row>
</template>
