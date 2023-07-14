<template>
  <Header />
  <div class="min-h-[calc(100vh-50px)] mt-[50px] flex flex-col">
    <div class="px-4 pt-4 flex-grow">
      <n-card
        class="mb-4"
        v-for="i in questionnaireList"
        :key="i.id"
        :title="i.paperName"
        @click="onClickQuestionnaire(i.id)"
      >
        创建日期: {{ dayjs(i.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
      </n-card>
    </div>
    <div class="bg-[#f9f9f9] text-[14px] py-4 flex items-center justify-center" @click="onSupport">
      <span class="text-[#8c8c8c] mr-2">Avan</span>
      <span class="text-[#bebebe]">提供技术支持</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NCard, useMessage } from 'naive-ui'
import { getQuestionnaireListApi } from '~/api'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { isMobile } from '@fucking-exam/shared'

const message = useMessage()
const questionnaireList = ref<any>([])

onMounted(async () => {
  const listRes = await getQuestionnaireListApi()
  questionnaireList.value = listRes.data.list
})

const onClickQuestionnaire = (id: number) => {
  navigateTo(`/questionnaire/${id}`)
}

const onSupport = () => {
  if (isMobile()) {
    message.info('打开QQ')
    window.location.href = 'mqq://im/chat?chat_type=wpa&uin=794234293&version=1&src_type=web'
  }
}
</script>
