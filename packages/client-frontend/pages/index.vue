<template>
  <Wrapper>
    <div class="flex flex-col pb-[calc(50px+30px)]">
      <div class="px-4 pt-3" v-for="i in questionnaireList" :key="i.id">
        <t-card :title="i.paperName" @click="onClickQuestionnaire(i.id)">
          创建日期: {{ dayjs(i.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </t-card>
      </div>
    </div>
  </Wrapper>
  <Tabbar />
</template>

<script lang="ts" setup>
import { getQuestionnaireListApi } from '~/api'
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
