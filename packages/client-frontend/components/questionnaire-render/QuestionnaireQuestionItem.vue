<template>
  <div class="text-[#262626] py-5">
    <div class="text-[17px] font-bold mb-2">{{ displayOrder }}{{ question.subject }}</div>
    <div class="text-[16px] space-y-2">
      <!-- 
        TODO: 正确和错误的高亮
          :class="[
            borderClass(index, question.options.length),
            {
              error: isErrorClass(option.value, answers[question.id], question.answers),
              right: isRightClass(option.value, answers[question.id], question.answers),
            },
          ]"
     -->
      <CheckboxGroup
        v-if="question.type === 'multipleChoice'"
        v-model:value="result[question.id]"
        :options="question.options"
        :disabled="QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE === type"
      />
      <RadioGroup
        v-else-if="question.type === 'singleChoice'"
        v-model:value="result[question.id]"
        :options="question.options"
        :disabled="QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE === type"
      />
      <div v-else>not support</div>
      <div class="space-y-2" v-if="type === QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE">
        <div v-if="isRight" class="text-[green] text-[15px] bg-[#f7f7f7] p-2 rounded-md flex items-center space-x-2">
          <Icon name="check-circle-filled" />
          <span>回答正确</span>
        </div>
        <div v-else class="text-[red] text-[15px] bg-[#f7f7f7] p-2 rounded-[2px] flex items-center space-x-2">
          <Icon name="close-circle-filled" />
          <span>回答错误</span>
        </div>
        <div v-if="!isRight || question.analyze" class="text-[14px] bg-[#f7f7f7] p-2 rounded-[2px]">
          <template v-if="!isRight">
            <div class="text-[green]">正确答案:</div>
            <div v-for="text in rightAnswers" key="text">{{ text }}</div>
          </template>
          <template v-if="question.analyze">
            <div class="text-[#595959]">答案解析:</div>
            <div class="text-[#8c8c8c]">{{ question.analyze }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QuestionnaireQuestionItem',
})
</script>

<script lang="ts" setup>
import { QuestionnaireRenderType } from './type'
import { defineProps, computed } from 'vue'
import { Icon } from 'tdesign-vue-next'
import CheckboxGroup from './CheckboxGroup.vue'
import RadioGroup from './RadioGroup.vue'

const props = withDefaults(
  defineProps<{
    data: any
    question: any
    result: any
    type?: QuestionnaireRenderType
    index: number
    answers?: Record<string, string[]>
  }>(),
  {
    type: QuestionnaireRenderType.QUESTIONNAIRE,
    answers: {},
  }
)

const displayOrder = computed(() => {
  return props.data.settings.isDisplayOrder ? `${props.index! + 1}、` : ''
})

const borderClass = (index: number, length: number) => {
  const borderBottom = index === length - 1 ? 'border-b-0 ' : 'border-b-[1px]'
  return `${borderBottom} border-t-0 border-l-0 border-r-0 border-solid p-3 border-[#e3e3e3]`
}

const isRight = computed(() => {
  if (props.type !== QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE) return false
  const {
    answers: myAnswers,
    question: { id, answers },
  } = props
  const arr = myAnswers![id]
  return answers.every((item: string) => arr.includes(item))
})

const isSelect = (value: any, myAnswers: any) => {
  const curAnswersArr = Array.isArray(myAnswers) ? myAnswers : [myAnswers]
  return curAnswersArr.includes(value)
}

const isRightClass = (value: any, myAnswers: any, answers: any) => {
  return isSelect(value, myAnswers) && answers.includes(value)
}

const isErrorClass = (value: any, myAnswers: any, answers: any) => {
  const curAnswersArr = Array.isArray(myAnswers) ? myAnswers : [myAnswers]
  return curAnswersArr.includes(value) && !answers.includes(value)
}

const rightAnswers = computed(() => {
  if (props.type !== QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE) return []
  const {
    question: { answers, options },
  } = props
  return answers.map((v: string) => options.find((item: any) => item.value === v).label)
})
</script>

<style scoped lang="less">
@right-color: #00a870;
@error-color: #ff4d4f;

.right {
  :deep {
    .n-checkbox__label,
    .n-radio__label {
      color: @right-color;
    }

    .n-radio__dot--checked {
      box-shadow: inset 0 0 0 1px @right-color;

      &::before {
        background: @right-color;
      }
    }
  }
}

.error {
  :deep {
    .n-checkbox__label,
    .n-radio__label {
      color: @error-color;
    }

    .n-radio__dot--checked {
      box-shadow: inset 0 0 0 1px @error-color;

      &::before {
        background: @error-color;
      }
    }
  }
}
</style>
