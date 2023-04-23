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
        :data="data"
        :columns="COLUMNS"
        :row-key="rowKey"
        :vertical-align="verticalAlign"
        :hover="hover"
        :pagination="pagination"
        :loading="dataLoading"
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
          tag
          <!--          <div class="space-x-2" v-if="row.tags.length">-->
          <!--            <t-tag v-for="i in row.tags" :style="{ background: i.bgColor, color: i.textColor }">{{ i.name }}</t-tag>-->
          <!--          </div>-->
          <!--          <div v-else>-</div>-->
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
import { ref, onMounted } from 'vue';
import { MessagePlugin, PrimaryTableCellParams, PrimaryTableCol } from 'tdesign-vue-next';
import { useRouter } from 'vue-router';
import { PageOptionType } from '@fucking-exam/shared';
import { deleteQuestionnaireApi, getQuestionnaireListApi } from '@/api';

const router = useRouter();

const COLUMNS: PrimaryTableCol<any>[] = [
  { title: 'id', colKey: 'id', width: 80 },
  { title: '问卷名', ellipsis: true, align: 'left', colKey: 'paperName', minWidth: 200 },
  { title: '问卷状态', colKey: 'status', width: 100 },
  { title: '问卷类型', width: 100, colKey: 'type' },
  { title: '标签', width: 100, ellipsis: true, colKey: 'tags' },
  { title: '创建者', colKey: 'user.nickname', width: 200 },
  { align: 'left', fixed: 'right', width: 200, colKey: 'op', title: '操作' },
];

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});

const data = ref([]);

const dataLoading = ref(false);

const onCreateQuestionnaire = () => {
  router.push({ name: 'questionnaireEdit', state: { type: PageOptionType.CREATE } });
};
const onEditQuestionnaire = () => {
  router.push({ name: 'questionnaireEdit', state: { type: PageOptionType.EDIT } });
};

const fetchData = async () => {
  dataLoading.value = true;
  try {
    const res = await getQuestionnaireListApi();
    if (res.code === 200) {
      data.value = res.data.list;
      pagination.value = {
        ...pagination.value,
        total: res.data.total,
      };
    }
  } catch (e) {
    console.log(e, 'layouwen error');
  } finally {
    dataLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

const onDelete = async ({ row }: PrimaryTableCellParams<any>) => {
  await deleteQuestionnaireApi(row.id);
  await fetchData();
  MessagePlugin.success('删除成功');
};
</script>

<style lang="less" scoped></style>
