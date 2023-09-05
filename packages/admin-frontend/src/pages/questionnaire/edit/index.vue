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
        <t-button theme="default" @click="inputText = ''">清空文本</t-button>
        <t-button theme="default" @click="onParseText">解析</t-button>
        <t-button @click="onFinishTextEdit">完成创建</t-button>
      </div>
      <div class="flex">
        <div class="w-[50%]">
          <t-textarea v-model:value="inputText" :autosize="autosize" placeholder="请输入你的问卷内容" />
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
    <template v-if="mode === QuestionnaireEditMode.VISUALIZATION">
      <div class="text-[17px] bg-[#fff]">
        <div v-if="questionnaireData" class="px-8 pt-8 flex items-center justify-between">
          <t-space>
            <t-space align="center">
              <span>是否公开</span>
              <t-switch v-model:value="questionnaireData.type" :custom-value="[0, 1]" size="large" />
            </t-space>
            <t-space align="center">
              <span>显示序号：</span>
              <t-switch v-model:value="questionnaireData.settings.isDisplayOrder" size="large" />
            </t-space>
            <t-space align="center">
              <span>随机题目顺序：</span>
              <t-switch v-model:value="questionnaireData.settings.randomType" :custom-value="['1', '0']" size="large" />
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
          @confirm="(val: string)=>{questionnaireData.paperName = val}"
          @close="paperNameDialogVisible = false"
        />
        <input-edit-modal
          type="textarea"
          header="题目解析"
          :input-value-default="questionnaireData.questions?.[analyzeIndex]?.analyze || ''"
          :visible="analyzeDialogVisible"
          @confirm="(val: string)=>{questionnaireData.questions[analyzeIndex].analyze = val}"
          @close="analyzeDialogVisible = false"
        />
        <question-option-item
          v-for="(question, index) in questionnaireData?.questions"
          :key="question.id"
          :questions="questionnaireData?.questions"
          :questionData="question"
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
  </template>
</template>

<script lang="ts" setup>
import {
  OPTIONS_LETTER,
  // QuestionTextInputValueTemplate,
  moveUpByArr,
  moveDownByArr,
  moveBottomByArr,
  moveTopByArr,
  QuestionnaireSettings,
  PageOptionType,
  Question,
  QuestionnaireEditMode,
  questionType,
  QuestionTextInputValueTemplate2,
} from '@fucking-exam/shared';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { v4 as uuidV4 } from 'uuid';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import InputEditModal from '@/pages/questionnaire/components/InputEditModal.vue';
import { QuestionOptionItem } from '@/components';
import { postQuestionnaireApi } from '@/api';
import { showSubjectAndAnswer } from '@/utils';

type QuestionnaireData = {
  paperName: string;
  questions: Question[];
  settings: QuestionnaireSettings;
  type: 0 | 1;
};

const router = useRouter();

const pageOptionType = ref<PageOptionType>();
const questionnaireData = ref<QuestionnaireData>();
const mode = ref<QuestionnaireEditMode>();
const inputText = ref(QuestionTextInputValueTemplate2);
const curEditIdOrUUID = ref('');
const paperNameDialogVisible = ref(false);
const analyzeDialogVisible = ref(false);
const analyzeIndex = ref<number>();
const autosize = ref<any>({
  minRows: 40,
  maxRows: 40,
});

onMounted(() => {
  const state = window.history.state as { type?: PageOptionType };
  if (state.type) {
    pageOptionType.value = state.type;
  }
});

const onSave = () => {
  console.log(JSON.stringify(questionnaireData.value), 'save value');
  // TODO
  MessagePlugin.warning('暂未实现保存');
};

const queryClient = useQueryClient();
const { mutate: postQuestionnaire } = useMutation({
  mutationFn: (data: any) => postQuestionnaireApi(data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['getQuestionnaireListApi'] });
    router.push('/questionnaire/list');
  },
});

const inputRef = ref();
const tags = ref<string[]>([]);
const isInputTag = ref(false);

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
  console.log('layouwen text', text);
  if (!text || text.trim() === '') {
    MessagePlugin.warning('标签不能为空');
  } else {
    tags.value.push(text);
  }
  isInputTag.value = false;
};

const onPost = () => {
  postQuestionnaire({ ...questionnaireData.value, tags: tags.value });
};

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
    settings: {
      isDisplayOrder: false,
      randomType: '1',
    },
    type: 0,
  } as QuestionnaireData;
  const str = inputText.value;

  function splitByEmptyLine(str) {
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
      } as unknown as Question;

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
        let analyzeMatch = lastLine.match(/^解析：(.*)/);
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

    questionnaireData.value = _questionnaireData;
  } catch (e) {
    // console.log('解析失败', window.line, e);
    MessagePlugin.warning('解析失败，请先输入内容');
  }
};

const onEditAnalyze = (index: number) => {
  console.log(index, 'layouwen');
  analyzeIndex.value = index;
  analyzeDialogVisible.value = true;
};

const onQuestionOptionItemEdit = (_, questionData: Question) => {
  if (curEditIdOrUUID.value === questionData.id) curEditIdOrUUID.value = '';
  else curEditIdOrUUID.value = questionData.id as string;
};

const onAddNextQuestion = (index: number) => {
  const value = uuidV4();
  questionnaireData.value.questions.splice(index + 1, 0, {
    id: uuidV4(),
    type: questionType.SINGLE_CHOICE,
    subject: '新增题目（）',
    options: [
      {
        label: '新增选项',
        value,
      },
    ],
    order: 99999,
    answers: [value],
    analyze: '',
    settings: {
      randomType: '0',
    },
  });
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
const onQuestionOptionItemMoveUp = (index: number) => {
  questionnaireData.value.questions = moveUpByArr(questionnaireData.value.questions, index);
};
const onQuestionOptionItemMoveDown = (index: number) => {
  questionnaireData.value.questions = moveDownByArr(questionnaireData.value.questions, index);
};
const onQuestionOptionItemMoveTop = (index: number) => {
  questionnaireData.value.questions = moveTopByArr(questionnaireData.value.questions, index);
};
const onQuestionOptionItemMoveButton = (index: number) => {
  questionnaireData.value.questions = moveBottomByArr(questionnaireData.value.questions, index);
};
</script>
