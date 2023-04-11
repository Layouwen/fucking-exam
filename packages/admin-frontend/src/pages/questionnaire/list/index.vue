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
          <t-tag v-if="row.status === CONTRACT_STATUS.FAIL" theme="danger" variant="light"> 审核失败</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.AUDIT_PENDING" theme="warning" variant="light"> 待审核</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXEC_PENDING" theme="warning" variant="light"> 待履行</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.EXECUTING" theme="success" variant="light"> 履行中</t-tag>
          <t-tag v-if="row.status === CONTRACT_STATUS.FINISH" theme="success" variant="light"> 已完成</t-tag>
        </template>
        <template #contractType="{ row }">
          <p v-if="row.contractType === CONTRACT_TYPES.MAIN">审核失败</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUB">待审核</p>
          <p v-if="row.contractType === CONTRACT_TYPES.SUPPLEMENT">待履行</p>
        </template>
        <template #tags="{ row }">
          <div class="space-x-2" v-if="row.tags.length">
            <t-tag v-for="i in row.tags" :style="{ background: i.bgColor, color: i.textColor }">{{ i.name }}</t-tag>
          </div>
          <div v-else>-</div>
        </template>
        <template #op="slotProps">
          <a class="t-button-link" @click="onEditQuestionnaire(slotProps)">编辑问卷</a>
          <a class="t-button-link" @click="handleClickDelete(slotProps)">删除</a>
        </template>
      </t-table>
      <t-dialog
        v-model:visible="confirmVisible"
        header="确认删除当前所选合同？"
        :body="confirmBody"
        :on-cancel="onCancel"
        @confirm="onConfirmDelete"
      />
    </div>
  </t-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { MessagePlugin, PrimaryTableCol, TableRowData, Row, Button, Card } from 'tdesign-vue-next';
import { getQuestionnaireApi } from '@/api/list';
import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';
import { useRouter } from 'vue-router';
import { PageOptionType } from '@fucking-exam/types';

import { CONTRACT_STATUS, CONTRACT_TYPES } from '@/constants';

const router = useRouter();
const store = useSettingStore();

const COLUMNS: PrimaryTableCol<TableRowData>[] = [
  {
    title: 'id',
    colKey: 'id',
    width: 140,
  },
  {
    title: '问卷名',
    ellipsis: true,
    align: 'left',
    colKey: 'name',
    minWidth: 200,
  },
  { title: '问卷状态', colKey: 'status', width: 200 },
  {
    title: '问卷类型',
    width: 200,
    colKey: 'type',
  },
  {
    title: '标签',
    width: 200,
    ellipsis: true,
    colKey: 'tags',
  },
  {
    title: '创建者',
    colKey: 'user.name',
  },
  {
    align: 'left',
    fixed: 'right',
    width: 200,
    colKey: 'op',
    title: '操作',
  },
];

const rowKey = 'index';
const verticalAlign = 'top' as const;
const hover = true;

const pagination = ref({
  defaultPageSize: 20,
  total: 100,
  defaultCurrent: 1,
});
const confirmVisible = ref(false);

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
    const { list } = await getQuestionnaireApi();
    data.value = list;
    pagination.value = {
      ...pagination.value,
      total: list.length,
    };
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};

const deleteIdx = ref(-1);
const confirmBody = computed(() => {
  if (deleteIdx.value > -1) {
    const { name } = data.value[deleteIdx.value];
    return `删除后，${name}的所有合同信息将被清空，且无法恢复`;
  }
  return '';
});

const resetIdx = () => {
  deleteIdx.value = -1;
};

const onConfirmDelete = () => {
  // 真实业务请发起请求
  data.value.splice(deleteIdx.value, 1);
  pagination.value.total = data.value.length;
  confirmVisible.value = false;
  MessagePlugin.success('删除成功');
  resetIdx();
};

const onCancel = () => {
  resetIdx();
};

onMounted(() => {
  fetchData();
});

const handleClickDelete = ({ row }) => {
  deleteIdx.value = row.rowIndex;
  confirmVisible.value = true;
};

const headerAffixedTop = computed(
  () =>
    ({
      offsetTop: store.isUseTabsRouter ? 48 : 0,
      container: `.${prefix}-layout`,
    } as any), // TO BE FIXED
);
</script>

<style lang="less" scoped></style>
