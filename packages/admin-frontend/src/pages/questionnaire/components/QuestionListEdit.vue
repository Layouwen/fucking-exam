<script lang="ts" setup>
import { defineProps, PropType, defineEmits, ref } from 'vue';
import { v4 as uuidV4 } from 'uuid';
import { MessagePlugin, DialogPlugin } from 'tdesign-vue-next';
import {
  moveBottomByArr,
  moveDownByArr,
  moveTopByArr,
  moveUpByArr,
  Question,
  QuestionModel,
  questionType,
} from '@fucking-exam/shared';

import { InputEditModal } from '@/pages/questionnaire/components';
import { QuestionOptionItem } from '@/components';
import { QuestionnaireData } from '@/pages/questionnaire/types';

const props = defineProps({
  questionnaireData: {
    type: Object as PropType<QuestionnaireData>,
    required: true,
  },
});

const emit = defineEmits({
  'update:questionnaire-data': (questionnaireData: QuestionnaireData) => questionnaireData,
  'update:questions': (questions: (Question | QuestionModel)[]) => questions,
  'update:paper-name': (paperName: string) => paperName,
  'update:type': (type: 0 | 1) => type,
  'update:is-display-order': (isDisplayOrder: '1' | '0') => isDisplayOrder,
  'update:random-type': (randomType: '0' | '1') => randomType,
  post: (questionnaireData: QuestionnaireData) => questionnaireData,
  'update-question-analyze': (data: { index: number; analyze: string }) => data,
});

const inputRef = ref();
const isInputTag = ref(false);
const tags = ref<string[]>([]);

const onClickAddTag = () => {
  isInputTag.value = true;
  setTimeout(() => {
    inputRef.value.focus();
  }, 0);
};

const onAddTagBlur = () => {
  isInputTag.value = false;
};

const onAddTag = (text: string) => {
  if (!text || text.trim() === '') {
    MessagePlugin.warning('标签不能为空');
  } else {
    tags.value.push(text);
  }
  isInputTag.value = false;
};

const onSave = () => {
  console.log(JSON.stringify(props.questionnaireData), 'save value');
  // TODO
  MessagePlugin.warning('暂未实现保存');
};

const onPost = () => {
  emit('post', { ...props.questionnaireData, tags: tags.value });
};

const paperNameDialogVisible = ref(false);
const curEditIdOrUUID = ref('');
const analyzeDialogVisible = ref(false);
const analyzeIndex = ref<number>();

const onEditAnalyze = (index: number) => {
  analyzeIndex.value = index;
  analyzeDialogVisible.value = true;
};

const onQuestionOptionItemEdit = (_, questionData: Question) => {
  if (curEditIdOrUUID.value === questionData.id) curEditIdOrUUID.value = '';
  else curEditIdOrUUID.value = questionData.id as string;
};

const onAddNextQuestion = (index: number) => {
  const _questions = [...props.questionnaireData.questions];
  const defaultAnswersUuid = uuidV4();

  _questions.splice(index + 1, 0, {
    id: uuidV4(),
    type: questionType.SINGLE_CHOICE,
    subject: '新增题目（）',
    options: [
      {
        label: '新增选项',
        value: defaultAnswersUuid,
      },
    ],
    order: 99999,
    answers: [defaultAnswersUuid],
    analyze: '',
    settings: {
      randomType: '0',
    },
  });

  emit('update:questions', _questions);
};

const onQuestionOptionItemCopy = (index: number, questionData: Question) => {
  const _questions = [...props.questionnaireData.questions];
  _questions.splice(index, 0, questionData);
  emit('update:questions', _questions);
};
const onQuestionOptionItemDelete = (index: number) => {
  const confirm = DialogPlugin.confirm({
    header: '删除确认',
    body: '确认删除该题目吗？',
    onConfirm: () => {
      emit(
        'update:questions',
        props.questionnaireData.questions.filter((_, i) => i !== index),
      );
      confirm.hide();
    },
  });
};

const onUpdateQuestionAnalyze = (analyze: string) => {
  emit('update-question-analyze', {
    index: analyzeIndex.value,
    analyze,
  });
};

const onQuestionOptionItemMoveUp = (index: number) => {
  emit('update:questions', moveUpByArr(props.questionnaireData.questions, index));
};
const onQuestionOptionItemMoveDown = (index: number) => {
  emit('update:questions', moveDownByArr(props.questionnaireData.questions, index));
};
const onQuestionOptionItemMoveTop = (index: number) => {
  emit('update:questions', moveTopByArr(props.questionnaireData.questions, index));
};
const onQuestionOptionItemMoveButton = (index: number) => {
  emit('update:questions', moveBottomByArr(props.questionnaireData.questions, index));
};
</script>

<template>
  <div class="text-[17px] bg-[#fff]">
    <div v-if="questionnaireData" class="px-8 pt-8 flex items-center justify-between">
      <t-space>
        <t-space align="center">
          <span>是否公开</span>
          <t-switch
            :value="questionnaireData.type"
            :custom-value="[0, 1]"
            size="large"
            @update:value="$emit('update:type', $event)"
          />
        </t-space>
        <t-space align="center">
          <span>显示序号：</span>
          <t-switch
            :value="questionnaireData.settings.isDisplayOrder"
            size="large"
            @update:value="$emit('update:is-display-order', $event)"
          />
        </t-space>
        <t-space align="center">
          <span>随机题目顺序：</span>
          <t-switch
            :value="questionnaireData.settings.randomType"
            :custom-value="['1', '0']"
            size="large"
            @update:value="$emit('update:random-type', $event)"
          />
        </t-space>
        <t-space align="center">
          <span>标签：</span>
          <t-tag v-for="tag in tags" :key="tag" theme="primary" variant="light">{{ tag }}</t-tag>
          <t-tag v-if="!isInputTag" @click="onClickAddTag">添加标签</t-tag>
          <t-input
            v-else
            ref="inputRef"
            size="small"
            style="width: 94px"
            placeholder="请输入标签名"
            @blur="onAddTagBlur"
            @enter="onAddTag"
          />
        </t-space>
      </t-space>
      <t-space>
        <t-button @click="onSave">保存</t-button>
        <t-button @click="onPost">发布问卷</t-button>
      </t-space>
    </div>
    <div
      class="cursor-pointer bg-[#fff] hover:bg-[#fafafa] border-b-[1px] border-t-0 border-x-0 border-[#e0e0e0] border-solid p-8"
      @click="paperNameDialogVisible = true"
    >
      {{ questionnaireData?.paperName }}
    </div>
    <input-edit-modal
      header="问卷名称"
      :input-value-default="questionnaireData?.paperName"
      :visible="paperNameDialogVisible"
      @confirm="emit('update:paper-name', $event)"
      @close="paperNameDialogVisible = false"
    />
    <input-edit-modal
      type="textarea"
      header="题目解析"
      :input-value-default="questionnaireData.questions?.[analyzeIndex]?.analyze || ''"
      :visible="analyzeDialogVisible"
      @confirm="onUpdateQuestionAnalyze"
      @close="analyzeDialogVisible = false"
    />
    <question-option-item
      v-for="(question, index) in questionnaireData?.questions"
      :key="question.id"
      :questions="questionnaireData.questions"
      :question-data="question"
      :index="index"
      :is-display-edit="curEditIdOrUUID === question.id"
      :settings="questionnaireData.settings"
      @item="onQuestionOptionItemEdit"
      @edit-analyze="onEditAnalyze"
      @add-next-question="onAddNextQuestion"
      @edit="onQuestionOptionItemEdit"
      @copy="onQuestionOptionItemCopy"
      @delete="onQuestionOptionItemDelete"
      @move-up="onQuestionOptionItemMoveUp"
      @move-down="onQuestionOptionItemMoveDown"
      @move-top="onQuestionOptionItemMoveTop"
      @move-bottom="onQuestionOptionItemMoveButton"
      @finish="curEditIdOrUUID = ''"
    />
  </div>
</template>
