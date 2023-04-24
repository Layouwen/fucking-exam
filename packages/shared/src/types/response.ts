export interface ResponseBase {
  code: number;
  msg: string;
}

export interface ResponseBaseData<D> {
  code: number;
  msg: string;
  data: D;
}

