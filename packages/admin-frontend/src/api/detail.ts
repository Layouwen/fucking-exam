import type { ProjectListResult, PurchaseListResult } from '@/api/model/detailModel';
import { vaxios } from '@/utils';

const Api = {
  PurchaseList: '/get-purchase-list',
  ProjectList: '/get-project-list',
};

export function getPurchaseList() {
  return vaxios.get<PurchaseListResult>(Api.PurchaseList);
}

export function getProjectList() {
  return vaxios.get<ProjectListResult>(Api.ProjectList);
}
