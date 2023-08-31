<template>
  <Wrapper>
    <FilterMenu v-model:value="searchValue" :tag-options="tagOptions!" />
    <SearchHeader class="z-10" v-model="searchValue.keyword" />
    <div class="pt-[calc(54px+48px)] pb-[calc(50px+30px)] flex flex-col">
      <div
        class="px-4 pt-3 flex-grow"
        v-for="i in questionnaireList"
        :key="i.id"
      >
        <t-card :title="i.paperName" @click="onClickQuestionnaire(i.id)">
          创建日期: {{ dayjs(i.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
        </t-card>
      </div>
    </div>
  </Wrapper>
  <Tabbar />
</template>

<script setup lang="ts">
import FilterMenu from "./components/FilterMenu.vue";
import { getQuestionnaireListApi, getQuestionnaireTagsApi } from "~/api";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/vue-query";

const searchValue = ref({
  keyword: "",
  value1: 0,
  value2: "a",
  tag: -1,
});

const { data: questionnaireList } = useQuery({
  queryKey: ["questionnaireList", searchValue],
  queryFn: async ({ queryKey }) => {
    const queryValue = queryKey[1] as unknown as typeof searchValue.value;
    const query = {} as any;

    if (queryValue.tag !== -1) {
      query.tags = [queryValue.tag];
    }

    const res = await getQuestionnaireListApi(query);
    if (res.code === 200) {
      return res.data?.list;
    }
    return [];
  },
});

const { data: tagOptions } = useQuery({
  queryKey: ["questionnaireTags"],
  queryFn: async () => {
    const optionsResult = [{ text: "选择标签", value: -1 }];
    const res = await getQuestionnaireTagsApi();
    if (res.code === 200) {
      const options = res.data!.list.map((tag) => ({
        text: tag.name,
        value: tag.id,
      }));
      optionsResult.push(...options);
    }
    return optionsResult;
  },
});

const onClickQuestionnaire = (id: number) => {
  navigateTo(`/questionnaire/${id}`);
};
</script>
