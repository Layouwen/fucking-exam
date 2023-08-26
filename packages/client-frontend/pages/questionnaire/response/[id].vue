<template>
  <div class="bg-[#fff]">
    <questionnaire-render
      :type="QuestionnaireRenderType.QUESTIONNAIRE_RESPONSE"
      :data="data"
      :answers="answers"
      :result="answers"
    />
    <div class="px-6 pb-6">
      <van-button type="primary" block @click="router.push('/')">返回</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getQuestionnaireResponseApi } from '~/api'
import { QuestionnaireRender, QuestionnaireRenderType } from '~/components'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()

const data = ref<Record<string, any>>()
const answers = ref<Record<string, string[]>>()

onMounted(async () => {
  const { id } = route.params as { id: string }
  const res = await getQuestionnaireResponseApi(id)
  if (res.code === 200) {
    const {
      data: { questions, questionnaire, answers: _answers },
    } = res
    answers.value = _answers
    data.value = {
      paperName: questionnaire.paperName,
      questions,
      settings: questionnaire.settings,
    }
  }
})
</script>
