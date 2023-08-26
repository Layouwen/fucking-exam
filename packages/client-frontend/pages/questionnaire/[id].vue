<template>
  <div v-if="data" class="pt-[16px] bg-[#fff]">
    <t-progress
      class="custom-progress fixed top-0 left-0 w-full z-10"
      :percentage="percentage"
      theme="plump"
      size="small"
    />
    <questionnaire-render :data="data" :result="answers" />
    <div class="px-6 pb-6">
      <van-button type="primary" block @click="onSubmit">提交试卷</van-button>
      <van-button block class="!mt-2" @click="router.push('/')">返回</van-button>
    </div>
  </div>
  <div v-else class="flex flex-col min-h-[100dvh] items-center bg-[#fff]">
    <t-skeleton
      class="!mt-[30px] w-full"
      :rowCol="[
        {
          height: 32,
          width: '50%',
          marginLeft: '25%',
        },
      ]"
      animation="gradient"
    />
    <template v-for="i in 2" :key="i">
      <div class="mt-[30px] w-full">
        <t-skeleton
          class="w-full"
          :rowCol="[
            {
              height: 26,
              width: '60%',
              marginLeft: '10%',
            },
          ]"
          animation="gradient"
        />
        <t-skeleton
          v-for="mt in [10, 6, 6, 6]"
          class="w-full"
          :style="{ marginTop: `${mt}px` }"
          :rowCol="[
            {
              height: 46,
              width: '80%',
              marginLeft: '10%',
            },
          ]"
          animation="gradient"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Questionnaire, QuestionnaireClientSubmitRequestBody, isLogin, randomByArr } from '@fucking-exam/shared'
import { showFailToast } from 'vant'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQuestionnaireApi, postQuestionnaireSubmitApi } from '~/api'
import { QuestionnaireRender } from '~/components'

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
    showFailToast('请完成所有题目')
    return
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

<style scoped lang="less">
.custom-progress {
  :deep(.t-progress--plump) {
    border-radius: 0 !important;
    .t-progress__inner {
      border-radius: 0 !important;
    }
  }
}
</style>
