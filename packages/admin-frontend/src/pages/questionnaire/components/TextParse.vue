<script lang="ts" setup>
import { QuestionTextInputValueTemplate2, Question, questionType, OPTIONS_LETTER } from '@fucking-exam/shared';
import { ref, defineEmits, defineProps, PropType } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { v4 as uuidV4 } from 'uuid';

import { showSubjectAndAnswer } from '@/utils';
import { QuestionnaireData } from '@/pages/questionnaire/types';

const AUTOSIZE = {
  minRows: 40,
  maxRows: 40,
};

defineProps({
  questionnaireData: {
    type: Object as PropType<QuestionnaireData>,
    require: true,
  },
});

const emits = defineEmits({
  finish: () => true,
  'update:questionnaire-data': (questionnaireData: QuestionnaireData) => questionnaireData,
});

const inputText = ref<string>(QuestionTextInputValueTemplate2);

const onParseText = () => {
  const _questionnaireData = {
    paperName: '',
    questions: [],
    settings: {
      isDisplayOrder: false,
      randomType: '1',
    },
    type: 0,
  } as QuestionnaireData;

  const str = inputText.value;

  function splitByEmptyLine(str: string) {
    return str.split(/\n{2,}/);
  }

  const questionsStrArr = splitByEmptyLine(str);

  try {
    questionsStrArr.forEach((q, qIndex) => {
      const question = {
        type: questionType.SINGLE_CHOICE,
        subject: '',
        options: [],
        analyze: '',
        order: qIndex,
        settings: {
          randomType: '0',
        },
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
        question.subject = firstLine.replace(answerStr, '（）').trim();
        const answerStrNoParentheses = answerStr.replace(/[(（]|[)）]/g, '');
        const answerUUIDMap = new Map();

        const lastLine = lines.pop();
        const analyzeMatch = lastLine.match(/^解析：(.*)/);
        if (analyzeMatch) {
          question.analyze = analyzeMatch[1];
        } else {
          lines.push(lastLine);
        }

        question.options = lines.map((line) => {
          const regExp = /^([A-Z])[、.。．]?\s*/;
          const match = line.match(regExp);
          // window.line = line
          const value = match[1];
          const [, ...textArr] = line.split(/^[A-Z][、.。．]?\s*/);
          const uuid = uuidV4();
          answerUUIDMap.set(value, uuid);
          return {
            value: uuid,
            label: textArr.join('').trim(),
          };
        });

        if (answerStrNoParentheses.length > 1) {
          question.type = questionType.multipleChoice;
          question.answers = answerStrNoParentheses.split('').map((i) => answerUUIDMap.get(i));
        } else {
          question.type = questionType.SINGLE_CHOICE;
          question.answers = [answerUUIDMap.get(answerStrNoParentheses)];
        }

        question.id = uuidV4();

        _questionnaireData.questions.push(question);
      }
    });

    // TODO add order
    // _questionnaireData.forEach

    emits('update:questionnaire-data', _questionnaireData);
  } catch (e) {
    // console.log('解析失败', window.line, e);
    MessagePlugin.warning('解析失败，请先输入内容');
  }
};
</script>

<template>
  <div>
    <t-button theme="default" @click="inputText = ''">清空文本</t-button>
    <t-button theme="default" @click="onParseText">解析</t-button>
    <t-button @click="$emit('finish')">完成创建</t-button>
  </div>
  <div class="flex">
    <div class="w-[50%]">
      <t-textarea v-model:value="inputText" :autosize="AUTOSIZE" placeholder="请输入你的问卷内容" />
    </div>
    <div class="w-[50%] flex-shrink">
      <div>{{ questionnaireData?.paperName }}</div>
      <div v-for="i in questionnaireData?.questions" :key="i.id">
        <div>{{ showSubjectAndAnswer(i) }}</div>
        <div v-for="(option, index) in i.options" :key="option.value">
          {{ OPTIONS_LETTER[index] }} {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>
