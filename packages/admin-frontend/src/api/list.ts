import type { CardListResult, ListResult } from '@/api/model/listModel';
import { vaxios } from '@/utils';

const Api = {
  BaseList: '/get-list',
  CardList: '/get-card-list',
};

export function getQuestionnaireApi() {
  return vaxios.get<ListResult>(Api.BaseList);
}

export function getCardList() {
  return vaxios.get<CardListResult>(Api.CardList);
}
