<template>
  <van-action-sheet
    v-model:show="showModal"
    :actions="actions"
    @select="onSelect"
    close-on-click-action
  />
  <div class="min-h-[100vh] flex flex-col">
    <div class="text-[26px] flex justify-center items-center py-4">
      问卷列表
    </div>
    <div class="px-4 pt-4 flex-grow">
      <n-card
        class="mb-4"
        v-for="i in questionnaireList"
        :key="i.id"
        :title="i.paperName"
        @click="onClickQuestionnaire(i.id)"
      >
        创建日期: {{ dayjs(i.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
      </n-card>
    </div>
    <div
      class="bg-[#f9f9f9] text-[14px] py-4 flex items-center justify-center"
      @click="onSupport"
    >
      <span class="text-[#8c8c8c] mr-2">Avan</span>
      <span class="text-[#bebebe]">提供技术支持</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NCard, useMessage } from "naive-ui";
import { getQuestionnaireListApi } from "~/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { isMobile, isLogin } from "@fucking-exam/shared";
import config from "~/config";

const message = useMessage();
const router = useRouter();

const actions = [
  { name: "邮箱登录" },
  { name: "Github登录" },
  { name: "注册" },
  { name: "取消" },
];

const showModal = ref(false);
const questionnaireList = ref<any>([]);

onMounted(async () => {
  const listRes = await getQuestionnaireListApi();
  questionnaireList.value = listRes.data;
});

const onSelect = (item: { name: string }) => {
  switch (item.name) {
    case "Github登录":
      window.location.href = `https://github.com/login/oauth/authorize?client_id=a644d75524601839ea7a&redirect_uri=${window.location.origin}/oauth/github&scope=user&response_type=token`;
      return;
    case "邮箱登录":
      return router.push("/login");
    case "注册":
      return router.push("/register");
  }
};

const onClickQuestionnaire = (id: number) => {
  if (isLogin()) {
    router.push(`/questionnaire/${id}`);
  } else {
    showModal.value = true;
  }
};

const onSupport = () => {
  if (isMobile()) {
    message.info("打开QQ");
    window.location.href =
      "mqq://im/chat?chat_type=wpa&uin=794234293&version=1&src_type=web";
  }
};
</script>
