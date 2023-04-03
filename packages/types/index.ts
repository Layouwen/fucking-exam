export interface User {
  id: number;
  name: number;
  email: number;
  nickname: number;
}

export interface Tag {
  id: number;
  name: string;
  bgColor: string;
  textColor: string;
}

export interface Questionnaire {
  id: number;
  name: string;
  type: 0 | 1;
  status: 0 | 1 | 2 | 3 | 4;
  tags: Tag[];
  user: User;
}

export interface ListResult<D> {
  code: 0;
  result: D;
  total: number;
}
