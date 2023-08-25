<template>
  <Wrapper>
    <SearchHeader class="z-10" v-model="searchValue.keyword" />
    <FilterMenu v-model:value="searchValue" />
    <div class="pt-[calc(54px+48px)] pb-[calc(50px+30px)] flex flex-col">
      <div class="px-4 pt-3 flex-grow" v-for="i in questionnaireList" :key="i.id">
        <t-card :title="i.paperName" @click="onClickQuestionnaire(i.id)">
          创建日期: {{ dayjs(i.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </t-card>
      </div>
    </div>
  </Wrapper>
  <Tabbar />
</template>

<script setup lang="ts">
import FilterMenu from './components/FilterMenu.vue'
import { debounce } from 'radash'
import { getQuestionnaireListApi } from '~/api'
import dayjs from 'dayjs'

const questionnaireList = ref<any>([])
const searchValue = ref({
  keyword: '',
  value1: 0,
  value2: 'a',
})

watch(
  () => searchValue.value,
  debounce(
    {
      delay: 250,
    },
    () => {
      console.log(searchValue.value, 'layouwen')
    }
  ),
  {
    deep: true,
  }
)

const onClickQuestionnaire = (id: number) => {
  navigateTo(`/questionnaire/${id}`)
}

onMounted(async () => {
  const listRes = await getQuestionnaireListApi()
  questionnaireList.value = listRes.data.list
})
</script>
