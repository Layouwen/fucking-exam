<template>
  <div v-if="data" class="pt-[16px]">
    <n-progress
      class="fixed top-0 left-0 w-full z-10"
      :indicator-placement="'inside'"
      type="line"
      :percentage="percentage"
      :height="16"
      :border-radius="0"
      :fill-border-radius="0"
    />
    <questionnaire-render :data="data" :result="answers" />
    <div class="px-6 pb-6">
      <NButton block type="info" @click="onSubmit">提交试卷</NButton>
      <NButton class="mt-2" block @click="router.push('/')">返回</NButton>
    </div>
  </div>
  <div v-else class="flex flex-col min-h-[100vh] items-center">
    <n-skeleton class="mt-[30px]" text height="32px" width="50%" />
    <template v-for="i in 2" :key="i">
      <div class="mt-[30px] w-[80%]">
        <n-skeleton text height="26px" width="70%" />
      </div>
      <n-skeleton class="mt-[10px]" height="46px" width="80%" />
      <n-skeleton class="mt-[6px]" height="46px" width="80%" />
      <n-skeleton class="mt-[6px]" height="46px" width="80%" />
      <n-skeleton class="mt-[6px]" height="46px" width="80%" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Questionnaire, QuestionnaireClientSubmitRequestBody, isLogin, randomByArr } from '@fucking-exam/shared'
import { NButton, NProgress, useMessage, NSkeleton } from 'naive-ui'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestionnaireApi, postQuestionnaireSubmitApi } from '~/api'
import { QuestionnaireRender } from '~/components'

const message = useMessage()
const route = useRoute()
const router = useRouter()

const questionnaireId = ref<string>()
const answers = ref<Record<string, string[]>>({})
const order = ref<string[] | number[]>()
const data = ref<Questionnaire>()

const percentage = computed(() => {
  if (!data.value) return 0
  return Math.floor((Object.keys(answers.value).length / data.value.questions.length) * 100)
})

onMounted(async () => {
  const { id } = route.params as { id: string }
  if (id) {
    questionnaireId.value = id

    const res = await getQuestionnaireApi(id)

    if (res.code === 200) {
      const { data: questionnaireData } = res

      if (questionnaireData.settings.randomType === '1') {
        questionnaireData.questions = randomByArr(questionnaireData.questions)
        questionnaireData.questions.forEach(question => {
          if (questionnaireData.settings.randomType === '1') {
            question.options = randomByArr(question.options)
          }
        })
      }

      order.value = questionnaireData.questions.map(question => question.id)

      data.value = questionnaireData
    }
  }
})

const onSubmit = async () => {
  if (!questionnaireId.value || !order.value || !data.value) return

  if (Object.keys(answers.value).length !== data.value.questions.length) {
    return message.warning('请完成所有题目')
  }

  const postData = {
    order: order.value,
    answers: answers.value,
    questions: data.value.questions,
    questionnaireVersion: data.value.version,
  } as QuestionnaireClientSubmitRequestBody

  if (!isLogin()) {
    const fingerprint = await getFingerprint()
    postData.fingerprint = fingerprint
  }

  try {
    const res = await postQuestionnaireSubmitApi(+questionnaireId.value, postData)
    if (res.code === 200) router.push(`/questionnaire/response/${res.data.id}`)
  } catch (e) {
    console.log(e)
  }
}
</script>
