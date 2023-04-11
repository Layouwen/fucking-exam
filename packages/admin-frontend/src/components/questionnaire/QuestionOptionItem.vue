<template>
  <div
    @mouseenter="isDisplayController = true"
    @mouseleave="isDisplayController = false"
    class="relative bg-[#fff] hover:bg-[#fafafa] border-b-[1px] border-t-0 border-x-0 border-[#e0e0e0] border-solid pt-8 px-8 pb-10 space-y-3"
  >
    <div class="font-bold">{{ showSubjectAndAnswer(questionData) }}</div>
    <div class="text-[15px]" v-for="(option, index) in questionData.options">
      {{ OPTIONS_LETTER[index] }} {{ option.label }}
    </div>
    <div
      v-show="isDisplayController && !isDisplayEdit"
      class="flex items-center justify-between absolute bottom-2 left-0 right-0 px-8"
    >
      <a class="text-[14px] text-[#423fd5]">往后插入新题</a>
      <div class="text-[12px]">
        <t-button
          :disabled="isDisabled(button.emitName)"
          v-for="button in QUESTION_OPTION_ITEM_BUTTONS"
          :key="button.emitName"
          size="small"
          @click="onButton(button, index, questionData, questions)"
          >{{ button.text }}
        </t-button>
      </div>
    </div>
  </div>
  <div v-show="isDisplayEdit" class="bg-[#fafafa]">1233333333333123 213 123123</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuestionOptionItem',
});
</script>

<script lang="ts" setup>
import {
  OPTIONS_LETTER,
  QUESTION_OPTION_ITEM_BUTTONS,
  QUESTION_OPTION_ITEM_BUTTONS_EMIT_NAMES,
} from '@fucking-exam/shared';
import { Question } from '@fucking-exam/types';
import { defineProps, PropType, ref } from 'vue';
import { showSubjectAndAnswer } from '@/utils';

const emits = defineEmits(QUESTION_OPTION_ITEM_BUTTONS_EMIT_NAMES);

const props = defineProps({
  questionData: {
    type: Object as PropType<Question>,
    required: true,
  },
  questions: {
    type: Object as PropType<Question[]>,
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
});

const isDisplayController = ref(false);

const isDisabled = (emitName: (typeof QUESTION_OPTION_ITEM_BUTTONS_EMIT_NAMES)[number]) => {
  const topUnSHowNames = QUESTION_OPTION_ITEM_BUTTONS.filter((b) => b.topUnShow).map((b) => b.emitName);
  const bottomUnShowNames = QUESTION_OPTION_ITEM_BUTTONS.filter((b) => b.bottomUnShow).map((b) => b.emitName);

  if (topUnSHowNames.includes(emitName)) {
    return props.index === 0;
  } else if (bottomUnShowNames.includes(emitName)) {
    return props.index === props.questions.length - 1;
  } else {
    return false;
  }
};

const onButton = (
  button: (typeof QUESTION_OPTION_ITEM_BUTTONS)[number],
  ...args: [index: number, questionData: Question, questions: Question[]]
) => {
  emits(button.emitName, ...args);
};
</script>
