<template>
  <template v-if="PageOptionType.CREATE === pageOptionType && !mode">
    <t-row>
      <t-card class="cursor-pointer hover:opacity-70" @click="mode = QuestionnaireEditMode.TEXT">文本方式创建</t-card>
      <t-card class="cursor-pointer hover:opacity-70" @click="mode = QuestionnaireEditMode.VISUALIZATION"
        >操作界面创建
      </t-card>
    </t-row>
  </template>
  <template v-if="mode">
    <template v-if="mode === QuestionnaireEditMode.TEXT">
      <div>
        <NButton @click="inputText = ''">清空文本</NButton>
        <NButton @click="onParseText">解析</NButton>
        <t-button @click="onFinishTextEdit">完成创建</t-button>
      </div>
      <div class="flex">
        <div class="w-[50%]">
          <NInput v-model:value="inputText" type="textarea" rows="40" placeholder="请输入你的问题" />
        </div>
        <div class="w-[50%] flex-shrink">
          <div>{{ questionnaireData?.paperName }}</div>
          <div v-for="i in questionnaireData?.questions">
            <div>{{ showSubjectAndAnswer(i) }}</div>
            <div v-for="(option, index) in i.options">{{ OPTIONS_LETTER[index] }} {{ option.label }}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="mode === QuestionnaireEditMode.VISUALIZATION">
      <div class="text-[17px]">
        <div
          class="bg-[#fff] hover:bg-[#fafafa] border-b-[1px] border-t-0 border-x-0 border-[#e0e0e0] border-solid p-8"
        >
          {{ questionnaireData?.paperName }}
        </div>
        <question-option-item
          v-for="(question, index) in questionnaireData?.questions"
          :questions="questionnaireData?.questions"
          :questionData="question"
          :index="index"
          :is-display-edit="curEditIdOrUUID === question.id"
          @edit="onQuestionOptionItemEdit"
          @copy="onQuestionOptionItemCopy"
          @delete="onQuestionOptionItemDelete"
          @move-up="onQuestionOptionItemMoveUp"
          @move-down="onQuestionOptionItemMoveDown"
          @move-top="onQuestionOptionItemMoveTop"
          @move-bottom="onQuestionOptionItemMoveButton"
        ></question-option-item>
      </div>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { QuestionOptionItem } from '@/components';
import { showSubjectAndAnswer } from '@/utils';
import { OPTIONS_LETTER, QuestionTextInputValueTemplate } from '@fucking-exam/shared';
import { PageOptionType, Question, QuestionnaireEditMode, QuestionType } from '@fucking-exam/types';
import { NButton, NInput } from 'naive-ui';
import { Button, Card, MessagePlugin, Row, DialogPlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidV4 } from 'uuid';

type QuestionnaireData = { paperName: string; questions: Question[] };

const route = useRoute();
const router = useRouter();

const pageOptionType = ref<PageOptionType>();
const questionnaireData = ref<QuestionnaireData>();
const mode = ref<QuestionnaireEditMode>();
const inputText = ref(QuestionTextInputValueTemplate);
const curEditIdOrUUID = ref('');

onMounted(() => {
  const state = history.state as { type?: PageOptionType };
  if (state.type) {
    pageOptionType.value = state.type;
  }
});

const onFinishTextEdit = () => {
  if (questionnaireData.value) {
    mode.value = QuestionnaireEditMode.VISUALIZATION;
  } else {
    MessagePlugin.warning('请先解析内容，在完成编辑');
  }
};

const onParseText = () => {
  const _questionnaireData = {
    paperName: '',
    questions: [],
  } as QuestionnaireData;
  const str = inputText.value;

  function splitByEmptyLine(str) {
    return str.split(/\n{2,}/);
  }

  const questionsStrArr = splitByEmptyLine(str);

  try {
    questionsStrArr.forEach((q) => {
      const question = {
        type: QuestionType.SINGLE_CHOICE,
        subject: '',
        options: [],
        analyze: '',
      } as Question;

      const lines = q
        .split(/\n/)
        .map((i) => i.trim())
        .filter((i) => i);

      if (lines.map((i) => i.trim()).filter((i) => i).length === 1) {
        _questionnaireData.paperName = lines[0];
      } else {
        const firstLine = lines.shift();
        const firstLineMatch = firstLine.match(/[(（]([A-Z]+)[)）]/g);
        const answerStr = firstLineMatch[firstLineMatch.length - 1];
        question.subject = firstLine.replace(answerStr, '($ANSWER)').trim();
        const answerStrNoParentheses = answerStr.replace(/[(（]|[)）]/g, '');

        if (answerStrNoParentheses.length > 1) {
          question.type = QuestionType.MULTIPLE_CHOICE;
          question.answers = answerStrNoParentheses.split('');
        } else {
          question.type = QuestionType.SINGLE_CHOICE;
          question.answer = answerStrNoParentheses;
        }

        const lastLine = lines.pop();
        let analyzeMatch = lastLine.match(/^解析：(.*)/);
        if (analyzeMatch) {
          question.analyze = analyzeMatch[1];
        } else {
          lines.push(lastLine);
        }

        question.options = lines.map((line) => {
          const [value, ...textArr] = line.split(' ');
          return {
            value,
            label: textArr.join(''),
          };
        });

        question.id = uuidV4();

        _questionnaireData.questions.push(question);
      }
    });

    questionnaireData.value = _questionnaireData;
  } catch (e) {
    MessagePlugin.warning('解析失败，请先输入内容');
  }
};

const onQuestionOptionItemEdit = (_, questionData: Question) => {
  curEditIdOrUUID.value = questionData.id;
};
const onQuestionOptionItemCopy = (index: number, questionData: Question) => {
  questionnaireData.value.questions.splice(index, 0, questionData);
};
const onQuestionOptionItemDelete = (index: number) => {
  const confirm = DialogPlugin.confirm({
    header: '删除确认',
    body: '确认删除该题目吗？',
    onConfirm: () => {
      questionnaireData.value.questions.splice(index, 1);
      confirm.hide();
    },
  });
};
const onQuestionOptionItemMoveUp = (index: number, questionData: Question) => {
  questionnaireData.value.questions.splice(index - 1, 0, questionData);
  questionnaireData.value.questions.splice(index + 1, 1);
};
const onQuestionOptionItemMoveDown = (index: number, questionData: Question) => {
  questionnaireData.value.questions.splice(index + 2, 0, questionData);
  questionnaireData.value.questions.splice(index, 1);
};
const onQuestionOptionItemMoveTop = (index: number) => {
  const delQuestion = questionnaireData.value.questions.splice(index, 1);
  questionnaireData.value.questions.unshift(delQuestion[0]);
};
const onQuestionOptionItemMoveButton = (index: number) => {
  const delQuestion = questionnaireData.value.questions.splice(index, 1);
  questionnaireData.value.questions.push(delQuestion[0]);
};
</script>
