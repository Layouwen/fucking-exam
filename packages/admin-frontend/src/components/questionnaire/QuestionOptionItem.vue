<script lang="ts" setup>
import { defineProps, PropType, ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import {
  QUESTION_OPTION_ITEM_BUTTONS,
  QUESTION_OPTION_ITEM_BUTTONS_EMIT_NAMES,
  QuestionnaireSettings,
  Question,
  moveDownByArr,
  moveUpByArr,
  isFirstByArr,
  isLastByArr,
  questionType,
  QuestionModel,
} from '@fucking-exam/shared';
import { v4 as uuidV4 } from 'uuid';
import RichEdit from './RichEdit.vue';

const choiceMode = [questionType.SINGLE_CHOICE, questionType.multipleChoice];
const richTextMode = [questionType.RICH_TEXT];

const emits = defineEmits([
  ...QUESTION_OPTION_ITEM_BUTTONS_EMIT_NAMES,
  'item',
  'finish',
  'editAnalyze',
  'addNextQuestion',
]);

const props = defineProps({
  questionData: {
    type: Object as PropType<Question | QuestionModel>,
    required: true,
  },
  questions: {
    type: Object as PropType<(Question | QuestionModel)[]>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isDisplayEdit: {
    type: Boolean,
    required: false,
  },
  settings: {
    type: Object as PropType<QuestionnaireSettings>,
    required: true,
  },
});

const displayOrder = (index: number) => {
  return props.settings.isDisplayOrder ? `${index + 1}、 ` : '';
};

const isDisplayController = ref(false);

const isChecked = (option) => {
  return props.questionData.answers.includes(option.value);
};

const isDisabled = (emitName: (typeof QUESTION_OPTION_ITEM_BUTTONS_EMIT_NAMES)[number]) => {
  const topUnSHowNames = QUESTION_OPTION_ITEM_BUTTONS.filter((b) => b.topUnShow).map((b) => b.emitName);
  const bottomUnShowNames = QUESTION_OPTION_ITEM_BUTTONS.filter((b) => b.bottomUnShow).map((b) => b.emitName);

  if (topUnSHowNames.includes(emitName)) {
    return isFirstByArr(props.questions, props.index);
  }
  if (bottomUnShowNames.includes(emitName)) {
    return isLastByArr(props.questions, props.index);
  }
  return false;
};

const onAddNextOption = (optionIndex: number) => {
  props.questionData.options.splice(optionIndex + 1, 0, {
    label: '新增选项',
    value: uuidV4(),
  });
};

const onDeleteOption = (option) => {
  if (props.questionData.options.length === 1) {
    MessagePlugin.warning('至少保留一个选项');
    return;
  }

  props.questionData.answers = props.questionData.answers.filter((i) => i !== option.value);
  props.questionData.options = props.questionData.options.filter((i) => i.value !== option.value);
};

const onSelectOption = (option) => {
  if (isChecked(option)) {
    props.questionData.answers = props.questionData.answers.filter((v) => v !== option.value);
  } else {
    props.questionData.answers.push(option.value);
  }
};

const onMoveUp = (optionIndex: number) => {
  if (optionIndex === 0) {
    return;
  }
  props.questionData.options = moveUpByArr(props.questionData.options, optionIndex);
};

const onMoveDown = (optionIndex: number) => {
  if (optionIndex === props.questionData.options.length - 1) {
    return;
  }
  props.questionData.options = moveDownByArr(props.questionData.options, optionIndex);
};

const onAddOption = () => {
  props.questionData.options.push({
    label: '新增选项',
    value: uuidV4(),
  });
};

const onButton = (
  button: (typeof QUESTION_OPTION_ITEM_BUTTONS)[number],
  ...args: [index: number, questionData: Question, questions: Question[]]
) => {
  emits(button.emitName, ...args);
};
</script>

<template>
  <div
    class="cursor-pointer relative bg-[#fff] hover:bg-[#fafafa] border-b-[1px] border-t-0 border-x-0 border-[#e0e0e0] border-solid pt-8 px-8 pb-10 space-y-3"
    @mouseenter="isDisplayController = true"
    @mouseleave="isDisplayController = false"
    @click="$emit('item', index, questionData, questions)"
  >
    <div class="font-bold">{{ displayOrder(index) }}{{ questionData.subject }}</div>
    <template v-if="choiceMode.includes(questionData.type)">
      <div
        v-for="option in questionData.options"
        :key="option.value"
        :class="{ 'right-highlight': isChecked(option) }"
        class="text-[15px] flex items-center"
      >
        <t-checkbox :checked="isChecked(option)" />
        <span>{{ option.label }}</span>
        <span v-show="isChecked(option)">(正确答案)</span>
      </div>
      <div v-show="questionData.analyze" class="text-[#666]">答案解析：{{ questionData.analyze }}</div>
    </template>
    <template v-else-if="richTextMode.includes(questionData.type)">
      <rich-edit :is-show-toolbar="false" :read-only="true" :model-value="questionData.richText" />
    </template>
    <template v-else>未知类型</template>
    <div
      v-show="isDisplayController && !isDisplayEdit"
      class="flex items-center justify-between absolute bottom-2 left-0 right-0 px-8"
    >
      <t-space>
        <t-link underline hover="color" @click.stop="$emit('addNextQuestion', index)">往后插入新题</t-link>
      </t-space>
      <div class="text-[12px]">
        <t-button
          v-for="button in QUESTION_OPTION_ITEM_BUTTONS"
          :key="button.emitName"
          :disabled="isDisabled(button.emitName)"
          size="small"
          @click.stop="onButton(button, index, questionData, questions)"
          >{{ button.text }}
        </t-button>
      </div>
    </div>
  </div>
  <div
    v-show="isDisplayEdit"
    class="bg-[#fafafa] px-8 py-4 border-b-[1px] border-t-0 border-x-0 border-[#e0e0e0] border-solid space-y-4"
  >
    <t-space align="center">
      类型:
      <t-select
        v-model="questionData.type"
        :options="[
          {
            label: '选择题',
            value: questionType.SINGLE_CHOICE,
          },
          {
            label: '富文本',
            value: questionType.RICH_TEXT,
          },
        ]"
      />
    </t-space>
    <t-textarea v-model:value="questionData.subject" placeholder="请输入题目" />
    <t-space>
      <t-link underline @click.stop="$emit('editAnalyze', index)">编辑答案解析</t-link>
    </t-space>
    <div class="space-y-2">
      <template v-if="choiceMode.includes(questionData.type)">
        <div class="flex bg-[#f0f0ee] p-2">
          <span class="flex-grow">选项内容</span>
          <span class="w-[200px]">正确答案</span>
          <span class="w-[300px]">操作</span>
        </div>
        <div v-for="(option, optionIndex) in questionData.options" :key="option.value" class="flex">
          <div class="flex-grow flex items-center space-x-2 pr-8">
            <t-input v-model:value="option.label" placeholder="请输入内容" />
            <div class="flex items-center space-x-2 text-[24px]">
              <t-icon
                class="cursor-pointer hover:text-[#5997fc]"
                name="add-circle"
                @click="onAddNextOption(optionIndex)"
              />
              <t-icon class="cursor-pointer hover:text-[#5997fc]" name="minus-circle" @click="onDeleteOption(option)" />
            </div>
          </div>
          <div class="w-[200px] flex items-center">
            <t-checkbox :checked="isChecked(option)" @change="onSelectOption(option)" />
          </div>
          <div class="w-[300px] flex items-center text-[24px] space-x-2">
            <t-icon
              name="chevron-up-circle"
              class="hover:text-[#5997fc]"
              :class="{
                'cursor-pointer': !isFirstByArr(questionData.options, optionIndex),
                'cursor-not-allowed': isFirstByArr(questionData.options, optionIndex),
              }"
              @click="onMoveUp(optionIndex)"
            />
            <t-icon
              name="chevron-down-circle"
              class="hover:text-[#5997fc]"
              :class="{
                'cursor-pointer': !isLastByArr(questionData.options, optionIndex),
                'cursor-not-allowed': isLastByArr(questionData.options, optionIndex),
              }"
              @click="onMoveDown(optionIndex)"
            />
          </div>
        </div>
      </template>
      <div v-else-if="richTextMode.includes(questionData.type)">
        <rich-edit v-model="questionData.richText" />
      </div>
      <template v-else>未知类型</template>
      <div class="flex items-center space-x-2">
        <t-link underline @click="onAddOption">添加选项</t-link>
        <div>
          <t-select
            v-model:value="questionData.settings.randomType"
            :options="[
              {
                label: '选项不随机',
                value: '0',
              },
              {
                label: '选项随机',
                value: '1',
              },
            ]"
          />
        </div>
      </div>
    </div>
    <t-button class="mt-4" block size="large" @click="$emit('finish')">完成编辑</t-button>
  </div>
</template>

<style lang="less" scoped>
.right-highlight {
  color: #efa030;
}
</style>
