<script lang="ts" setup>
import { PageOptionType, QuestionnaireEditMode, questionType } from '@fucking-exam/shared';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';

import { v4 as uuidV4 } from 'uuid';
import { EditModeSelect, TextParse, QuestionListEdit } from '@/pages/questionnaire/components';
import { postQuestionnaireApi } from '@/api';
import { QuestionnaireData } from '@/pages/questionnaire/types';
import { checkQuestionnaireData, formatQuestionnaireData } from '@/utils';

const defaultAnswersUuid = uuidV4();

const defaultQuestionnaireData = {
  paperName: '卷子标题示例',
  questions: [
    {
      id: uuidV4(),
      type: questionType.SINGLE_CHOICE,
      subject: 'Fucking Exam 好不好用?（）',
      options: [
        {
          label: '那必须好用',
          value: defaultAnswersUuid,
        },
        {
          label: '一般般好用啦',
          value: uuidV4(),
        },
      ],
      order: 99999,
      answers: [defaultAnswersUuid],
      analyze: '',
      settings: {
        randomType: '0',
      },
    },
  ],
  settings: {
    isDisplayOrder: false,
    randomType: '1',
  },
  type: 0,
} as QuestionnaireData;

const router = useRouter();

const pageOptionType = ref<PageOptionType>();
const questionnaireData = ref<QuestionnaireData>(defaultQuestionnaireData);
const mode = ref<QuestionnaireEditMode>();

onMounted(() => {
  const state = window.history.state as { type?: PageOptionType };
  if (state.type) {
    pageOptionType.value = state.type;
  }
});

const queryClient = useQueryClient();
const { mutate: postQuestionnaire } = useMutation({
  mutationFn: (data: QuestionnaireData) => postQuestionnaireApi(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['getQuestionnaireListApi'] });
    router.push('/questionnaire/list');
  },
});

const onPost = (questionnaireData: QuestionnaireData) => {
  const checkResult = checkQuestionnaireData(questionnaireData);

  if (!checkResult.status) {
    MessagePlugin.warning(checkResult.msg);
    return;
  }

  // TODO: 后端数据格式未统一, 选择题和富文本的形式
  console.log(formatQuestionnaireData(questionnaireData));
  // postQuestionnaire(questionnaireData);
};

const onFinishTextEdit = () => {
  if (questionnaireData.value) {
    mode.value = QuestionnaireEditMode.VISUALIZATION;
  } else {
    MessagePlugin.warning('请先解析内容，在完成编辑');
  }
};

const onUpdateQuestionAnalyze = ({ index, analyze }: { index: number; analyze: string }) => {
  questionnaireData.value.questions[index].analyze = analyze;
};
</script>

<template>
  <template v-if="PageOptionType.CREATE === pageOptionType && !mode">
    <edit-mode-select v-model="mode" />
  </template>
  <template v-if="mode">
    <template v-if="mode === QuestionnaireEditMode.TEXT">
      <text-parse v-model:questionnaire-data="questionnaireData" @finish="onFinishTextEdit" />
    </template>
    <template v-if="mode === QuestionnaireEditMode.VISUALIZATION">
      <question-list-edit
        v-model:questionnaire-data="questionnaireData"
        v-model:questions="questionnaireData.questions"
        v-model:paper-name="questionnaireData.paperName"
        v-model:type="questionnaireData.type"
        v-model:is-display-order="questionnaireData.settings.isDisplayOrder"
        v-model:random-type="questionnaireData.settings.randomType"
        @post="onPost"
        @update-question-analyze="onUpdateQuestionAnalyze"
      />
    </template>
  </template>
</template>
