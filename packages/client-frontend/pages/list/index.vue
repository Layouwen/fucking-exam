<template>
  <SearchHeader v-model="searchValue" />
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
</template>

<script setup lang="ts">
// TODO remove nuxt-lodash
import { debounce } from 'radash'
import { getQuestionnaireListApi } from '~/api'
import dayjs from 'dayjs'

const questionnaireList = ref<any>([])
const searchValue = ref('')

watch(
  () => searchValue.value,
  debounce(
    {
      delay: 250,
    },
    () => {
      console.log(searchValue.value, 'layouwen')
    }
  )
)

const onClickQuestionnaire = (id: number) => {
  navigateTo(`/questionnaire/${id}`)
}

onMounted(async () => {
  const listRes = await getQuestionnaireListApi()
  questionnaireList.value = listRes.data.list
})
</script>
