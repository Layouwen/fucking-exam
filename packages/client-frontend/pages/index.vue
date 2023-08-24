<template>
  <Header />
  <div class="min-h-[calc(100vh-50px-48px)] mt-[50px] flex flex-col">
    <div class="px-4 pt-4 flex-grow">
      <t-card
        class="mb-4"
        v-for="i in questionnaireList"
        :key="i.id"
        :title="i.paperName"
        @click="onClickQuestionnaire(i.id)"
      >
        创建日期: {{ dayjs(i.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
      </t-card>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { getQuestionnaireListApi } from '~/api'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
const questionnaireList = ref<any>([])

onMounted(async () => {
  const listRes = await getQuestionnaireListApi()
  questionnaireList.value = listRes.data.list
})

const onClickQuestionnaire = (id: number) => {
  navigateTo(`/questionnaire/${id}`)
}
</script>
