<template>
  <t-card>
    <div class="table-container">
      <t-row justify="space-between">
        <div class="left-operation-container">
          <t-button @click="onCreateQuestionnaire">创建问卷</t-button>
        </div>
        <div class="search-input"></div>
      </t-row>
      <t-table
        :data="listData?.list"
        :columns="COLUMNS"
        row-key="id"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="{
          ...pagination,
          total: listData?.total || 0,
        }"
        :loading="isLoading"
        @page-change="onPageChange"
      >
        <template #status="{ row }">
          <t-tag v-if="row.status === 0" theme="success" variant="light">发布成功</t-tag>
          <t-tag v-if="row.status === 1" theme="warning" variant="light">待审核</t-tag>
        </template>
        <template #type="{ row }">
          <p v-if="row.type === 0">公开</p>
          <p v-if="row.type === 1">私有</p>
        </template>
        <template #tags="{ row }">
          <div v-if="row.tags?.length" class="space-x-2">
            <t-tag v-for="(i, index) in row.tags" :key="index" :style="{ background: i.bgColor, color: i.textColor }"
              >{{ i.name }}
            </t-tag>
          </div>
          <div v-else>-</div>
        </template>
        <template #op="slotProps">
          <a class="t-button-link" @click="onEditQuestionnaire()">编辑问卷</a>
          <t-popconfirm theme="danger" content="确认删除吗" @confirm="onDelete(slotProps)">
            <a class="t-button-link">删除</a>
          </t-popconfirm>
        </template>
      </t-table>
    </div>
  </t-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PrimaryTableCellParams, PrimaryTableCol } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import { PageOptionType } from '@fucking-exam/shared';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { deleteQuestionnaireApi, getQuestionnaireListApi } from '@/api';

const router = useRouter();

const queryClient = useQueryClient();

const { isLoading, data: listData } = useQuery({
  queryKey: ['getQuestionnaireListApi'],
  queryFn: async () => {
    const res = await getQuestionnaireListApi();
    return res.data;
  },
});

const { mutate: onDeleteQuestion } = useMutation({
  mutationFn: (id: number) => deleteQuestionnaireApi(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['getQuestionnaireListApi'] });
  },
});

// TODO: any script
const COLUMNS: PrimaryTableCol<any>[] = [
  { title: 'id', colKey: 'id', width: 80 },
  { title: '问卷名', ellipsis: true, align: 'left', colKey: 'paperName', width: 400 },
  { title: '问卷状态', colKey: 'status', width: 100, align: 'center' },
  { title: '问卷类型', width: 90, colKey: 'type', align: 'center' },
  { title: '标签', ellipsis: true, colKey: 'tags' },
  { title: '创建者', colKey: 'user.nickname', width: 100, align: 'center' },
  { align: 'left', fixed: 'right', width: 200, colKey: 'op', title: '操作' },
];

const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  pageSize: 20,
  current: 1,
});

const onPageChange = (data) => {
  pagination.value = data;
};

const onCreateQuestionnaire = () => {
  router.push({ name: 'questionnaireEdit', state: { type: PageOptionType.CREATE } });
};

const onEditQuestionnaire = () => {
  router.push({ name: 'questionnaireEdit', state: { type: PageOptionType.EDIT } });
};

const onDelete = async ({ row }: PrimaryTableCellParams<any>) => {
  onDeleteQuestion(row.id);
};
</script>

<style lang="less" scoped></style>
